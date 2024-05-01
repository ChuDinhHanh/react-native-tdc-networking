import {View, Text} from 'react-native';
import React from 'react';
import SkeletonNotificationItem from './SkeletonNotificationItem';

const SkeletonNotification = () => {
  return (
    <View>
      <SkeletonNotificationItem />
      <SkeletonNotificationItem />
      <SkeletonNotificationItem />
      <SkeletonNotificationItem />
      <SkeletonNotificationItem />
      <SkeletonNotificationItem />
      <SkeletonNotificationItem />
    </View>
  );
};

export default SkeletonNotification;
