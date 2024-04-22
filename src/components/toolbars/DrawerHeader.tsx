import React from 'react';
import {View} from 'react-native';
import DefaultAvatar from '../common/DefaultAvatar';
import styles from './common.style';

const DrawerHeader = () => {
  return (
    <View style={styles.body}>
      <DefaultAvatar />
    </View>
  );
};

export default DrawerHeader;
