import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  padding?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  paddingTop?: number;
  marginHorizontal?: number;
  backgroundColor?: string;
  margin?: number;
}

const SessionComponent = (props: Props) => {
  const {
    padding,
    children,
    style,
    paddingTop,
    marginHorizontal,
    backgroundColor,
    margin,
  } = props;
  const paddingDefault = 16;

  return (
    <View
      style={[
        style,
        {
          padding: padding ?? paddingDefault,
          paddingTop: paddingTop ?? undefined,
          marginHorizontal,
          backgroundColor,
          margin,
        },
      ]}>
      {children}
    </View>
  );
};

export default SessionComponent;
