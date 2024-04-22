import React from 'react';
import {StyleProp, View, ViewProps} from 'react-native';
import TextComponent from '../text/TextComponent';
import {Colors} from '../../constants/Colors';

interface Props {
  text: string | null;
  style?: StyleProp<ViewProps>;
  visible: boolean;
}

const TextValidate = (props: Props) => {
  const {text, style, visible} = props;
  return (
    <View style={style}>
      {Boolean(text) && visible && (
        <TextComponent
          text={text ?? ''}
          color={Boolean(text) ? Colors.RED : undefined}
        />
      )}
    </View>
  );
};

export default TextValidate;
