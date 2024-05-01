import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {LOGIN_SCREEN, TOP_TAB_NAVIGATOR} from '../../constants/Screen';
import {globalStyles} from '../../styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyValue} from '../../constants/KeyValue';
import {useAppDispatch} from '../../redux/Hook';
import {setUserLogin} from '../../redux/Slice';

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(async () => {
      // Get data of current user
      await AsyncStorage.getItem(KeyValue.USER_LOGIN_KEY).then(response => {
        const data = response;
        if (data) {
          const userLogin = JSON.parse(data);
          dispatch(setUserLogin(userLogin));
          Boolean(userLogin) && navigation.replace(TOP_TAB_NAVIGATOR);
        } else {
          navigation.replace(LOGIN_SCREEN);
        }
      });
    }, 3000);
  }, []);

  return (
    <View
      style={[
        globalStyles.center,
        globalStyles.container,
        {backgroundColor: '#fff'},
      ]}>
      <Image source={require('../../assets/image/splash/splash.png')} />
    </View>
  );
};

export default SplashScreen;
