import React, {ReactNode} from 'react';
import {
  FlexAlignType,
  View,
  TouchableOpacity,
  Falsy,
  ViewStyle,
  RegisteredStyle,
  RecursiveArray,
} from 'react-native';
import {globalStyles} from '../../styles/GlobalStyles';

interface Props {
  alignItems?: FlexAlignType | undefined;
  children: ReactNode;
  height?: number;
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
  const {
    children,
    alignItems,
    justifyContent,
    onPress,
    marginVertical,
    height,
  } = props;
  const style = [
    {alignItems, justifyContent, marginVertical, height},
    globalStyles.row,
  ];
  return (
    <React.Fragment>
      {onPress ? (
        <TouchableOpacity style={style} onPress={onPress}>
          {children}
        </TouchableOpacity>
      ) : (
        <View style={style}>{children}</View>
      )}
    </React.Fragment>
  );
};

export default RowComponent;
