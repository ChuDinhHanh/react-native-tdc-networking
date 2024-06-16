import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {FlatList, ScrollView} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {Asset} from 'react-native-image-picker';
import {shallowEqual} from 'react-redux';
import {RootStackParamList} from '../../../../App';
import ModalImage from '../../../../components/modals/Image/ModalImage';
import PostTypeChecker from '../../../../components/post/postTypeChecker/PostTypeChecker';
import ImagePicker from '../../../../components/upload/ImagePicker';
import {Colors} from '../../../../constants/Colors';
import {MESSENGER_SCREEN, OPTION_SCREEN} from '../../../../constants/Screen';
import {Variable} from '../../../../constants/Variables';
import {Data} from '../../../../data/Data';
import en from '../../../../languages/en.json';
import jp from '../../../../languages/jp.json';
import vi from '../../../../languages/vi.json';
import {useAppDispatch, useAppSelector} from '../../../../redux/Hook';
import {
  useDeletePostMutation,
  useFollowMutation,
  useGetPostsByIdQuery,
  useLikeMutation,
  useSaveOrUnSavePostMutation,
} from '../../../../redux/Service';
import {setUserIdOfProfileScreen} from '../../../../redux/Slice';
import {Business} from '../../../../types/Business';
import {Faculty} from '../../../../types/Faculty';
import {LikeAction} from '../../../../types/LikeAction';
import {Post} from '../../../../types/Post';
import {DeletePostRequest} from '../../../../types/request/DeletePostRequest';
import {FollowRequest} from '../../../../types/request/FollowRequest';
import {SavePostRequest} from '../../../../types/request/SavePostRequest';
import {Student} from '../../../../types/Student';
import {GetPostActive} from '../../../../utils/GetPostActive';
import ContainerComponent from '../../../container/ContainerComponent';
import ProfileTypeChecker from '../../profileTypeChecker/ProfileTypeChecker';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface Props {
  userIdOfProfile: number;
  group: string;
}

const PrintfProfileScreen = (props: Props) => {
  console.log('==================PrintfProfileScreen==================');
  const {userIdOfProfile, group} = props;
  const t = useTranslation();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
    shallowEqual,
  );
  const dispatch = useAppDispatch();
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const scrollViewRef = useRef<ScrollView>(null);
  const [imagePickerOption, setImagePickerOption] =
    useState<ActionSheet | null>();
  const [userInformation, setUserInformation] = useState<object>({
    userId: userLogin?.id,
    avatar: undefined,
  });
  const [imagePicker, setImagePicker] = useState<Asset[] | null>(null);
  const [flagImageUpdate, setFlagImageUpdate] = useState(-1);
  const isNavigateToSame = useAppSelector(
    state => state.TDCSocialNetworkReducer.isNavigateToSame,
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

  const [
    like,
    {isLoading: isLike, isError: likeError, error: likeErrorMessage},
  ] = useLikeMutation();

  const [
    follow,
    {isLoading: _isFollow, isError: followError, error: followErrorMessage},
  ] = useFollowMutation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userInfo, setUserInfo] = useState<
    Student | Faculty | Business | undefined
  >();
  const [typeAuthorPost, setTypeAuthorPost] = useState<string>('');
  const [showUserImage, setShowUserImage] = useState({
    visible: false,
    image: '',
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const latestDataRef = useRef<Post[]>([]);

  useEffect(() => {
    if (isFocused) {
      dispatch(setUserIdOfProfileScreen(userIdOfProfile));
    }
    return () => {
      dispatch(setUserIdOfProfileScreen(0));
    };
  }, [isFocused]);

  useEffect(() => {
    if (isNavigateToSame.result) {
      scrollViewRef?.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  }, [isNavigateToSame]);

  const {data, isFetching} = useGetPostsByIdQuery(
    {
      userId: userIdOfProfile ?? 0,
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
      setIsFollow(data?.data?.isFollow);
      latestDataRef.current = data?.data.posts || [];
      setPosts(latestDataRef.current);
    }
  }, [data]);

  const handleClickButtonEvent = (flag: number) => {
    if (flag === Variable.MESSENGER_ACTION) {
      navigation.navigate(MESSENGER_SCREEN);
    } else if (flag === Variable.FOLLOW_ACTION) {
      handleClickFollowEvent();
    } else if (flag === Variable.CALL_ACTION) {
      //
    } else {
      navigation.navigate(OPTION_SCREEN, {userData: userInfo!});
    }
  };

  const handleClickFollowEvent = async () => {
    const followData: FollowRequest = {
      userFollowId: userIdOfProfile,
      userId: userLogin?.id ?? 0,
    };
    const x = follow(followData);
  };

  const handleClickIntoHeaderComponentEvent = useCallback((flag: number) => {
    switch (flag) {
      case Variable.SEE_AVATAR:
        setShowUserImage({
          visible: true,
          image:
            'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-trung-quoc-cuc-dep.jpg',
        });
        break;
      case Variable.SEE_BACKGROUND:
        setShowUserImage({
          visible: true,
          image:
            'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-dep-de-thuong.jpg',
        });
        break;
      case Variable.CLICK_CAMERA_AVATAR_EVENT:
      case Variable.CLICK_CAMERA_BACKGROUND_EVENT:
        handleClearImagePickerData();
        imagePickerOption?.show();
        setFlagImageUpdate(flag);
        break;
      default:
        break;
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
    const deletePostData: DeletePostRequest = {
      postId: postId,
    };

    try {
      const response = await deletePost(deletePostData);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }, []);

  const likeAction = (likeData: LikeAction) => {
    const likeDataClone = likeData;
    delete (likeDataClone as Partial<LikeAction>).code;
    like(likeDataClone);
  };

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

  const handleClearImagePickerData = () => {
    setImagePicker(null);
  };

  const handleUpdateImageEvent = () => {
    console.log('===================handleUpdateImageEvent=================');
    console.log(flagImageUpdate, imagePicker);
    console.log('====================================');
    // handleUploadImage(imagePicker.image ?? [], (data) => {
    //   const sendData = async () => {
    //     // const status = await updateImageUserProfile(SERVER_ADDRESS + "api/users/change/image", { ...userInformation, background: data[0] });
    //     // ToastMessenger(status, 200, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
    //   }
    //   sendData();
    // })
    handleClearImagePickerData();
  };

  return (
    <ContainerComponent backgroundColor={Colors.COLOR_GREY_FEEBLE}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <ModalImage
          isUpload={false}
          visible={showUserImage.visible}
          image={showUserImage.image}
          onCloseModal={handleClickCloseImageEvent}
        />
        {Boolean(imagePicker) && (
          <ModalImage
            onUpdate={handleUpdateImageEvent}
            isUpload={true}
            visible={true}
            image={imagePicker}
            onCloseModal={handleClearImagePickerData}
          />
        )}
        <ProfileTypeChecker
          isFollow={isFollow}
          data={data?.data.posts}
          role={typeAuthorPost}
          userData={userInfo}
          onClickButtonEvent={handleClickButtonEvent}
          onClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          extraData={posts}
          data={posts}
          renderItem={({item}) => renderItem(item)}
        />
      </ScrollView>
      <ImagePicker
        optionsRef={ref => setImagePickerOption(ref)}
        onResult={result => {
          setImagePicker(result);
        }}
      />
    </ContainerComponent>
  );
};

export default PrintfProfileScreen;
