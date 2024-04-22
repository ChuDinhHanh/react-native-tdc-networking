import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../App';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import InputComponent from '../../components/input/InputComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import {
  FORGOTTEN_PASSWORD_SCREEN,
  INTERMEDIATELY_SCREEN,
} from '../../constants/Screen';
import { ERROR_MESSAGES } from '../../languages/vietnamese.json';
import { loginType } from '../../types/loginType';
import {
  InputTextValidate,
  isBlank,
  isEmail,
  isPassword
} from '../../utils/ValidateUtils';
import ContainerComponent from '../container/ContainerComponent';
import styles from './LoginScreen.style';

// Language
import { setDefaultLanguage, setTranslations, useTranslation } from 'react-multi-lang';
import { appInfo } from '../../constants/Infos';
import en from '../../languages/en.json';
import jp from '../../languages/jp.json';
import vi from '../../languages/vi.json';

setTranslations({ vi, jp, en })
setDefaultLanguage('jp')

const initialValue: loginType = {
  email: '',
  password: '',
};

interface Validate {
  email: InputTextValidate;
  password: InputTextValidate;
}

const LoginScreen = () => {
  const t = useTranslation();
  const heightOfImage = appInfo.sizes.HEIGHT * 0.4;
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<loginType>(initialValue);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    const data = { ...loginData, [key]: val };
    setLoginData(data);
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
      loginData.email === '' ||
      loginData.password === '' ||
      loginValidate.email.isError ||
      loginValidate.password.isError
    );
  }, [loginData, loginValidate]);

  const onSubmit = () => {
    setIsLoading(true);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <SessionComponent padding={0} marginHorizontal={30}>
          {/* Banner */}
          <RowComponent height={heightOfImage} justifyContent='center' alignItems='center'>
            <Image
              style={styles.imageLogin}
              source={require('../../assets/image/login/login.png')}
            />
          </RowComponent>
          {/* Form */}
          <TextComponent style={styles.txtLogin} text={t('LoginComponent.titleLogin')} />
          <InputComponent
            value={loginData.email}
            affix={
              <MaterialIcons name={'email'} size={30} color={Colors.GREY1} />
            }
            placeholder={t('LoginComponent.emailId')}
            typePassword={false}
            onChange={val => handleOnTextChangeEvent('email', val)}
            onEnd={() =>
              Boolean(loginData.email) &&
              handleValidateActions('email', loginData.email)
            }
            isError={loginValidate.email.isError}
            validateTextError={loginValidate.email.textError}
            validateVisible={loginValidate.email.isError ?? false}
          />
          <InputComponent
            value={loginData.password}
            affix={
              <IconEntypo name={'lock'} size={30} color={Colors.GREY1} />
            }
            placeholder={t('LoginComponent.password')}
            typePassword={true}
            isHidePass={true}
            onChange={val => handleOnTextChangeEvent('password', val)}
            onEnd={() =>
              Boolean(loginData.password) &&
              handleValidateActions('password', loginData.password)
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
                  style={{ display: isLoading ? 'flex' : 'none' }}
                />
              }
              style={[styles.btnLogin, { opacity: isBtnDisabled ? 0.5 : 1 }]}
              onPress={() => onSubmit()}
              title={<TextComponent style={styles.txtB} text={t('LoginComponent.titleLogin')} />}
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
