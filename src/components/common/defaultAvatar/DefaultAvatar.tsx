import {View, Text} from 'react-native';
import React from 'react';
import styles from './DefaultAvatar.style';

interface DefaultAvatarProps {
  size?: number;
  identifer?: string;
}

const DefaultAvatar = (props: DefaultAvatarProps) => {
  return (
    <View>
      <View
        style={[
          styles.avatar,
          {
            width: props.size ? props.size : 60,
            height: props.size ? props.size : 60,
          },
        ]}>
        <Text style={{fontSize: props.size ? (props.size > 50 ? 18 : 14) : 18}}>
          {props.identifer}
        </Text>
      </View>
    </View>
  );
};

export default DefaultAvatar;
