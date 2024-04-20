import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import { RootStackParamList } from '../../App'
import { LOGIN_SCREEN, TOP_TAB_NAVIGATOR } from '../../constants/Screen'
import { globalStyles } from '../../types/GlobalStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyValue } from '../../constants/KeyValue'

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      // Get data of current user
      const getData = async () => {
        try {
          const data = await AsyncStorage.getItem(KeyValue.USER_LOGIN_KEY);
          if (data) {
            const userLogin = JSON.parse(data);
            if (userLogin) {
              navigation.replace(TOP_TAB_NAVIGATOR);
            }
          }
          navigation.replace(LOGIN_SCREEN);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, 3000)
  }, [])

  return (
    <View style={[globalStyles.center, globalStyles.container, { backgroundColor: '#fff' }]}>
      <Image source={require('../../assets/image/splash/splash.png')} />
    </View>
  )
}

export default SplashScreen