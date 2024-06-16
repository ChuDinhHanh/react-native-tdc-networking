import React, {ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {
  KeyboardType,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../constants/Colors';
import ButtonComponent from '../buttons/ButtonComponent';
import SpaceComponent from '../space/SpaceComponent';
import TextComponent from '../text/TextComponent';
import TextValidate from '../validation/TextValidate';

interface Props {
  allowClear?: boolean;
  value?: string;
  affix?: ReactNode;
  suffix?: ReactNode;
  onChange: (val: string) => void;
  isHidePass?: boolean;
  typePassword: boolean;
  type?: KeyboardType;
  placeholder?: string;
  onEnd?: () => void;
  marginBottom?: number;
  isFocus?: boolean;
  title?: string;
  multiline?: boolean;
  numberLine?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  validateVisible: boolean;
  validateTextError: string;
  isError?: boolean;
}
const InputComponent = (props: Props) => {
  const {
    allowClear,
    typePassword,
    isHidePass,
    placeholder,
    affix,
    onChange,
    onEnd,
    suffix,
    type,
    value,
    marginBottom,
    isFocus,
    defaultValue,
    keyboardType,
    multiline,
    numberLine,
    onBlur,
    onFocus,
    title,
    validateVisible,
    validateTextError,
    isError,
  } = props;
  const [_isShowPass, _setIsShowPass] = useState<boolean>(isHidePass ?? false);

  const inputRef = useRef<TextInput>(null);

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    isFocus && inputRef.current?.focus();
  }, [isFocus]);

  const getColor = useMemo(() => {
    if (isError !== undefined) {
      return isError ? Colors.RED : Colors.GREEN;
    } else {
      return Colors.GREY4;
    }
  }, [isError]);

  const handleClearData = () => {
    onChange('');
    setInputValue('');
  };

  const handleOnChangeData = (val: string) => {
    setInputValue(val);
    onChange(val);
  };

  return (
    <View>
      {/* Title */}
      {title && (
        <TextComponent
          marginBottom={5}
          fontSize={18}
          color={Colors.BLACK}
          text={title}
        />
      )}
      {/* TextError */}
      <TextValidate
        visible={validateVisible ?? false}
        text={validateTextError ?? ''}
      />
      {/* Input */}
      <View
        style={[
          styles.input_container,
          {
            borderColor: getColor,
          },
        ]}>
        {affix}
        <TextInput
          ref={inputRef}
          value={inputValue}
          placeholder={placeholder}
          onChangeText={val => handleOnChangeData(val)}
          secureTextEntry={_isShowPass}
          placeholderTextColor={'#747688'}
          keyboardType={type ?? 'default'}
          autoCapitalize="none"
          onEndEditing={onEnd}
          onBlur={onBlur}
          style={{flex: 1}}
        />
        {typePassword && (
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
        )}
        {allowClear && Boolean(inputValue) && (
          <ButtonComponent
            onPress={handleClearData}
            affix={<AntDesign name={'close'} color={Colors.BLACK} size={20} />}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input_container: {
    borderBottomWidth: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    flex: 1,
  },
});
export default InputComponent;
