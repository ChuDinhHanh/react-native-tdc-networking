import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {Asset} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {getUserInfoByToken} from '../../../../api/CallAPI';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import TextInputWithTitle from '../../../../components/input/TextInputWithTitle';
import SessionComponent from '../../../../components/session/SessionComponent';
import TextComponent from '../../../../components/text/TextComponent';
import ImagePicker from '../../../../components/upload/ImagePicker';
import {Colors} from '../../../../constants/Colors';
import {SERVER_ADDRESS} from '../../../../constants/SystemConstant';
import {useCreateOrUpdateStudentMutation} from '../../../../redux/Service';
import {globalStyles} from '../../../../styles/GlobalStyles';
import {StudentUpdateRequest} from '../../../../types/request/StudentUpdateRequest';
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isLengthInRange,
  isPhone,
} from '../../../../utils/ValidateUtils';
import ContainerComponent from '../../../container/ContainerComponent';
import styles from './Student.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyValue} from '../../../../constants/KeyValue';
import {setUserLogin} from '../../../../redux/Slice';
import {isBusiness, isFaculty, isStudent} from '../../../../utils/UserHelper';
import RowComponent from '../../../../components/row/RowComponent';
import SpaceComponent from '../../../../components/space/SpaceComponent';

interface Props {
  userData: any;
  _navigation: NativeStackNavigationProp<ParamListBase>;
}

interface ExtendedInputTextValidate extends InputTextValidate {
  firstTime: boolean;
}

interface StudentValidation {
  name: ExtendedInputTextValidate;
  phone: ExtendedInputTextValidate;
}

const isAllFieldsValid = (validate: StudentValidation): boolean => {
  let key: keyof StudentValidation;
  for (key in validate) {
    if (validate[key].isError) {
      return false;
    }
  }
  return true;
};

const UpdateStudentScreen = (props: Props) => {
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
  const [createOrUpdateStudent] = useCreateOrUpdateStudentMutation();

  const [student, setStudent] = useState<StudentUpdateRequest>({
    id: props.userData?.id ?? 0,
    email: props.userData?.email ?? '',
    name: props.userData?.name ?? '',
    image: props.userData?.image ?? '',
    background: props.userData?.background ?? '',
    phone: props.userData?.phone ?? '',
    studentCode: props.userData?.studentCode,
  });

  const [validate, setValidate] = useState<StudentValidation>({
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
  });

  const handleNameChange = (value: string) => {
    // Biding data.
    setStudent(prev => ({
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
    setStudent(prev => ({
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

  const handleShowResultValidate = () => {
    let key: keyof StudentValidation;
    for (key in validate) {
      validate[key].firstTime = false;
    }
    setValidate({...validate});
  };

  const handleUpdateProfile = async () => {
    try {
      const responseUpdate = await createOrUpdateStudent(student).unwrap();
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
          defaultValue={student.name}
          title={t('StudentUpdate.studentUpdateName')}
          placeholder={t('StudentUpdate.facultyUpdateNamePlaceholder')}
          onChangeText={value => handleNameChange(value)}
          textInputStyle={
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
          defaultValue={student.phone}
          title={t('Update.updatePhoneNumber')}
          placeholder={t('Update.updatePhoneNumberPlaceholder')}
          onChangeText={value => handlePhoneChange(value)}
          textInputStyle={
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
          onPress={() => onSubmit(student)}
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

export default UpdateStudentScreen;
