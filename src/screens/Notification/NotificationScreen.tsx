import React from 'react';
import {View} from 'react-native';
import SkeletonNotification from '../../components/skeleton/notification/SkeletonNotification';

const NotificationScreen = () => {
  return (
    <View>
      <SkeletonNotification />
    </View>
  );
};

export default NotificationScreen;
