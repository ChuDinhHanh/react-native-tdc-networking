import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {Student} from '../../types/Student';
import {Faculty} from '../../types/Faculty';
import {Business} from '../../types/Business';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {UpdateProfile} from '../../types/screens/UpdateProfile';
import styles from './Option.style';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import {useTranslation} from 'react-multi-lang';
import vi from '../../languages/vi.json';
import en from '../../languages/en.json';
import jp from '../../languages/jp.json';
import TextComponent from '../../components/text/TextComponent';
import {globalStyles} from '../../styles/GlobalStyles';
import SessionComponent from '../../components/session/SessionComponent';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {Colors} from '../../constants/Colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const OptionScreen = () => {
  const t = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, 'OPTION_SCREEN'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<Student | Faculty | Business>();

  useEffect(() => {
    if (route?.params) {
      setData(route?.params?.userData);
    }
  }, [route?.params]);

  const handleFollowItem = () => {
    navigation.navigate('LIST_FOLLOW_SCREEN');
  };
  const handleSaveItem = () => {
    navigation.navigate('SAVED_POST_SCREEN');
  };
  const handleUpdateProfile = () => {
    navigation.navigate('UPDATE_PROFILE', {userData: data!});
  };

  return (
    <SessionComponent>
      <ScrollView>
        <ButtonComponent
          boxShadow={true}
          justifyContent="flex-start"
          backgroundColor={Colors.WHITE}
          borderRadius={10}
          spacePrevious={15}
          padding={13}
          affix={<Icon1 name="account-eye" size={21} color={Colors.GREY1} />}
          title={
            <TextComponent text={t('OptionScreen.optionScreenFollowText')} />
          }
          onPress={handleFollowItem}
          marginVertical={5}
        />
        <ButtonComponent
          boxShadow={true}
          justifyContent="flex-start"
          backgroundColor={Colors.WHITE}
          borderRadius={10}
          spacePrevious={15}
          padding={13}
          affix={<Icon2 name="bookmark-alt" size={21} color={Colors.GREY1} />}
          title={
            <TextComponent text={t('OptionScreen.optionScreenSaveText')} />
          }
          onPress={handleSaveItem}
          marginVertical={5}
        />
        <ButtonComponent
          boxShadow={true}
          justifyContent="flex-start"
          backgroundColor={Colors.WHITE}
          borderRadius={10}
          spacePrevious={15}
          padding={13}
          affix={
            <FontAwesomeIcon
              name="pencil-square-o"
              size={21}
              color={Colors.GREY1}
            />
          }
          title={
            <TextComponent
              text={t('OptionScreen.optionScreenUpdateProfileText')}
            />
          }
          onPress={handleUpdateProfile}
          marginVertical={5}
        />
      </ScrollView>
    </SessionComponent>
  );
};

export default OptionScreen;
