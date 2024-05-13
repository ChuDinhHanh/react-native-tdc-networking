import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual} from 'react-redux';
import {RootStackParamList} from '../../../../App';
import ModalImage from '../../../../components/modals/Image/ModalImage';
import PostTypeChecker from '../../../../components/post/postTypeChecker/PostTypeChecker';
import {OPTION_SCREEN} from '../../../../constants/Screen';
import {Variable} from '../../../../constants/Variables';
import {Data} from '../../../../data/Data';
import {useAppSelector} from '../../../../redux/Hook';
import {
  useDeletePostMutation,
  useGetPostsByIdQuery,
  useSaveOrUnSavePostMutation,
} from '../../../../redux/Service';
import {Business} from '../../../../types/Business';
import {Faculty} from '../../../../types/Faculty';
import {LikeAction} from '../../../../types/LikeAction';
import {Post} from '../../../../types/Post';
import {SavePostRequest} from '../../../../types/request/SavePostRequest';
import {Student} from '../../../../types/Student';
import {GetPostActive} from '../../../../utils/GetPostActive';
import {isFaculty, isStudent} from '../../../../utils/UserHelper';
import ProfileTypeChecker from '../../ProfileTypeChecker';
import ContainerComponent from '../../../container/ContainerComponent';
import {Colors} from '../../../../constants/Colors';

const MyProfileScreen = () => {
  console.log('==================MyProfileScreen==================');
  const isFocused = useIsFocused();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
    shallowEqual,
  );
  const [
    deletePost,
    {isLoading: isDelete, isError: deleteError, error: deleteErrorMessage},
  ] = useDeletePostMutation();
  const [
    saveOrUnSavePost,
    {
      isLoading: isSaveOrUnSave,
      isError: saveOrUnSaveError,
      error: saveOrUnSaveMessage,
    },
  ] = useSaveOrUnSavePostMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [group, setGroup] = useState(
    isStudent(userLogin) || isFaculty(userLogin)
      ? userLogin.facultyGroupCode
      : Variable.GROUP_BUSINESS,
  );
  const [_isFollow, _setIsFollow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<
    Student | Faculty | Business | null
  >();
  const [typeAuthorPost, setTypeAuthorPost] = useState<string>('');
  const [showUserImage, setShowUserImage] = useState({
    visible: false,
    image: '',
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const latestDataRef = useRef<Post[]>([]);

  const {data, isFetching} = useGetPostsByIdQuery(
    {
      userId: userLogin?.id ?? 0,
      groupCode: group ?? '',
      userLogin: userLogin?.id ?? 0,
    },
    {
      pollingInterval: isFocused ? 2000 : 86400000,
    },
  );

  useEffect(() => {
    if (data) {
      if (data.data.user) {
        setTypeAuthorPost(data.data.user['roleCodes']);
        setUserInfo(data.data.user);
      }
      latestDataRef.current = data?.data.posts || [];
      setPosts(latestDataRef.current);
      _setIsFollow(data.data.isFollow);
    }
  }, [data]);

  const handleClickButtonEvent = (flag: number) => {
    if (flag === Variable.MESSENGER_ACTION) {
    } else if (flag === Variable.FOLLOW_ACTION) {
    } else if (flag === Variable.CALL_ACTION) {
    } else {
      navigation.navigate(OPTION_SCREEN);
    }
  };

  const handleClickIntoHeaderComponentEvent = useCallback((flag: number) => {
    if (flag === Variable.SEE_AVATAR) {
      setShowUserImage({
        visible: true,
        image:
          'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-trung-quoc-cuc-dep.jpg',
      });
    } else if (flag === Variable.SEE_BACKGROUND) {
      setShowUserImage({
        visible: true,
        image:
          'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-dep-de-thuong.jpg',
      });
    }
  }, []);

  const handleClickCloseImageEvent = useCallback(() => {
    setShowUserImage({
      visible: false,
      image: '',
    });
  }, []);

  const handleSavePost = useCallback(async (id: number) => {
    const dataSaveOrUnSavePost: SavePostRequest = {
      userId: userLogin?.id ?? 0,
      postId: id,
    };
    try {
      const response = await saveOrUnSavePost(dataSaveOrUnSavePost);
    } catch (error) {
      console.log('Fail to save or un save post', error);
    }
  }, []);

  const handleDeletePost = useCallback(async (postId: number) => {
    try {
      const response = await deletePost(postId);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }, []);

  const likeAction = (obj: LikeAction) => {};

  const renderItem = useCallback(
    (item: any) => {
      if (GetPostActive(item.active)) {
        return (
          <PostTypeChecker
            id={item.id}
            userId={item.user['id']}
            name={item.user['name']}
            avatar={item.user['image']}
            typeAuthor={item.user['roleCodes']}
            available={null}
            timeCreatePost={item.createdAt}
            content={item.content}
            type={item.type}
            likes={Data.Likes}
            // likes={item.likes}
            comments={item.comment}
            commentQty={item.commentQuantity}
            images={Data.image}
            // images={item.images}
            role={item.user['roleCodes']}
            likeAction={likeAction}
            location={item.location ?? null}
            title={item.title ?? null}
            expiration={item.expiration ?? null}
            salary={item.salary ?? null}
            employmentType={item.employmentType ?? null}
            description={item.description ?? null}
            isSave={item.isSave}
            group={group ?? ''}
            onUnSave={handleSavePost}
            onDelete={handleDeletePost}
            active={item.active}
          />
        );
      } else {
        return null;
      }
    },
    [data],
  );

  return (
    <ContainerComponent backgroundColor={Colors.COLOR_GREY_FEEBLE}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalImage
          visible={showUserImage.visible}
          image={showUserImage.image}
          onCloseModal={handleClickCloseImageEvent}
        />
        <ProfileTypeChecker
          isFollow={_isFollow}
          data={data?.data.posts}
          role={typeAuthorPost}
          userData={userInfo}
          onClickButtonEvent={handleClickButtonEvent}
          onClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent}
        />
        {/* {isFetching ? (
          <SkeletonPost />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            extraData={data?.data.posts}
            data={data?.data.posts}
            renderItem={({ item }) => renderItem(item)}
          />
        )} */}
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          extraData={posts}
          data={posts}
          renderItem={({item}) => renderItem(item)}
        />
      </ScrollView>
    </ContainerComponent>
  );
};

export default MyProfileScreen;
