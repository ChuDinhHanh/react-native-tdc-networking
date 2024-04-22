import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardType,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../constants/Colors';
import ButtonComponent from '../buttons/ButtonComponent';
import SpaceComponent from '../space/SpaceComponent';
import TextComponent from '../text/TextComponent';
import TextValidate from '../validation/TextValidate';

interface Props {
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
  validateVisible: boolean,
  validateTextError: string,
  isError?: boolean;
}
const InputComponent = (props: Props) => {
  const {
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

  return (
    <View>
      {/* Title */}
      {title && (
        <TextComponent
          marginBottom={5}
          fontSize={18}
          //   fontFamily={fontFamilies.regular}
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
        {affix && <View style={styles.affixAndSuffix}>{affix ?? affix}</View>}
        <TextInput
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          onChangeText={val => onChange(val)}
          secureTextEntry={_isShowPass}
          placeholderTextColor={'#747688'}
          keyboardType={type ?? 'default'}
          autoCapitalize="none"
          onEndEditing={onEnd}
          onBlur={onBlur}
          style={{ flex: 1, marginHorizontal: 10 }}
        />
        {typePassword ? (
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
      <SpaceComponent height={marginBottom ?? 15} />
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
  affixAndSuffix: {},
});
export default InputComponent;
