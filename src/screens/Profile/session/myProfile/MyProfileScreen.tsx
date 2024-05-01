import React, { useCallback, useEffect, useState } from 'react';
import ModalImage from '../../../../components/modals/Image/ModalImage';
import { Variable } from '../../../../constants/Variables';
import { useAppSelector } from '../../../../redux/Hook';
import { useGetPostsByIdQuery } from '../../../../redux/Service';
import { Business } from '../../../../types/Business';
import { Faculty } from '../../../../types/Faculty';
import { Student } from '../../../../types/Student';
import { isFaculty, isStudent } from '../../../../utils/UserHelper';
import ProfileTypeChecker from '../../ProfileTypeChecker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native';
import SkeletonPost from '../../../../components/skeleton/post/SkeletonPost';
import PostTypeChecker from '../../../../components/post/postTypeChecker/PostTypeChecker';
import { GetPostActive } from '../../../../utils/GetPostActive';
import { LikeAction } from '../../../../types/LikeAction';
import { Data } from '../../../../data/Data';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { OPTION_SCREEN } from '../../../../constants/Screen';

const MyProfileScreen = () => {
  const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  const { data, isFetching } = useGetPostsByIdQuery({
    userId: userLogin?.id ?? 0,
    groupCode: group ?? '',
    userLogin: userLogin?.id ?? 0,
  });

  useEffect(() => {
    if (data) {
      if (data.data.user) {
        setTypeAuthorPost(data.data.user['roleCodes']);
        setUserInfo(data.data.user);
      }
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

  const likeAction = (obj: LikeAction) => {

  }

  const handleSavePost = async (id: number) => {
  }

  const handleDeletePost = async (id: number) => {
  }


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
            likes={item.likes}
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
            handleUnSave={handleSavePost}
            handleDelete={handleDeletePost}
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
    <SafeAreaView>
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
        {isFetching ? (
          <SkeletonPost />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            extraData={data?.data.posts}
            data={data?.data.posts}
            renderItem={({ item }) => renderItem(item)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
