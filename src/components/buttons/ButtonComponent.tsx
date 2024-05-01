import React, {ReactNode} from 'react';
import {
  DimensionValue,
  FlexAlignType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {globalStyles} from '../../styles/GlobalStyles';
import SpaceComponent from '../space/SpaceComponent';

interface Props {
  title?: ReactNode;
  affix?: ReactNode;
  suffix?: ReactNode;
  spacePrevious?: number;
  spaceBehind?: number;
  onPress: () => void;
  backgroundColor?: string;
  width?: DimensionValue;
  marginVertical?: number;
  height?: DimensionValue;
  borderRadius?: number;
  type?: 'primary' | 'normal';
  isDisable?: boolean;
  boxShadow?: boolean;
  alignSelf?: 'auto' | FlexAlignType | undefined;
  style?: StyleProp<ViewStyle>;
  colorDisable?: string;
}
const ButtonComponent = (props: Props) => {
  const {
    width,
    suffix,
    affix,
    spaceBehind,
    spacePrevious,
    title,
    onPress,
    backgroundColor,
    height,
    marginVertical,
    borderRadius,
    type,
    isDisable,
    boxShadow,
    alignSelf,
    style,
    colorDisable,
  } = props;

  return (
    <TouchableOpacity
      disabled={isDisable}
      onPress={() => onPress()}
      style={[
        globalStyles.row,
        boxShadow && globalStyles.shadow,
        styles.wrapper_content,
        {
          backgroundColor: isDisable ? colorDisable : backgroundColor,
          width: width ?? 'auto',
          height: height ?? 'auto',
          borderRadius,
          marginVertical,
          alignSelf,
        },
        style,
      ]}>
      {affix}
      <SpaceComponent width={spacePrevious ?? 0} />
      {title}
      <SpaceComponent width={spaceBehind ?? 0} />
      {type && type === 'primary' ? (
        <View style={{position: 'absolute', right: 14}}>{suffix}</View>
      ) : (
        suffix
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ButtonComponent;
