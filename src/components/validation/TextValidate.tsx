// import React from 'react';
// import {StyleProp, View, ViewProps} from 'react-native';
// import TextComponent from '../text/TextComponent';
// import {Colors} from '../../constants/Colors';

// interface Props {
//   text: string | null;
//   style?: StyleProp<ViewProps>;
//   visible: boolean;
// }

// const TextValidate = (props: Props) => {
//   const {text, style, visible} = props;
//   return (
//     <View style={style}>
//       {Boolean(text) && visible && (
//         <TextComponent
//           text={text ?? ''}
//           color={Boolean(text) ? Colors.RED : undefined}
//         />
//       )}
//     </View>
//   );
// };

// export default TextValidate;

import {StyleProp, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextStyle} from 'react-native';
import {Colors} from '../../constants/Colors';

interface TextValidateProps {
  textError: string;
  isError: boolean;
  isVisible: boolean;
  customStyle?: StyleProp<TextStyle>;
}

export default function TextValidate(props: TextValidateProps) {
  return (
    <Text
      style={[
        styles.textError,
        props.customStyle,
        {
          color: props.isError ? Colors.RED : Colors.GREEN_PRIMARY,
          display: props.isVisible ? 'flex' : 'none',
        },
      ]}>
      {props.isError ? props.textError : ''}
    </Text>
  );
}

const styles = StyleSheet.create({
  textError: {
    fontSize: 16,
    marginTop: 10,
  },
});
