import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import {
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  View
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Asset } from 'react-native-image-picker';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { RootStackParamList } from '../../../../App';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import ImageItem from '../../../../components/items/imageCreateOrUpdatePost/ImageItem';
import Loading from '../../../../components/loading/Loading';
import RowComponent from '../../../../components/row/RowComponent';
import TextComponent from '../../../../components/text/TextComponent';
import ImagePicker from '../../../../components/upload/ImagePicker';
import { Colors } from '../../../../constants/Colors';
import { appInfo } from '../../../../constants/Infos';
import { Variable } from '../../../../constants/Variables';
import { useAppSelector } from '../../../../redux/Hook';
import { useCreateNormalPostMutation, useUpdateNormalPostMutation } from '../../../../redux/Service';
import { CreateNormalPostRequest } from '../../../../types/request/CreateNormalPostRequest';
import { ConfirmationUtils } from '../../../../utils/ConfirmationUtils';
import { handleUploadImage } from '../../../../utils/ImageHelper';
import { isBlank, isLengthInRange } from '../../../../utils/ValidateUtils';
import ContainerComponent from '../../../container/ContainerComponent';
import styles from './CreateNormalPostScreen.style';

interface ImageUpdate {
  id: number,
  uri: string
}

const CreateNormalPostScreen = () => {
  const t = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, 'CREATE_NORMAL_POST_SCREEN'>>();
  const group = route.params?.group;
  const updateNormalPost = route.params?.updateNormalPost;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  let alertString = null
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [userId, setUserId] = useState<number>(userLogin?.id ?? 0);
  const [postId, setPostId] = useState<number>(-1);
  const [imagePicker, setImagePicker] = useState<Asset[] | null>(null);
  const [type, setType] = useState<string>(Variable.TYPE_NORMAL_POST);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [updatePost, updatePostResponse] = useUpdateNormalPostMutation();
  const [createNormalPost] = useCreateNormalPostMutation();
  const isFocused = useIsFocused();
  const [viewHeight, setViewHeight] = useState({
    bottom: 0,
    topBar: 0
  });

  const onLayout = (event: any, isBottom: boolean) => {
    const { height } = event.nativeEvent.layout;
    isBottom ?
      setViewHeight({ ...viewHeight, bottom: Math.round(height) })
      :
      setViewHeight({ ...viewHeight, topBar: Math.round(height) });
  };

  useEffect(() => {
    if (updateNormalPost == undefined) return;
    setPostId(updateNormalPost.postId);
    setContent(updateNormalPost.content);
    const listImages = updateNormalPost.images.map((item: ImageUpdate) => { return item.uri })
    setImages(listImages)
  }, [updateNormalPost]);

  const handleClickCompleteButton = async () => {
    const textError = identifyTextError();
    if (textError) {
      Alert.alert(t("AlertNotify.alertNotifyCreateNewPostFail"), textError);
      return;
    }
    try {
      let data;
      if (postId === -1) {
        data = {
          images: images ?? [],
          type: type,
          userId: userId,
          content: content,
          groupId: group === -1 ? null : group,
        };
        createNewPostProcessing(data);
      }
      else {
        data = {
          postId: postId,
          content: content,
          images: images
        }
        updatePostProcessing(data);
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const createNewPostProcessing = async (data: CreateNormalPostRequest) => {
    try {
      await createNormalPost(data).unwrap().then(response => {
        setIsLoading(false);
        if (response.status !== 201) {
          showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyCreateNewPostFail"), false);
          return;
        }
        showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyCreateNewPostSuccess"), false)
        setContent('');
        setImagePicker(null);
        setImages([]);
        Keyboard.dismiss()
        navigation.goBack();
      });
    } catch (error) {
      showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyCreateNewPostFail"), false);
    }
  }

  const updatePostProcessing = (data: any) => {
    updatePost(data)
  }

  const identifyTextError = () => {
    let textError = '';
    if (
      isBlank(content.trim()) &&
      !isLengthInRange(content.trim(), Variable.NUMBER_MIN_CHARACTER, Variable.NUMBER_MAX_CHARACTER) === false
    ) {
      textError =
        `${t("AlertNotify.alertNotifyPostContentCannotNull")}` +
        ', ' +
        `${t("AlertNotify.alertNotifyPostContentHaveNumberCharacterGreaterThanLimitedNumber")}` +
        " " + `${Variable.NUMBER_MAX_CHARACTER}` + " " + `${t("AlertNotify.alertNotifyCharacter")}`;
    } else if (isBlank(content.trim())) {
      textError = t("AlertNotify.alertNotifyPostContentCannotNull");
    } else if (!isLengthInRange(content.trim(), Variable.NUMBER_MIN_CHARACTER, Variable.NUMBER_MAX_CHARACTER)) {
      textError = `${t("AlertNotify.alertNotifyPostContentHaveNumberCharacterGreaterThanLimitedNumber")}` + " " + Variable.NUMBER_MAX_CHARACTER + " " + `${t("AlertNotify.alertNotifyCharacter")}`;
    }
    return textError;
  }

  useEffect(() => {
    setIsLoading(false);
    if (!updatePostResponse.data) return;
    if (updatePostResponse.data.status !== 201) {
      showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyUpdatePostFail"), false)
      return;
    };
    setContent('');
    setImagePicker(null);
    setImages([]);
    showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyUpdatePostSuccess"), false)
    Keyboard.dismiss()
    navigation.goBack();
  }, [updatePostResponse.data])

  const HandleClickIntoIconBtnArrowLeft = useCallback(async () => {
    if (content) {
      try {
        const response = await ConfirmationUtils('Cảnh báo', 'Bạn có thực sự muốn thoát', 'Có', 'Không');
        if (!response) return;
      } catch (error) {
        showAlert(t("AlertNotify.alertNotifyTitle"), t("ErrorTitle.SystemError"), false);
      }
    }

    resetAndGoBack();
  }, [content, imagePicker, images]);

  const resetAndGoBack = () => {
    setContent('');
    setImagePicker(null);
    setImages([]);
    navigation.goBack();
  }

  const showAlert = async (title: string, messenger: string, QA: boolean) => {
    if (QA) {
      return new Promise<boolean>((resolve) => {
        Alert.alert(
          title,
          messenger,
          [
            {
              text: t("AlertNotify.alertNotifyTextAccept"),
              onPress: () => {
                resolve(true)
              }
            },
            {
              text: t("AlertNotify.alertNotifyTextReject"),
              onPress: () => {
                resolve(false)
              }
            }
          ],
          { cancelable: false }
        )
      })
    } else {
      return new Promise<boolean>((resolve) => {
        Alert.alert(
          title,
          messenger,
          [
            {
              text: `${t("CreateNormalPost.createNormalPostAllertButton")}`,
              onPress: () => {
                resolve(true)
              }
            }
          ],
          { cancelable: false }
        )
      })
    }
  }

  const handleDeleteImage = useCallback((imageName: string) => {
    const newImage = images.filter((item: string) => item !== imageName);
    setImages(newImage);
  }, [images])

  useEffect(() => {
    if (imagePicker?.length) {
      setIsUploadingImage(true);
      handleUploadImage(imagePicker ?? [], (data) => {
        setImages([...images, ...data])
        setIsUploadingImage(false)
      })
    }
  }, [imagePicker]);

  const handlePrintfImages = useMemo(() => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {
          images.map((name: string, index: number) => (
            <ImageItem
              key={index.toString()}
              imageName={name}
              handleLongClickIntoImage={handleDeleteImage}
            />
          ))
        }
      </ScrollView>
    )
  }, [images, handleDeleteImage]);

  return (
    <>
      {
        isLoading ? <Loading colorActivityIndicator={Colors.COLOR_BTN_BLUE_PRIMARY} sizeActivityIndicator={25} /> :
          <ContainerComponent
            isFullHeight={true}
            isFullWidth={true}
          >
            {/* Tab bar area */}
            <RowComponent
              padding={10}
              justifyContent='space-between'
              alignItems='center'
              onLayout={onLayout}
            >
              <ButtonComponent
                affix={
                  <IconEntypo name={'chevron-left'} size={30} color={Colors.BLACK} />
                }
                onPress={HandleClickIntoIconBtnArrowLeft}
              />
              <TextComponent
                text={postId === -1 ? t("CreateNormalPost.createNormalPostTitle") : t("CreateNormalPost.updateNormalPostTitle")}
                color={Colors.BLACK}
                fontWeight='bold'
                fontSize={15}
              />
              <ButtonComponent
                onPress={handleClickCompleteButton}
                style={isUploadingImage ? styles.wrapTabBarBtnRightUnAble : styles.wrapTabBarBtnRightAble}
                title={
                  <TextComponent color={Colors.WHITE} fontSize={14} text={t("CreateNormalPost.createNormalPostButtonFinish")} />
                }
              />
            </RowComponent>
            {/* Body */}
            <View
              style={[
                styles.wrapperInput
                , {
                  height: appInfo.sizes.HEIGHT - (viewHeight.bottom + viewHeight.topBar),
                }]}
            >
              <TextInput
                value={content}
                onChangeText={(value) => setContent(value)}
                scrollEnabled={false}
                style={styles.txtBody}
                placeholder={t("CreateNormalPost.createNormalPostPlaceholder")}
                placeholderTextColor={Colors.BLACK}
                multiline={true}
                textAlignVertical='top'
              />
            </View>
            {/* Wrapper bottom */}
            <View
              style={styles.wrapperBottom}
              onLayout={event => onLayout(event, true)}
            >
              {/* Bottom */}
              {Boolean(images) && Boolean(images.length) && handlePrintfImages}
              <ButtonComponent
                padding={10}
                backgroundColor={Colors.COLOR_BTN_BLUE_PRIMARY}
                onPress={() => imagePickerOption?.show()}
                title={
                  <TextComponent
                    fontWeight='bold'
                    color={Colors.WHITE}
                    text={t("CreateNormalPost.createNormalPostButtonText")} />
                }
                spacePrevious={10}
                affix={
                  <IconEntypo name={'images'} size={30} color={Colors.WHITE} />
                }
              />
              <ImagePicker
                optionsRef={(ref) => setImagePickerOption(ref)}
                onResult={(result) => {
                  setImagePicker(result)
                }}
              />
            </View>
          </ContainerComponent>
      }
    </>
  )
}


export default CreateNormalPostScreen;