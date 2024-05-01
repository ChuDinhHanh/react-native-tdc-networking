import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {ActivityIndicator, Image, SafeAreaView, ScrollView} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../App';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import InputComponent from '../../components/input/InputComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import {
  FORGOTTEN_PASSWORD_SCREEN,
  INTERMEDIATELY_SCREEN,
  TOP_TAB_NAVIGATOR,
} from '../../constants/Screen';
import {ERROR_MESSAGES} from '../../languages/vietnamese.json';
import {
  InputTextValidate,
  isBlank,
  isEmail,
  isPassword,
} from '../../utils/ValidateUtils';
import ContainerComponent from '../container/ContainerComponent';
import styles from './LoginScreen.style';

// Language
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosResponse} from 'axios';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {Alert} from 'react-native';
import {appInfo} from '../../constants/Infos';
import {KeyValue} from '../../constants/KeyValue';
import {SERVER_ADDRESS} from '../../constants/SystemConstant';
import en from '../../languages/en.json';
import jp from '../../languages/jp.json';
import vi from '../../languages/vi.json';
import {useAppDispatch} from '../../redux/Hook';
import {setUserLogin} from '../../redux/Slice';
import {Business} from '../../types/Business';
import {Data} from '../../types/Data';
import {Faculty} from '../../types/Faculty';
import {UserLoginRequest} from '../../types/request/UserLoginRequest';
import {Student} from '../../types/Student';
import {Token} from '../../types/Token';

setTranslations({vi, jp, en});
setDefaultLanguage('jp');

interface Validate {
  email: InputTextValidate;
  password: InputTextValidate;
}

const LoginScreen = () => {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const heightOfImage = appInfo.sizes.HEIGHT * 0.4;
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [userLoginRequest, setUserLoginRequest] = useState<UserLoginRequest>({
    email: '',
    password: '',
  });
  const [loginValidate, setLoginValidate] = useState<Validate>({
    email: {
      textError: ERROR_MESSAGES.emailRequired,
      isVisible: false,
      isError: undefined,
    },
    password: {
      textError: ERROR_MESSAGES.emailRequired,
      isVisible: false,
      isError: undefined,
    },
  });

  // Validation functions

  function validateEmail(email: string): string {
    if (isBlank(email) || !isEmail(email)) {
      return t('LoginComponent.errorEmail');
    }
    return '';
  }

  function validatePassword(password: string): string {
    if (isBlank(password) || !isPassword(password)) {
      return t('LoginComponent.errorPass');
    }
    return '';
  }

  const handleOnTextChangeEvent = (key: string, val: string | boolean) => {
    const data = {...userLoginRequest, [key]: val};
    setUserLoginRequest(data);
  };

  const handleValidateActions = (key: string, val: string) => {
    let error = '';
    switch (key) {
      case 'email':
        error = validateEmail(val);
        break;
      case 'password':
        error = validatePassword(val);
        break;
      default:
        break;
    }
    setLoginValidate(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof Validate],
        textError: error,
        isError: !!error,
      },
    }));
  };

  const isBtnDisabled = useMemo(() => {
    return (
      userLoginRequest.email === '' ||
      userLoginRequest.password === '' ||
      loginValidate.email.isError ||
      loginValidate.password.isError
    );
  }, [userLoginRequest, loginValidate]);

  const onSubmit = () => {
    axios
      .post<UserLoginRequest, AxiosResponse<Data<Token>>>(
        `${SERVER_ADDRESS}` + 'api/login',
        userLoginRequest,
      )
      .then(loginResponse => {
        const token = loginResponse.data.data.token;
        axios
          .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(
            SERVER_ADDRESS + `api/users/token/${token}`,
          )
          .then(Response => {
            if (Response.status === 200) {
              setIsLoading(false);
              AsyncStorage.setItem(KeyValue.TOKEN_KEY, JSON.stringify(token));
              AsyncStorage.setItem(
                KeyValue.USER_LOGIN_KEY,
                JSON.stringify(Response.data.data),
              );
              dispatch(setUserLogin(Response.data.data));
              navigation.navigate(TOP_TAB_NAVIGATOR);
            }
          });
      })
      .catch(error => {
        Alert.alert(
          t('LoginComponent.loginFail'),
          t('LoginComponent.alertLoginFail'),
        );
        setIsLoading(false);
      });
    setIsLoading(true);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <SessionComponent padding={0} marginHorizontal={30}>
          {/* Banner */}
          <RowComponent
            height={heightOfImage}
            justifyContent="center"
            alignItems="center">
            <Image
              style={styles.imageLogin}
              source={require('../../assets/image/login/login.png')}
            />
          </RowComponent>
          {/* Form */}
          <TextComponent
            style={styles.txtLogin}
            text={t('LoginComponent.titleLogin')}
          />
          <InputComponent
            value={userLoginRequest.email}
            affix={
              <MaterialIcons name={'email'} size={30} color={Colors.GREY1} />
            }
            placeholder={t('LoginComponent.emailId')}
            typePassword={false}
            onChange={val => handleOnTextChangeEvent('email', val)}
            onEnd={() =>
              Boolean(userLoginRequest.email) &&
              handleValidateActions('email', userLoginRequest.email)
            }
            isError={loginValidate.email.isError}
            validateTextError={loginValidate.email.textError}
            validateVisible={loginValidate.email.isError ?? false}
          />
          <InputComponent
            value={userLoginRequest.password}
            affix={<IconEntypo name={'lock'} size={30} color={Colors.GREY1} />}
            placeholder={t('LoginComponent.password')}
            typePassword={true}
            isHidePass={true}
            onChange={val => handleOnTextChangeEvent('password', val)}
            onEnd={() =>
              Boolean(userLoginRequest.password) &&
              handleValidateActions('password', userLoginRequest.password)
            }
            isError={loginValidate.password.isError}
            validateTextError={loginValidate.password.textError}
            validateVisible={loginValidate.password.isError ?? false}
          />
          {/* Button */}
          <ButtonComponent
            alignSelf="flex-start"
            onPress={() => navigation.navigate(FORGOTTEN_PASSWORD_SCREEN)}
            title={
              <TextComponent
                color={Colors.COLOR_BTN_BLUE_PRIMARY}
                fontSize={15}
                text={t('LoginComponent.forgotPass')}
              />
            }
          />
          <ContainerComponent isCenter={true}>
            <ButtonComponent
              isDisable={isBtnDisabled}
              suffix={
                <ActivityIndicator
                  color={Colors.WHITE}
                  style={{display: isLoading ? 'flex' : 'none'}}
                />
              }
              style={[styles.btnLogin, {opacity: isBtnDisabled ? 0.5 : 1}]}
              onPress={() => onSubmit()}
              title={
                <TextComponent
                  style={styles.txtB}
                  text={t('LoginComponent.titleLogin')}
                />
              }
            />
            <RowComponent>
              <TextComponent text={t('LoginComponent.requestRegister')} />
              <SpaceComponent width={8} />
              <ButtonComponent
                onPress={() => navigation.navigate(INTERMEDIATELY_SCREEN)}
                title={
                  <TextComponent
                    color={Colors.COLOR_BTN_BLUE_PRIMARY}
                    fontWeight={'bold'}
                    text={t('LoginComponent.titleRegister')}
                  />
                }
              />
            </RowComponent>
          </ContainerComponent>
        </SessionComponent>
        <SpaceComponent height={15} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;
