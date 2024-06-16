import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-date-picker';
import {Asset} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RootStackParamList} from '../../../App';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import TextValidateTypeSecond from '../../../components/common/textValidate/TextValidateTypeSecond';
import TextInputWithTitle from '../../../components/input/TextInputWithTitle';
import RowComponent from '../../../components/row/RowComponent';
import SessionComponent from '../../../components/session/SessionComponent';
import SpaceComponent from '../../../components/space/SpaceComponent';
import TextComponent from '../../../components/text/TextComponent';
import ImagePicker from '../../../components/upload/ImagePicker';
import {Colors} from '../../../constants/Colors';
import {LOGIN_SCREEN} from '../../../constants/Screen';
import {SERVER_ADDRESS} from '../../../constants/SystemConstant';
import {BusinessRequest} from '../../../types/request/BusinessRequest';
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword,
  isPhone,
  isTime,
  isType,
} from '../../../utils/ValidateUtils';
import styles from './BusinessRegistrationScreen.style';

import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface RegisterBusiness {
  name: InputTextValidate;
  email: InputTextValidate;
  representor: InputTextValidate;
  taxCode: InputTextValidate;
  phone: InputTextValidate;
  address: InputTextValidate;
  activeTime: InputTextValidate;
  password: InputTextValidate;
  confirmPassword: InputTextValidate;
}

const isAllFieldsValid = (validate: RegisterBusiness): boolean => {
  let key: keyof RegisterBusiness;
  for (key in validate) {
    if (validate[key].isError) {
      return false;
    }
  }
  return true;
};

const BusinessRegistrationScreen = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [imagePicker, setImagePicker] = useState<Asset[]>();
  const [timeStart, setTimeStart] = useState('07:00');
  const [timeEnd, setTimeEnd] = useState('17:00');
  const [business, setBusiness] = useState<BusinessRequest>({
    password: '',
    representor: '',
    phone: '',
    taxCode: '',
    code: Date.now().toString(),
    address: '',
    activeTime: timeStart + '-' + timeEnd,
    email: '',
    name: '',
    confirmPassword: '',
    subject: t('AuthenticateRegistration.textSubjectAuthorRegistration'),
    content: '',
  });

  // const [saveBusiness, businessRegisterResponse] = useAddBusinessMutation()
  const [imagePickerOption, setImagePickerOption] =
    useState<ActionSheet | null>();
  // const { imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [validate, setValidate] = useState<RegisterBusiness>({
    name: {
      textError: t('RegisterBusinessComponent.errorNameEmpty'),
      isVisible: false,
      isError: true,
    },
    representor: {
      textError: t('RegisterBusinessComponent.errorRepresentEmpty'),
      isVisible: false,
      isError: true,
    },
    email: {
      textError: t('RegisterBusinessComponent.errorEmailEmpty'),
      isVisible: false,
      isError: true,
    },
    taxCode: {
      textError: t('RegisterBusinessComponent.errorTaxCodeEmpty'),
      isVisible: false,
      isError: true,
    },
    address: {
      textError: t('RegisterBusinessComponent.errorAddressEmpty'),
      isVisible: false,
      isError: true,
    },
    phone: {
      textError: t('RegisterBusinessComponent.errorPhoneEmpty'),
      isVisible: false,
      isError: true,
    },
    activeTime: {
      textError: t('RegisterBusinessComponent.activeTimeNotFormat'),
      isVisible: false,
      isError: true,
    },
    password: {
      textError: t('RegisterBusinessComponent.errorPasswordEmpty'),
      isVisible: false,
      isError: true,
    },
    confirmPassword: {
      textError: t('RegisterBusinessComponent.errorConfirmPasswordEmpty'),
      isVisible: false,
      isError: true,
    },
  });

  const [showDatePickerStart, setShowDatePickerStart] =
    useState<boolean>(false);
  const [showDatePickerEnd, setShowDatePickerEnd] = useState<boolean>(false);
  const timeStartRef = useRef<TextInput | null>(null);
  const timeEndRef = useRef<TextInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = useCallback(
    (value: string) => {
      setBusiness({...business, name: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorNameEmpty'),
          },
        });
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t('RegisterBusinessComponent.errorNameNotSpecial'),
            isVisible: true,
          },
        });
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t('RegisterBusinessComponent.errorNameNotLengthMax'),
            isVisible: true,
          },
        });
      } else {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  const handleRepresentorChange = useCallback(
    (value: string) => {
      setBusiness({...business, representor: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorRepresentEmpty'),
          },
        });
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorRepresentNotSpecial'),
          },
        });
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            isVisible: true,
            textError: t(
              'RegisterBusinessComponent.errorRepresentNotLengthMax',
            ),
          },
        });
      } else {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  const handleCheckEmail = useCallback(() => {
    axios
      .post(SERVER_ADDRESS + `api/user/check?email=${business.email}`)
      .then(Response => {
        if (Response.data.data === 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: t('RegisterBusinessComponent.errorSameEmail'),
              isVisible: true,
            },
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [validate]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setBusiness({...business, email: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorEmailEmpty'),
          },
        });
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorEmailNotLengthMax'),
          },
        });
      } else if (!isEmail(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorEmailNotFormat'),
          },
        });
      } else {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setBusiness({...business, password: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPasswordEmpty'),
          },
        });
      } else if (!isLengthInRange(value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPassNotLengthMax'),
          },
        });
      } else if (!isPassword(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPassNotFormat'),
          },
        });
      } else {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setBusiness({...business, confirmPassword: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          confirmPassword: {
            ...validate.confirmPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterBusinessComponent.errorConfirmPasswordEmpty'),
          },
        });
      } else if (value != business.password) {
        setValidate({
          ...validate,
          confirmPassword: {
            ...validate.confirmPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterBusinessComponent.errorConfirmPassNotMatch'),
          },
        });
      } else {
        setValidate({
          ...validate,
          confirmPassword: {
            ...validate.confirmPassword,
            isVisible: false,
            isError: false,
          },
        });
      }
    },
    [validate],
  );

  const handleTaxCodeChange = useCallback(
    (value: string) => {
      setBusiness({...business, taxCode: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeEmpty'),
            isVisible: true,
          },
        });
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeNotLengthMax'),
            isVisible: true,
          },
        });
      } else if (!isType(value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeNotFormat'),
            isVisible: true,
          },
        });
      } else {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  const handleAddressChange = useCallback(
    (value: string) => {
      setBusiness({...business, address: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: t('RegisterBusinessComponent.errorAddressEmpty'),
            isVisible: true,
          },
        });
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: t('RegisterBusinessComponent.errorAddressNotLengthMax'),
            isVisible: true,
          },
        });
      } else {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  const handlePhoneChange = useCallback(
    (value: string) => {
      setBusiness({...business, phone: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPhoneEmpty'),
            isVisible: true,
          },
        });
      } else if (!isPhone(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPhoneNotFormat'),
            isVisible: true,
          },
        });
      } else {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  useEffect(() => {
    if (!isTime(timeStart, timeEnd)) {
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: true,
          textError: t('RegisterBusinessComponent.activeTimeNotFormat'),
          isVisible: true,
        },
      });
    } else {
      setBusiness({...business, activeTime: timeStart + '-' + timeEnd});
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: false,
          isVisible: false,
        },
      });
    }
  }, [timeStart, timeEnd]);

  const onSubmit = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      setIsLoading(true);
      // if (imagePicker) {
      //   handleUploadImage(imagePicker, (data) => {
      //     saveStudent({
      //       ...student,
      //       image: data[0]
      //     })
      //   })
      // } else {
      //   saveStudent(student)
      // }
    } else {
      let key: keyof RegisterBusiness;
      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true;
        }
      }
      setValidate({...validate});
    }
  }, [validate, imagePicker]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <SessionComponent>
          {/* <View style={styles.header}>
          <TouchableOpacity
            style={{ left: -100 }}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color={'#ffff'} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtHeader}>{'titleRegisterBusiness'}</Text>
          </View>
        </View> */}

          <TextInputWithTitle
            defaultValue={business.name}
            title={t('RegisterBusinessComponent.titleBusinessName')}
            placeholder={t('RegisterBusinessComponent.placeholderBusinessName')}
            onChangeText={value => handleNameChange(value)}
            textInputStyle={
              !validate.name?.isError ? styles.textInput : styles.ip
            }
            textError={validate.name?.textError}
            isError={validate.name?.isError!}
            isVisible={validate.name?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={business.email}
            title={t('RegisterBusinessComponent.titleEmail')}
            placeholder={t('RegisterBusinessComponent.placeholderEmail')}
            onChangeText={value => handleEmailChange(value)}
            onBlur={() => handleCheckEmail()}
            textInputStyle={
              !validate.email?.isError ? styles.textInput : styles.ip
            }
            textError={validate.email?.textError}
            isError={validate.email?.isError!}
            isVisible={validate.email?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={business.representor}
            title={t('RegisterBusinessComponent.titleRepresent')}
            placeholder={t('RegisterBusinessComponent.placeholderRepresent')}
            onChangeText={value => handleRepresentorChange(value)}
            textInputStyle={
              !validate.representor?.isError ? styles.textInput : styles.ip
            }
            textError={validate.representor?.textError}
            isError={validate.representor?.isError!}
            isVisible={validate.representor?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={business.taxCode}
            title={t('RegisterBusinessComponent.titleTaxCode')}
            placeholder={t('RegisterBusinessComponent.placeholderTaxCode')}
            onChangeText={value => handleTaxCodeChange(value)}
            textInputStyle={
              !validate.taxCode?.isError ? styles.textInput : styles.ip
            }
            textError={validate.taxCode?.textError}
            isError={validate.taxCode?.isError!}
            isVisible={validate.taxCode?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={business.address}
            title={t('RegisterBusinessComponent.titleAddress')}
            placeholder={t('RegisterBusinessComponent.placeholderAddress')}
            onChangeText={value => handleAddressChange(value)}
            textInputStyle={
              !validate.address?.isError ? styles.textInput : styles.ip
            }
            textError={validate.address?.textError}
            isError={validate.address?.isError!}
            isVisible={validate.address?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={business.phone}
            title={t('RegisterBusinessComponent.titlePhone')}
            placeholder={t('RegisterBusinessComponent.placeholderPhone')}
            onChangeText={value => handlePhoneChange(value)}
            textInputStyle={
              !validate.phone?.isError ? styles.textInput : styles.ip
            }
            textError={validate.phone?.textError}
            isError={validate.phone?.isError!}
            isVisible={validate.phone?.isVisible}
          />
          {/*  */}
          <RowComponent alignItems="center" justifyContent="center">
            <TextInputWithTitle
              defaultValue={timeStart}
              textInputRef={timeStartRef}
              onFocus={() => {
                setShowDatePickerStart(true);
              }}
              textInputStyle={
                !validate.activeTime?.isError ? styles.textInput : styles.ip
              }
              title={t('RegisterBusinessComponent.titleTimeStart')}
              placeholder={moment().format('HH:mm')}
            />
            <SpaceComponent width={30} />
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
            <TextInputWithTitle
              defaultValue={timeEnd}
              textInputRef={timeEndRef}
              onFocus={() => {
                setShowDatePickerEnd(true);
              }}
              textInputStyle={
                !validate.activeTime?.isError ? styles.textInput : styles.ip
              }
              title={t('RegisterBusinessComponent.titleTimeEnd')}
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
          </RowComponent>
          <TextValidateTypeSecond
            textError={validate.activeTime?.textError}
            isError={validate.activeTime?.isError!}
            isVisible={validate.activeTime?.isVisible}
          />
          {/*  */}
          <TextInputWithTitle
            allowClear={true}
            isHidePass={true}
            defaultValue={business.password}
            title={t('RegisterBusinessComponent.titlePass')}
            placeholder={t('RegisterBusinessComponent.placeholderPass')}
            onChangeText={value => handlePasswordChange(value)}
            onBlur={() =>
              business.confirmPassword !== '' &&
              handleConfirmPasswordChange(business.confirmPassword)
            }
            textInputStyle={
              !validate.password?.isError ? styles.textInput : styles.ip
            }
            textError={validate.password?.textError}
            isError={validate.password?.isError!}
            isVisible={validate.password?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={business.confirmPassword}
            title={t('RegisterBusinessComponent.titleConfirmPass')}
            placeholder={t('RegisterBusinessComponent.placeholderConfirmPass')}
            onChangeText={value => handleConfirmPasswordChange(value)}
            textInputStyle={
              !validate.confirmPassword?.isError ? styles.textInput : styles.ip
            }
            allowClear={true}
            isHidePass={true}
            textError={validate.confirmPassword?.textError}
            isError={validate.confirmPassword?.isError!}
            isVisible={validate.confirmPassword?.isVisible}
          />
          <SpaceComponent height={15} />
          <RowComponent justifyContent="space-between">
            <TextComponent
              fontWeight="bold"
              fontSize={16}
              color={Colors.BLACK}
              text={t('RegisterBusinessComponent.avatar')}
            />
            <ButtonComponent
              style={styles.wrapperIconCamera}
              onPress={() => {
                imagePickerOption?.show();
              }}
              suffix={<Icon name="camera-retro" size={25} />}
            />
            <ImagePicker
              optionsRef={ref => setImagePickerOption(ref)}
              onResult={result => {
                console.log(result);
                setImagePicker(result);
              }}
            />
          </RowComponent>
          <RowComponent alignItems="center" justifyContent="center">
            {imagePicker && imagePicker.length > 0 && (
              <Image
                style={styles.img}
                source={{
                  uri:
                    imagePicker && imagePicker.length > 0
                      ? imagePicker[0].uri
                      : '',
                }}
              />
            )}
          </RowComponent>
          {/* Button */}
          <ButtonComponent
            isDisable={isLoading}
            style={[styles.btnRegister, {opacity: isLoading ? 0.5 : 1}]}
            onPress={onSubmit}
            title={
              <TextComponent
                style={styles.txtRegister}
                text={t('RegisterBusinessComponent.titleRegister')}
              />
            }
            suffix={
              <ActivityIndicator
                color={Colors.WHITE}
                style={{display: isLoading ? 'flex' : 'none'}}
              />
            }
          />
          <RowComponent justifyContent="center">
            <TextComponent text={t('RegisterBusinessComponent.requestLogin')} />
            <SpaceComponent width={5} />
            <ButtonComponent
              onPress={() => navigation.replace(LOGIN_SCREEN)}
              title={
                <TextComponent
                  fontWeight="bold"
                  color={Colors.COLOR_BTN_BLUE_PRIMARY}
                  text={t('RegisterBusinessComponent.titleLogin')}
                />
              }
            />
          </RowComponent>
        </SessionComponent>
      </SafeAreaView>
      <SpaceComponent height={30} />
    </ScrollView>
  );
};

export default BusinessRegistrationScreen;
