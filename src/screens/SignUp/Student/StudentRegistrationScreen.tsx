import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {Dropdown} from 'react-native-element-dropdown';
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
import {ACCEPT_SCREEN, LOGIN_SCREEN} from '../../../constants/Screen';
import {SERVER_ADDRESS} from '../../../constants/SystemConstant';
import {StudentRequest} from '../../../types/request/StudentRequest';
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword,
  isPhone,
} from '../../../utils/ValidateUtils';
import styles from './StudentRegistrationScreen.style';

// Language
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {useAddStudentMutation} from '../../../redux/Service';
import {handleUploadImage} from '../../../utils/ImageHelper';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface RegisterStudent {
  name: InputTextValidate;
  email: InputTextValidate;
  studentCode: InputTextValidate;
  major: InputTextValidate;
  facultyName: InputTextValidate;
  password: InputTextValidate;
  confirmPassword: InputTextValidate;
  phone: InputTextValidate;
}

const isAllFieldsValid = (validate: RegisterStudent): boolean => {
  let key: keyof RegisterStudent;
  for (key in validate) {
    if (validate[key].isError) {
      return false;
    }
  }
  return true;
};

const StudentRegistrationScreen = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [imagePicker, setImagePicker] = useState<Asset[]>();
  const [imagePickerOption, setImagePickerOption] =
    useState<ActionSheet | null>();
  const [saveStudent, saveStudentResponse] = useAddStudentMutation();
  const [facultyHadChoiceId, setFacultyHadChoiceId] = useState(-1);
  const [student, setStudent] = useState<StudentRequest>({
    id: 0,
    password: '',
    code: Date.now().toString(),
    email: '',
    name: '',
    image: '',
    facultyId: 0,
    majorId: 0,
    studentCode: '',
    confirmPassword: '',
    subject: t('AuthenticateRegisTration.textSubjectAuthorRegistration'),
    content: '',
    phone: '',
  });

  const [dataRequest, setDataRequest] = useState([
    {
      id: 0,
      name: '',
      majors: [
        {
          id: 0,
          name: '',
        },
      ],
    },
  ]);

  const [dataMajorRequest, setDataMajorRequest] = useState([{id: 0, name: ''}]);
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState<RegisterStudent>({
    name: {
      textError: t('RegisterStudentComponent.errorStudentNameEmpty'),
      isVisible: false,
      isError: true,
    },
    email: {
      textError: t('RegisterStudentComponent.errorEmailEmpty'),
      isVisible: false,
      isError: true,
    },
    studentCode: {
      textError: t('RegisterStudentComponent.errorStudentCodeEmpty'),
      isVisible: false,
      isError: true,
    },
    phone: {
      textError: t('RegisterStudentComponent.errorPhoneEmpty'),
      isVisible: false,
      isError: true,
    },
    facultyName: {
      textError: t('RegisterStudentComponent.errorFacultyEmpty'),
      isVisible: false,
      isError: true,
    },
    major: {
      textError: t('RegisterStudentComponent.errorMajor'),
      isVisible: false,
      isError: true,
    },
    password: {
      textError: t('RegisterStudentComponent.errorPasswordEmpty'),
      isVisible: false,
      isError: true,
    },
    confirmPassword: {
      textError: t('RegisterStudentComponent.errorConfirmPasswordEmpty'),
      isVisible: false,
      isError: true,
    },
  });
  const [value, setValue] = useState(
    t('RegisterStudentComponent.placeholderFaculty'),
  );
  const [item, setItem] = useState(
    t('RegisterStudentComponent.placeholderMajor'),
  );

  const handleStudentNameChange = useCallback(
    (value: string) => {
      setStudent({...student, name: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentNameEmpty'),
          },
        });
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t('RegisterStudentComponent.errorStudentNameNotSpecial'),
            isVisible: true,
          },
        });
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t(
              'RegisterStudentComponent.errorStudentNameNotLengthMax',
            ),
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

  // Code
  const handleStudentCodeChange = useCallback(
    (value: string) => {
      // Example 21211tt1013 ..etc..
      const stCode = new RegExp(/^[0-9]{5}[a-zA-Z]{2}[0-9]{4}$/);
      setStudent({...student, studentCode: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeEmpty'),
          },
        });
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeNotSpecial'),
          },
        });
      } else if (!stCode.test(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeNotFormat'),
          },
        });
      } else {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
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
      setStudent({...student, phone: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterStudentComponent.errorPhoneEmpty'),
            isVisible: true,
          },
        });
      } else if (!isPhone(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterStudentComponent.errorPhoneNotFormat'),
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

  const handleCheckEmail = useCallback(() => {
    const path = `${SERVER_ADDRESS}api/users/check?email=${student.email}`;
    axios
      .post(path)
      .then(Response => {
        console.log(Response.data.data);
        if (Response.data.data === 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: t('RegisterStudentComponent.errorSameEmail'),
              isVisible: true,
            },
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [student.email]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setStudent({...student, email: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailEmpty'),
          },
        });
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailNotLengthMax'),
          },
        });
      } else if (!isEmail(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailNotFormat'),
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
      setStudent({...student, password: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPasswordEmpty'),
          },
        });
      } else if (!isLengthInRange(value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPassNotLengthMax'),
          },
        });
      } else if (!isPassword(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPassNotFormat'),
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
      setStudent({...student, confirmPassword: value});
      if (isBlank(value)) {
        setValidate({
          ...validate,
          confirmPassword: {
            ...validate.confirmPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorConfirmPasswordEmpty'),
          },
        });
      } else if (value != student.password) {
        setValidate({
          ...validate,
          confirmPassword: {
            ...validate.confirmPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorConfirmPassNotMatch'),
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

  const handleMajorNameChange = useCallback(
    (value: any) => {
      setStudent({...student, majorId: value});
      if (value == null) {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorMajorEmpty'),
          },
        });
      } else {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  const handleFacultyNameChange = useCallback(
    (value: any) => {
      setStudent({
        ...student,
        facultyId: value.id,
        majorId: value.majors[0].id,
      });
      facultyHadChoiceId !== value.id && setItem(value.majors[0].name);
      setFacultyHadChoiceId(value.id);
      setDataMajorRequest(value.majors);
      if (value == null) {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorFacultyEmpty'),
          },
        });
      } else {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isError: false,
            isVisible: false,
          },
        });
      }
    },
    [validate],
  );

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then(Response => {
        setDataRequest(Response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [student]);

  const onSubmit = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      setIsLoading(true);
      if (imagePicker) {
        handleUploadImage(imagePicker, data => {
          saveStudent({
            ...student,
            image: data[0],
          });
        });
      } else {
        saveStudent(student);
      }
    } else {
      let key: keyof RegisterStudent;
      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true;
        }
      }
      setValidate({...validate});
    }
  }, [validate, imagePicker]);

  useEffect(() => {
    if (!saveStudentResponse.isUninitialized) {
      if (saveStudentResponse.data) {
        setIsLoading(false);
        navigation.navigate(ACCEPT_SCREEN);
        Alert.alert(
          'Thông báo',
          'Tài khoản của bạn đã được đăng ký thành công!',
        );
      } else if (saveStudentResponse.data === null) {
        setIsLoading(false);
        Alert.alert(
          'Cảnh báo',
          'Không thể đăng ký tài khoản, vui lòng kiểm tra lại các thông tin hoặc mã sinh viên đã được đăng ký!',
        );
      }
    }
  }, [saveStudentResponse]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <SessionComponent padding={10}>
          <TextInputWithTitle
            defaultValue={student.name}
            title={t('RegisterStudentComponent.titleStudentName')}
            placeholder={t('RegisterStudentComponent.placeholderStudentName')}
            onChangeText={value => handleStudentNameChange(value)}
            textInputStyle={
              !validate.name?.isError ? styles.textInput : styles.ip
            }
            textError={validate.name?.textError}
            isError={validate.name?.isError!}
            isVisible={validate.name?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={student.studentCode}
            title={t('RegisterStudentComponent.titleStudentCode')}
            placeholder={t('RegisterStudentComponent.placeholderStudentCode')}
            onChangeText={value => handleStudentCodeChange(value)}
            textInputStyle={
              !validate.studentCode?.isError ? styles.textInput : styles.ip
            }
            textError={validate.studentCode?.textError}
            isError={validate.studentCode?.isError!}
            isVisible={validate.studentCode?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={student.phone}
            title={t('RegisterStudentComponent.titlePhone')}
            placeholder={t('RegisterStudentComponent.placeholderPhone')}
            onChangeText={value => handlePhoneChange(value)}
            textInputStyle={
              !validate.phone?.isError ? styles.textInput : styles.ip
            }
            textError={validate.phone?.textError}
            isError={validate.phone?.isError!}
            isVisible={validate.phone?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={student.email}
            title={t('RegisterStudentComponent.titleEmail')}
            placeholder={t('RegisterStudentComponent.placeholderEmail')}
            onChangeText={value => handleEmailChange(value)}
            onBlur={handleCheckEmail}
            textInputStyle={
              !validate.email?.isError ? styles.textInput : styles.ip
            }
            textError={validate.email?.textError}
            isError={validate.email?.isError!}
            isVisible={validate.email?.isVisible}
          />
          <TextComponent
            marginTop={20}
            color={Colors.BLACK}
            fontSize={16}
            fontWeight={'bold'}
            text={t('RegisterStudentComponent.titleFaculty')}
          />
          <Dropdown
            style={[
              styles.dropdown,
              {
                borderColor: !validate.facultyName?.isError
                  ? Colors.DROPDOWN_COLOR
                  : Colors.GREY1,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataRequest}
            search
            labelField="name"
            valueField="id"
            placeholder={value}
            searchPlaceholder={t('RegisterStudentComponent.placeholderSearch')}
            value={value}
            onChange={item => {
              setValue(item.name);
              handleFacultyNameChange(item);
            }}
          />
          <TextValidateTypeSecond
            textError={validate.facultyName?.textError}
            isError={validate.facultyName?.isError!}
            isVisible={validate.facultyName?.isVisible}
          />
          <TextComponent
            marginTop={20}
            color={Colors.BLACK}
            fontSize={16}
            fontWeight={'bold'}
            text={t('RegisterStudentComponent.titleMajor')}
          />
          <Dropdown
            style={[
              styles.dropdown,
              {
                borderColor: !validate.major?.isError
                  ? Colors.DROPDOWN_COLOR
                  : Colors.GREY1,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataMajorRequest}
            search
            labelField="name"
            valueField="id"
            placeholder={item}
            searchPlaceholder={t('RegisterStudentComponent.placeholderSearch')}
            value={item}
            onChange={item => {
              setItem(item.name);
              handleMajorNameChange(item.id);
            }}
          />
          <TextValidateTypeSecond
            textError={validate.major?.textError}
            isError={validate.major?.isError!}
            isVisible={validate.major?.isVisible}
          />
          <TextInputWithTitle
            allowClear={true}
            isHidePass={true}
            defaultValue={student.password}
            title={t('RegisterStudentComponent.titlePass')}
            placeholder={t('RegisterStudentComponent.placeholderPass')}
            onChangeText={value => handlePasswordChange(value)}
            onBlur={() =>
              student.confirmPassword !== '' &&
              handleConfirmPasswordChange(student.confirmPassword)
            }
            textInputStyle={
              !validate.password?.isError ? styles.textInput : styles.ip
            }
            textError={validate.password?.textError}
            isError={validate.password?.isError!}
            isVisible={validate.password?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={student.confirmPassword}
            title={t('RegisterStudentComponent.titleConfirmPass')}
            placeholder={t('RegisterStudentComponent.placeholderConfirmPass')}
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
              text={t('RegisterStudentComponent.avatar')}
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
                text={t('RegisterStudentComponent.titleRegister')}
              />
            }
            suffix={
              <ActivityIndicator
                color={'#fff'}
                style={{display: isLoading ? 'flex' : 'none'}}
              />
            }
          />
          <RowComponent justifyContent="center">
            <TextComponent text={t('RegisterStudentComponent.requestLogin')} />
            <SpaceComponent width={5} />
            <ButtonComponent
              onPress={() => navigation.replace(LOGIN_SCREEN)}
              title={
                <TextComponent
                  fontWeight="bold"
                  color={Colors.COLOR_BTN_BLUE_PRIMARY}
                  text={t('RegisterStudentComponent.titleLogin')}
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

export default StudentRegistrationScreen;
