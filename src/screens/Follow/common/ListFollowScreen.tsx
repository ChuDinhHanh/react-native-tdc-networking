import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {Text, View} from 'react-native';
import {Client} from 'stompjs';
import {LIST_FOLLOWER, LIST_FOLLOWING} from '../../../constants/Screen';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import FollowerScreen from '../follower/FollowerScreen';
import FollowingScreen from '../following/FollowingScreen';
import styles from './Following.style';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');
let stompClient: Client;

const TopTab = createMaterialTopTabNavigator();

function TopTabNavigator() {
  const t = useTranslation();
  return (
    <TopTab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#0065FF',
        tabBarInActiveTintColor: '#808080',
        tabBarLabelStyle: styles.tabBarLabelStyle,
        header: null,
      })}>
      <TopTab.Screen
        name={LIST_FOLLOWING}
        options={{
          title: t('FollowComponent.following'),
          tabBarLabelStyle: {
            fontSize: 10,
          },
        }}
        component={FollowingScreen}
      />
      <TopTab.Screen
        name={LIST_FOLLOWER}
        options={{
          title: t('FollowComponent.follower'),
          tabBarLabelStyle: {
            fontSize: 10,
          },
        }}
        component={FollowerScreen}
      />
    </TopTab.Navigator>
  );
}

const ListFollowScreen = () => {
  return (
    <View style={{flex: 1}}>
      <TopTabNavigator />
    </View>
  );
};

export default ListFollowScreen;
