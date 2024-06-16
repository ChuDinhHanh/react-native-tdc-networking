import {View, Text} from 'react-native';
import React from 'react';
import styles from './DefaultAvatar.style';

interface Props {
  size?: number;
  identifer?: string;
  marginLeft?: number;
}

const DefaultAvatar = (props: Props) => {
  const {identifer, marginLeft, size} = props;
  return (
    <View>
      <View
        style={[
          styles.avatar,
          {
            width: size ? size : 60,
            height: size ? size : 60,
            marginLeft,
          },
        ]}>
        <Text style={{fontSize: size ? (size > 50 ? 18 : 14) : 18}}>
          {identifer}
        </Text>
      </View>
    </View>
  );
};

export default DefaultAvatar;
