import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../constants/Colors';
import ButtonComponent from '../buttons/ButtonComponent';
import TextValidateTypeSecond from '../common/textValidate/TextValidateTypeSecond';
import SpaceComponent from '../space/SpaceComponent';

interface TextInputWithTitleProps {
  allowClear?: boolean;
  isHidePass?: boolean;
  title?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  multiline?: boolean;
  textInputStyle?: StyleProp<TextStyle>;
  numberOfLine?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  defaultValue?: string;
  textInputRef?: React.LegacyRef<TextInput>;
  keyboardType?: KeyboardTypeOptions;
  textError?: string;
  isError?: boolean;
  isVisible?: boolean;
}

export default function TextInputWithTitle(props: TextInputWithTitleProps) {
  const {
    defaultValue,
    keyboardType,
    multiline,
    numberOfLine,
    onBlur,
    onChangeText,
    onFocus,
    placeholder,
    textInputRef,
    textInputStyle,
    title,
    isHidePass,
    allowClear,
    isError,
    isVisible,
    textError,
  } = props;

  const [_isShowPass, _setIsShowPass] = useState<boolean>(isHidePass ?? false);

  return (
    <View style={styles.group}>
      <Text style={[styles.txt, {display: title ? 'flex' : 'none'}]}>
        {title}
      </Text>
      <View
        style={[
          styles.ip,
          textInputStyle,
          {flexDirection: 'row', alignItems: 'center'},
        ]}>
        <TextInput
          secureTextEntry={_isShowPass}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          ref={textInputRef}
          onBlur={() => onBlur && onBlur()}
          onFocus={() => onFocus && onFocus()}
          numberOfLines={numberOfLine ?? 1}
          multiline={multiline ?? false}
          placeholder={placeholder}
          style={{flex: 1}}
          onChangeText={value => onChangeText && onChangeText(value)}
        />
        {isHidePass ? (
          <View style={styles.affixAndSuffix}>
            <ButtonComponent
              onPress={() => _setIsShowPass(!_isShowPass)}
              affix={
                <Entypo
                  name={_isShowPass ? 'eye-with-line' : 'eye'}
                  color={Colors.BLACK}
                  size={20}
                />
              }
            />
          </View>
        ) : (
          <SpaceComponent width={15} />
        )}
      </View>
      <TextValidateTypeSecond
        textError={textError ?? ''}
        isError={isError ?? false}
        isVisible={isVisible ?? false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: 20,
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ip: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#97A1B0',
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  affixAndSuffix: {
    marginRight: 10,
  },
});
