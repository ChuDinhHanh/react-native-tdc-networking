import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../../constants/Colors';

export default function SkeletonNotificationItem() {
  return (
    <View style={{backgroundColor: Colors.COLOR_WHITE}}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item paddingHorizontal={20} marginVertical={10}>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <SkeletonPlaceholder.Item
              width={50}
              height={50}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item
              width={'80%'}
              height={40}
              justifyContent="space-between">
              <SkeletonPlaceholder.Item
                width={'60%'}
                height={15}
                marginLeft={10}
              />
              <SkeletonPlaceholder.Item
                width={'90%'}
                height={15}
                marginLeft={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
