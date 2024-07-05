import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {
  ActivityIndicator,
  Alert,
  Image,
  View
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-gesture-handler';
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
import TextValidate from '../../../../components/validation/TextValidate';
import { Colors } from '../../../../constants/Colors';
import { KeyValue } from '../../../../constants/KeyValue';
import { SERVER_ADDRESS } from '../../../../constants/SystemConstant';
import en from '../../../../languages/en.json';
import jp from '../../../../languages/jp.json';
import vi from '../../../../languages/vi.json';
import { useCreateOrUpdateBusinessMutation } from '../../../../redux/Service';
import { setUserLogin } from '../../../../redux/Slice';
import { globalStyles } from '../../../../styles/GlobalStyles';
import { isBusiness, isFaculty, isStudent } from '../../../../utils/UserHelper';
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isLengthInRange,
  isPhone,
  isTime,
  isType,
} from '../../../../utils/ValidateUtils';
import ContainerComponent from '../../../container/ContainerComponent';
import styles from './UpdateBusinessScreen.style';
setTranslations({ vi, jp, en });
setDefaultLanguage('vi');

interface Props {
  userData: any;
  _navigation: NativeStackNavigationProp<ParamListBase>;
}

interface ExtendedInputTextValidate extends InputTextValidate {
  firstTime: boolean;
}

interface BusinessValidation {
  name: ExtendedInputTextValidate;
  phone: ExtendedInputTextValidate;
  representor: ExtendedInputTextValidate;
  taxCode: ExtendedInputTextValidate;
  address: ExtendedInputTextValidate;
  activeTime: ExtendedInputTextValidate;
}

const isAllFieldsValid = (validate: BusinessValidation): boolean => {
  let key: keyof BusinessValidation;
  for (key in validate) {
    if (validate[key].isError) {
      return false;
    }
  }
  return true;
};

const UpdateBusinessScreen = (props: Props) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
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
  const [createOrUpdateBusiness] = useCreateOrUpdateBusinessMutation();
  const [timeStart, setTimeStart] = useState(
    props.userData?.activeTime.split('-')[0],
  );
  const [timeEnd, setTimeEnd] = useState(
    props.userData?.activeTime.split('-')[1],
  );
  const [showDatePickerStart, setShowDatePickerStart] =
    useState<boolean>(false);
  const [showDatePickerEnd, setShowDatePickerEnd] = useState<boolean>(false);
  const timeStartRef = useRef<TextInput | null>(null);
  const timeEndRef = useRef<TextInput | null>(null);

  const [businessModal, setBusinessModal] = useState({
    id: props.userData?.id ?? 0,
    email: props.userData?.email ?? '',
    name: props.userData?.name ?? '',
    image: props.userData?.image ?? '',
    background: props.userData?.background ?? '',
    representor: props.userData?.representor ?? '',
    taxCode: props.userData?.taxCode ?? '',
    address: props.userData?.address ?? '',
    activeTime: props.userData?.activeTime ?? '',
    phone: props.userData?.phone ?? '',
  });

  const [validate, setValidate] = useState<BusinessValidation>({
    name: {
      textError: t('Validate.validateNameNull'),
      isVisible: false,
      isError: false,
      firstTime: true,
    },
    representor: {
      textError: t('Validate.validatePresentorNull'),
      isVisible: false,
      isError: false,
      firstTime: true,
    },
    taxCode: {
      textError: t('Validate.validateTaxCodeNull'),
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
    phone: {
      textError: t('Validate.validatePhoneNull'),
      isVisible: false,
      isError: false,
      firstTime: true,
    },
    activeTime: {
      textError: t('Validate.validateNameTimeActiveUnCorrect'),
      isVisible: false,
      isError: false,
      firstTime: true,
    },
  });

  // Check time validate
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setBusinessModal({ ...businessModal, activeTime: timeStart + '-' + timeEnd });
    const textError = handleIdentifyForTimeWorking(timeStart, timeEnd);
    const result = Boolean(textError);
    setValidate(prev => ({
      ...prev,
      activeTime: {
        ...validate.activeTime,
        isError: result,
        textError: textError ?? '',
        isVisible: result,
      },
    }));
    validate.activeTime.firstTime &&
      setValidate(prevValidate => ({
        ...prevValidate,
        activeTime: {
          ...prevValidate.activeTime,
          firstTime: false,
        },
      }));
  }, [timeStart, timeEnd]);

  // Name
  const handleNameChange = (value: string) => {
    // Biding data.
    setBusinessModal(prev => ({
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

  // Representor
  const handleRepresentorChange = (value: string) => {
    // Biding data.
    setBusinessModal(prev => ({
      ...prev,
      representor: value,
    }));
    // Validate
    const textError = handleIdentifyErrorForRePresenTor(value);
    const result = Boolean(textError);
    setValidate(prevValidate => ({
      ...prevValidate,
      representor: {
        ...prevValidate.representor,
        isError: result,
        textError: textError ?? '',
        isVisible: result,
      },
    }));
    validate.representor.firstTime &&
      setValidate(prevValidate => ({
        ...prevValidate,
        representor: {
          ...prevValidate.representor,
          firstTime: false,
        },
      }));
  };

  const handlePhoneChange = (value: string) => {
    // Biding data.
    setBusinessModal(prev => ({
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
    setBusinessModal(prev => ({
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

  // TaxCode
  const handleTaxCodeChange = (value: string) => {
    // Biding data.
    setBusinessModal(prev => ({
      ...prev,
      taxCode: value,
    }));
    // Validate
    const textError = handleIdentifyErrorForTaxCode(value);
    const result = Boolean(textError);
    setValidate(prevValidate => ({
      ...prevValidate,
      taxCode: {
        ...prevValidate.taxCode,
        isError: result,
        textError: textError ?? '',
        isVisible: result,
      },
    }));
    validate.taxCode.firstTime &&
      setValidate(prevValidate => ({
        ...prevValidate,
        taxCode: {
          ...prevValidate.taxCode,
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

  const handleIdentifyErrorForRePresenTor = (value: string) => {
    let errorText = null;
    if (isBlank(value)) {
      errorText = t('Validate.validatePresentorNull');
    } else if (isContainSpecialCharacter(value)) {
      errorText = t('Validate.validateRepresentorSpecialCharacter');
    } else if (!isLengthInRange(value, 1, 255)) {
      errorText = t('Validate.validateRepresentorMaxLength');
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

  const handleIdentifyErrorForTaxCode = (value: string) => {
    let errorText = null;
    if (isBlank(value)) {
      errorText = t('Validate.validateTaxCodeNull');
    } else if (!isLengthInRange(value, 1, 255)) {
      errorText = t('Validate.validateTaxCodeMaxLength');
    } else if (!isType(value)) {
      errorText = t('Validate.validateTaxCodeFormat');
    }
    return errorText;
  };

  const handleIdentifyForTimeWorking = (timeStart: string, timeEnd: string) => {
    let errorText = null;
    if (!isTime(timeStart, timeEnd)) {
      errorText = t('Validate.validateNameTimeActiveUnCorrect');
    }
    return errorText;
  };

  const handleShowResultValidate = () => {
    let key: keyof BusinessValidation;
    for (key in validate) {
      validate[key].firstTime = false;
    }
    setValidate({ ...validate });
  };

  const handleUpdateProfile = async () => {
    try {
      const responseUpdate = await createOrUpdateBusiness(businessModal).unwrap();
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
      {/* Name */}
      <SessionComponent padding={10}>
        <TextInputWithTitle
          defaultValue={businessModal.name}
          title={t('BusinessUpdate.businessUpdateCompanyName')}
          placeholder={t('BusinessUpdate.businessUpdateCompanyNamePlaceholder')}
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
        {/* Email */}
        <TextInputWithTitle
          defaultValue={businessModal.representor}
          title={t('BusinessUpdate.businessUpdateRepresentorFullName')}
          placeholder={t(
            'BusinessUpdate.businessUpdateRepresentorFullNamePlaceholder',
          )}
          onChangeText={value => handleRepresentorChange(value)}
          wrapperTextInputStyle={
            validate.representor.firstTime
              ? styles.ipFirstTime
              : validate.representor?.isError
                ? styles.ipError
                : styles.ipUnError
          }
          textError={validate.representor?.textError}
          isError={validate.representor?.isError}
          isVisible={validate.representor?.isVisible}
        />
        {/* Tax code */}
        <TextInputWithTitle
          defaultValue={businessModal.taxCode}
          title={t('BusinessUpdate.businessUpdateCompanyTaxId')}
          placeholder={t(
            'BusinessUpdate.businessUpdateCompanyTaxIdPlaceholder',
          )}
          onChangeText={value => handleTaxCodeChange(value)}
          wrapperTextInputStyle={
            validate.taxCode.firstTime
              ? styles.ipFirstTime
              : validate.taxCode?.isError
                ? styles.ipError
                : styles.ipUnError
          }
          textError={validate.taxCode?.textError}
          isError={validate.taxCode?.isError}
          isVisible={validate.taxCode?.isVisible}
        />
        {/* Address */}
        <TextInputWithTitle
          multiline
          numberOfLine={3}
          defaultValue={businessModal.address}
          textInputStyle={{ textAlignVertical: 'top' }}
          title={t('BusinessUpdate.businessUpdateCompanyAddress')}
          placeholder={t(
            'BusinessUpdate.businessUpdateCompanyAddressPlaceholder',
          )}
          onChangeText={value => handleAddressChange(value)}
          wrapperTextInputStyle={
            validate.address.firstTime
              ? styles.ipFirstTime
              : validate.address?.isError
                ? styles.ipError
                : styles.ipUnError
          }
          textError={validate.address?.textError}
          isError={validate.address?.isError}
          isVisible={validate.address?.isVisible}
        />
        {/* phone number */}
        <TextInputWithTitle
          defaultValue={businessModal.phone}
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
        {/* Date */}
        <RowComponent justifyContent="space-between" alignItems="center">
          <View style={styles.dateWrapper}>
            <TextInputWithTitle
              defaultValue={timeStart}
              textInputRef={timeStartRef}
              onFocus={() => {
                setShowDatePickerStart(true);
              }}
              wrapperTextInputStyle={
                validate.activeTime.firstTime
                  ? styles.ipFirstTime
                  : validate.activeTime?.isError
                    ? styles.ipError
                    : styles.ipUnError
              }
              title={t('BusinessUpdate.businessUpdateCompanyTimeActiveStart')}
              placeholder={moment().format('HH:mm')}
            />
            <DatePicker
              modal
              mode="time"
              locale="vi"
              open={showDatePickerStart}
              date={new Date()}
              onConfirm={time => {
                setTimeStart(moment(time).format('HH:mm'));
                timeStartRef.current?.blur();
                setShowDatePickerStart(false);
              }}
              onCancel={() => {
                timeStartRef.current?.blur();
                setShowDatePickerStart(false);
              }}
            />
          </View>
          <View style={styles.dateWrapper}>
            <TextInputWithTitle
              defaultValue={timeEnd}
              textInputRef={timeEndRef}
              onFocus={() => {
                setShowDatePickerEnd(true);
              }}
              wrapperTextInputStyle={
                validate.activeTime.firstTime
                  ? styles.ipFirstTime
                  : validate.activeTime?.isError
                    ? styles.ipError
                    : styles.ipUnError
              }
              title={t('BusinessUpdate.businessUpdateCompanyTimeActiveEnd')}
              placeholder={moment().format('HH:mm')}
            />

            <DatePicker
              modal
              mode="time"
              locale="vi"
              open={showDatePickerEnd}
              date={new Date()}
              onConfirm={time => {
                setTimeEnd(moment(time).format('HH:mm'));
                timeEndRef.current?.blur();
                setShowDatePickerEnd(false);
              }}
              onCancel={() => {
                timeEndRef.current?.blur();
                setShowDatePickerEnd(false);
              }}
            />
          </View>
        </RowComponent>
        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.activeTime?.textError ?? ''}
          isError={validate.activeTime?.isError ?? false}
          isVisible={validate.activeTime?.isVisible}
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
              source={{ uri: avatarPicker?.[0]?.uri ?? '' }}
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
              source={{ uri: backgroundPicker?.[0]?.uri ?? '' }}
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
          typeButton='Pressable'
          padding={5}
          style={[
            styles.btnRegister,
            isUploading || isUploadingImage
              ? styles.btnDisable
              : styles.btnAble,
            globalStyles.shadow,
          ]}
          isDisable={isUploading || isUploadingImage}
          onPress={() => onSubmit(businessModal)}
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

export default UpdateBusinessScreen;
