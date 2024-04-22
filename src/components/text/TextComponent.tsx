import React from 'react';
import {FlexAlignType, StyleProp, Text, ViewStyle} from 'react-native';
import {globalStyles} from '../../styles/GlobalStyles';

interface Props {
  fontFamily?: string;
  fontSize?: number;
  text: string;
  color?: string;
  textAlign?: 'center' | undefined;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  isTitle?: boolean;
  alignSelf?: 'auto' | FlexAlignType | undefined;
  upperCase?: boolean;
  marginBottom?: number;
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

const TextComponent = (props: Props) => {
  const {
    color,
    fontFamily,
    fontSize,
    text,
    alignSelf,
    textAlign,
    fontWeight,
    isTitle,
    upperCase,
    marginBottom,
    marginVertical,
    style,
  } = props;
  return (
    <Text
      style={[
        globalStyles.text,
        {
          color,
          fontFamily: isTitle ? undefined : fontFamily,
          fontSize,
          alignSelf,
          textAlign,
          fontWeight,
          textTransform: upperCase ? 'uppercase' : undefined,
          marginBottom,
          marginVertical,
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
