import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../../constants/Colors';

interface Props {
  thickness?: number;
  backgroundColor?: string;
  marginVertical?: number;
  marginBottom?: number;
  width?: number;
}
const Divider = (props: Props) => {
  const { thickness, backgroundColor, marginVertical, marginBottom, width } = props;
  return (
    <View
      style={{
        width: width ?? '100%',
        borderBottomWidth: thickness ?? 1,
        borderBottomColor: backgroundColor ?? Colors.GREY_DIVIDER,
        marginVertical,
        marginBottom,
      }}></View>
  );
};

export default Divider;
