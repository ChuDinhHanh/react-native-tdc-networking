import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useTransition} from 'react';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/Hook';
import DrawerHeader from './DrawerHeader';
import SessionComponent from '../session/SessionComponent';
import Divider from '../common/divider/Divider';
import {List} from 'react-native-paper';
import AccordionItem from './AccordionItem';
import {setDefaultLanguage, setTranslations} from 'react-multi-lang';
import en from '../../languages/en.json';
import vi from '../../languages/vi.json';
import jp from '../../languages/jp.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserLogout} from '../../redux/Slice';
import {Variable} from '../../constants/Variables';
import {KeyValue} from '../../constants/KeyValue';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LOGIN_SCREEN} from '../../constants/Screen';
import {useChangeUserToInactiveStateMutation} from '../../redux/Service';

setTranslations({vi, jp, en});
setDefaultLanguage('jp');

const DrawerContent = (props: DrawerContentComponentProps) => {
  const t = useTransition();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [inactive, inactiveResult] = useChangeUserToInactiveStateMutation();
  const dispatch = useAppDispatch();
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);
  console.log('====================================');
  console.log(userLogin?.image);
  console.log('====================================');

  const handleLogoutEvent = () => {
    if (userLogin) {
      dispatch(setUserLogout());
      AsyncStorage.removeItem(KeyValue.TOKEN_KEY);
      AsyncStorage.removeItem(KeyValue.USER_LOGIN_KEY);
      navigation.navigate(LOGIN_SCREEN);
      inactive({id: userLogin?.id});
    }
  };
  return (
    <View>
      <SessionComponent>
        <DrawerHeader
          avatar=""
          name={userLogin?.name ?? ''}
          email={userLogin?.email ?? ''}
        />
        <Divider marginVertical={15} />
        {/* <DrawerContentScrollView {...props}> */}
        {/* <DrawerItemList {...props} /> */}
        <List.Accordion
          id={0}
          titleNumberOfLines={5}
          title={<AccordionItem title={'12321'} iconName="users-line" />}>
          <DrawerItem
            label={'adwwada'}
            onPress={() => {}}
            inactiveBackgroundColor="red"
            pressColor="blue"
          />
        </List.Accordion>
        {/* Logout */}
        <DrawerItem
          label={'logout'}
          onPress={handleLogoutEvent}
          inactiveTintColor="red"
          pressColor="blue"
        />
        {/* </DrawerContentScrollView> */}
      </SessionComponent>
    </View>
  );
};

export default DrawerContent;
