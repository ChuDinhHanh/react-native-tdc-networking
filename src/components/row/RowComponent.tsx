import React, { ReactNode } from 'react';
import { FlexAlignType, View, TouchableOpacity, Falsy, ViewStyle, RegisteredStyle, RecursiveArray } from 'react-native';
import { globalStyles } from '../../styles/GlobalStyles';

interface Props {
  alignItems?: FlexAlignType | undefined;
  children: ReactNode;
  height?: number
  onPress?: () => void;
  marginVertical?: number;
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;
}

const RowComponent = (props: Props) => {
  const { children, alignItems, justifyContent, onPress, marginVertical, height } = props;
  return (
    <React.Fragment>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      ) : (
        <View
          style={[
            { alignItems, justifyContent, marginVertical, height },
            globalStyles.row,
          ]}>
          {children}
        </View>
      )
      }
    </React.Fragment >
  );
};

export default RowComponent;
