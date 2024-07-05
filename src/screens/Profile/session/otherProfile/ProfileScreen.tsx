import {View, Text} from 'react-native';
import React from 'react';
import PrintfProfileScreen from '../../common/printfUI/PrintfProfileScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../../App';

const ProfileScreen = () => {
  console.log('==================ProfileScreen==================');
  const route = useRoute<RouteProp<RootStackParamList, 'PROFILE_SCREEN'>>();
  const {userId, group} = route.params ?? {userId: 0, group: ''};
  return <PrintfProfileScreen userIdOfProfile={userId} group={group} />;
};

export default ProfileScreen;
