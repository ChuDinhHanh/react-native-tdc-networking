import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import {
  ActivityIndicator,
  Alert,
  Image,
  View
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Asset } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { getUserInfoByToken } from '../../../../api/CallAPI';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import TextInputWithTitle from '../../../../components/input/textInputWithTitle/TextInputWithTitle';
import RowComponent from '../../../../components/row/RowComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import ImagePicker from '../../../../components/upload/ImagePicker';
import { Colors } from '../../../../constants/Colors';
import { KeyValue } from '../../../../constants/KeyValue';
import { SERVER_ADDRESS } from '../../../../constants/SystemConstant';
import {
  useCreateOrUpdateFacultyMutation
} from '../../../../redux/Service';
import { setUserLogin } from '../../../../redux/Slice';
import { globalStyles } from '../../../../styles/GlobalStyles';
import { isBusiness, isFaculty, isStudent } from '../../../../utils/UserHelper';
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isLengthInRange,
  isPhone,
} from '../../../../utils/ValidateUtils';
import ContainerComponent from '../../../container/ContainerComponent';
import styles from './UpdateFacultyScreen.style';

interface Props {
  userData: any;
  _navigation: NativeStackNavigationProp<ParamListBase>;
}

interface ExtendedInputTextValidate extends InputTextValidate {
  firstTime: boolean;
}

interface FacultyValidation {
  name: ExtendedInputTextValidate;
  phone: ExtendedInputTextValidate;
  address: ExtendedInputTextValidate;
}

const isAllFieldsValid = (validate: FacultyValidation): boolean => {
  let key: keyof FacultyValidation;
  for (key in validate) {
    if (validate[key].isError) {
      return false;
    }
  }
  return true;
};

const UpdateFacultyScreen = (props: Props) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPicker, setAvatarPicker] = useState<Asset[] | null>(null);
  const [backgroundPicker, setBackgroundPicker] = useState<Asset[] | null>(
    null,
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [avatarPickerOption, setAvatarPickerOption] =
    useState<ActionSheet | null>();
  const [backgroundPickerOption, setBackgroundPickerOption] =
    useState<ActionSheet | null>();
  const [createOrUpdateFaculty] = useCreateOrUpdateFacultyMutation();

  const [facultyModal, setFacultyModal] = useState({
    id: props.userData?.id ?? 0,
    email: props.userData?.email ?? '',
    name: props.userData?.name ?? '',
    image: props.userData?.image ?? '',
    background: props.userData?.background ?? '',
    phone: props.userData?.phone ?? '',
  });

  const [validate, setValidate] = useState<FacultyValidation>({
    name: {
      textError: t('Validate.validateNameNull'),
      isVisible: false,
      isError: false,
      firstTime: true,
    },
    phone: {
      textError: t('Validate.validatePhoneNull'),
      isVisible: false,
      isError: false,
      firstTime: true,
    },
    address: {
      textError: t('Validate.validateAddressNull'),
      isVisible: false,
      isError: false,
      firstTime: true,
    },
  });

  const handleNameChange = (value: string) => {
    // Biding data.
    setFacultyModal(prev => ({
      ...prev,
      name: value,
    }));
    // Validate
    const textError = handleIdentifyErrorForNameField(value);
    const result = Boolean(textError);
    setValidate(prevValidate => ({
      ...prevValidate,
      name: {
        ...prevValidate.name,
        isError: result,
        textError: textError ?? '',
        isVisible: result,
      },
    }));
    validate.name.firstTime &&
      setValidate(prevValidate => ({
        ...prevValidate,
        name: {
          ...prevValidate.name,
          firstTime: false,
        },
      }));
  };

  const handlePhoneChange = (value: string) => {
    // Biding data.
    setFacultyModal(prev => ({
      ...prev,
      phone: value,
    }));
    // Validate
    const textError = handleIdentifyTextErrorForPhoneField(value);
    const result = Boolean(textError);
    setValidate(prevValidate => ({
      ...prevValidate,
      phone: {
        ...prevValidate.phone,
        isError: result,
        textError: textError ?? '',
        isVisible: result,
      },
    }));
    validate.phone.firstTime &&
      setValidate(prevValidate => ({
        ...prevValidate,
        phone: {
          ...prevValidate.phone,
          firstTime: false,
        },
      }));
  };

  // Address
  const handleAddressChange = (value: string) => {
    // Biding data.
    setFacultyModal(prev => ({
      ...prev,
      address: value,
    }));
    // Validate
    const textError = handleIdentifyErrorForAddress(value);
    const result = Boolean(textError);
    setValidate(prevValidate => ({
      ...prevValidate,
      address: {
        ...prevValidate.address,
        isError: result,
        textError: textError ?? '',
        isVisible: result,
      },
    }));
    validate.address.firstTime &&
      setValidate(prevValidate => ({
        ...prevValidate,
        address: {
          ...prevValidate.address,
          firstTime: false,
        },
      }));
  };

  const handleIdentifyErrorForNameField = (value: string) => {
    let errorText = null;
    if (isBlank(value)) {
      errorText = t('Validate.validateNameNull');
    } else if (isContainSpecialCharacter(value)) {
      errorText = t('Validate.validateNameHasSpecialCharacter');
    } else if (!isLengthInRange(value, 1, 255)) {
      errorText = t('Validate.validateNameHasMaxLength');
    }
    return errorText;
  };

  const handleIdentifyTextErrorForPhoneField = (value: string) => {
    let errorText = null;
    if (isBlank(value)) {
      errorText = t('Validate.validatePhoneNull');
    } else if (!isPhone(value)) {
      errorText = t('Validate.validatePhoneUnCorrectFormat');
    }
    return errorText;
  };

  const handleIdentifyErrorForAddress = (value: string) => {
    let errorText = null;
    if (isBlank(value)) {
      errorText = t('Validate.validateAddressNull');
    } else if (!isLengthInRange(value, 1, 255)) {
      errorText = t('Validate.validateAddressMaxLength');
    }
    return errorText;
  };
  const handleShowResultValidate = () => {
    let key: keyof FacultyValidation;
    for (key in validate) {
      validate[key].firstTime = false;
    }
    setValidate({...validate});
  };

  const handleUpdateProfile = async () => {
    try {
      const responseUpdate = await createOrUpdateFaculty(facultyModal).unwrap();
      if (!(responseUpdate && 'data' in responseUpdate)) {
        showAlert('UpdateProfile.updateProfileAlertFail');
        return false;
      }
      const token = responseUpdate.data.token;
      const data = await getUserInfoByToken(token);
      if (!(isStudent(data) || isFaculty(data) || isBusiness(data))) {
        showAlert('UpdateProfile.updateProfileAlertFail');
        return false;
      }
      AsyncStorage.setItem(KeyValue.TOKEN_KEY, JSON.stringify(token));
      AsyncStorage.setItem(KeyValue.USER_LOGIN_KEY, JSON.stringify(data));
      dispatch(setUserLogin(data));
      return true;
    } catch (error) {
      return false;
    }
  };

  const showAlert = (title: string) => {
    Alert.alert(t(title));
  };

  const onSubmit = useCallback(
    async (student: any) => {
      handleShowResultValidate();
      const result = isAllFieldsValid(validate);
      if (!result) {
        showAlert('UpdateProfile.updateProfileAlertFiledNotCorrectValid');
        return;
      }
      setIsUploading(true);
      const resultUpdateAccess = await handleUpdateProfile();
      if (!resultUpdateAccess) {
        showAlert('UpdateProfile.updateProfileAlertFail');
        return;
      }
      showAlert('UpdateProfile.updateProfileAlertSuccess');
      setIsUploading(false);
      props._navigation.pop(2);
    },
    [validate, avatarPicker],
  );

  return (
    <ContainerComponent isScrollEnable={true}>
      <SessionComponent padding={10}>
        {/* Name */}
        <TextInputWithTitle
          defaultValue={facultyModal.name}
          title={t('StudentUpdate.studentUpdateName')}
          placeholder={t('StudentUpdate.facultyUpdateNamePlaceholder')}
          onChangeText={value => handleNameChange(value)}
          wrapperTextInputStyle={
            validate.name.firstTime
              ? styles.ipFirstTime
              : validate.name?.isError
              ? styles.ipError
              : styles.ipUnError
          }
          textError={validate.name?.textError}
          isError={validate.name?.isError}
          isVisible={validate.name?.isVisible}
        />
        {/* Phone */}
        <TextInputWithTitle
          defaultValue={facultyModal.phone}
          title={t('Update.updatePhoneNumber')}
          placeholder={t('Update.updatePhoneNumberPlaceholder')}
          onChangeText={value => handlePhoneChange(value)}
          wrapperTextInputStyle={
            validate.phone.firstTime
              ? styles.ipFirstTime
              : validate.phone?.isError
              ? styles.ipError
              : styles.ipUnError
          }
          textError={validate.phone?.textError}
          isError={validate.phone?.isError}
          isVisible={validate.phone?.isVisible}
        />
        {/* Avatar */}
        <SpaceComponent height={16} />
        <RowComponent justifyContent="space-between" alignItems="center">
          <TextComponent
            color={Colors.BLACK}
            fontWeight="bold"
            fontSize={18}
            text={t('Update.updateAvatarTitle')}
          />
          <ButtonComponent
            affix={<Icon name="camera-retro" size={20}></Icon>}
            onPress={() => avatarPickerOption?.show()}
          />
          <ImagePicker
            optionsRef={ref => setAvatarPickerOption(ref)}
            onResult={result => {
              setAvatarPicker(result);
            }}
          />
        </RowComponent>
        <View style={styles.wrapperImage}>
          {Boolean(avatarPicker) ? (
            <Image
              style={styles.img}
              source={{uri: avatarPicker?.[0]?.uri ?? ''}}
            />
          ) : (
            <Image
              style={styles.img}
              source={{
                uri: SERVER_ADDRESS + `api/images/${imageAvatarTemporary}`,
              }}
            />
          )}
        </View>
        {/* Background */}
        <RowComponent justifyContent="space-between" alignItems="center">
          <TextComponent
            color={Colors.BLACK}
            fontWeight="bold"
            fontSize={18}
            text={t('Update.updateBackgroundTitle')}
          />
          <ButtonComponent
            onPress={() => backgroundPickerOption?.show()}
            affix={<Icon name="camera-retro" size={20} />}
          />
          <ImagePicker
            optionsRef={ref => setBackgroundPickerOption(ref)}
            onResult={result => {
              setBackgroundPicker(result);
            }}
          />
        </RowComponent>
        <View style={styles.wrapperImage}>
          {Boolean(avatarPicker) ? (
            <Image
              style={styles.img}
              source={{uri: backgroundPicker?.[0]?.uri ?? ''}}
            />
          ) : (
            <Image
              style={styles.img}
              source={{
                uri: SERVER_ADDRESS + `api/images/${imageAvatarTemporary}`,
              }}
            />
          )}
        </View>
        {/* Button submit */}
        <ButtonComponent
          padding={5}
          style={[
            styles.btnRegister,
            isUploading || isUploadingImage
              ? styles.btnDisable
              : styles.btnAble,
            globalStyles.shadow,
          ]}
          isDisable={isUploading || isUploadingImage}
          onPress={() => onSubmit(facultyModal)}
          title={
            <TextComponent
              fontSize={18}
              fontWeight="bold"
              color={Colors.WHITE}
              text={
                isUploading
                  ? t('Update.updatingProfileButtonTitle')
                  : t('Update.updateProfileButtonTitle')
              }
            />
          }
          spacePrevious={10}
          affix={
            isUploading && (
              <ActivityIndicator
                size={25}
                color="white"
                style={styles.spinner}
              />
            )
          }
        />
      </SessionComponent>
    </ContainerComponent>
  );
};

export default UpdateFacultyScreen;
