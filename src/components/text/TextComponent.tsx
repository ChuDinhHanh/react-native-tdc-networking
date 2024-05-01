import React, {ReactNode} from 'react';
import {FlexAlignType, StyleProp, Text, View, ViewStyle} from 'react-native';
import {globalStyles} from '../../styles/GlobalStyles';
import SpaceComponent from '../space/SpaceComponent';

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
  marginTop?: number;
  suffix?: ReactNode;
  spaceSuffix?: number;
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
    marginTop,
    style,
    suffix,
    spaceSuffix,
  } = props;

  const textContainer = (
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
          marginTop: suffix ? 0 : marginTop,
        },
        style,
      ]}>
      {text}
    </Text>
  );
  return (
    <>
      {suffix ? (
        <View
          style={[
            globalStyles.row,
            {alignItems: 'center', marginTop, width: '95%'},
          ]}>
          {suffix}
          <SpaceComponent width={spaceSuffix ?? 0} />
          {textContainer}
        </View>
      ) : (
        textContainer
      )}
    </>
  );
};

export default TextComponent;
