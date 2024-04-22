import {View, Text, StyleProp, TextStyle, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from '../text/TextComponent';
import {Colors} from '../../constants/Colors';

interface TextValidateProps {
  textError: string;
  isError: boolean;
  isVisible: boolean;
  customStyle?: StyleProp<TextStyle>;
}

const TextValidateTypeSecond = (props: TextValidateProps) => {
  return (
    props.isVisible && (
      <TextComponent
        style={[
          styles.textError,
          props.customStyle,
          {
            color: props.isError ? Colors.RED : Colors.GREEN,
            display: props.isVisible ? 'flex' : 'none',
          },
        ]}
        text={props.isError ? props.textError : ''}
      />
    )
  );
};

const styles = StyleSheet.create({
  textError: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default TextValidateTypeSecond;
