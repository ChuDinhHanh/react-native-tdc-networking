import React from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {ActivityIndicator, View} from 'react-native';
import en from '../../languages/en.json';
import jp from '../../languages/jp.json';
import vi from '../../languages/vi.json';
import TextComponent from '../text/TextComponent';
import styles from './Loading.style';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface Props {
  colorActivityIndicator: string;
  sizeActivityIndicator: number;
  colorText?: string;
  fontSizeText?: number;
}
const Loading = (props: Props) => {
  const {
    colorActivityIndicator,
    colorText,
    fontSizeText,
    sizeActivityIndicator,
  } = props;

  const t = useTranslation();
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator
        color={colorActivityIndicator}
        size={sizeActivityIndicator}
      />
      <TextComponent
        color={colorText ?? undefined}
        fontSize={fontSizeText ?? undefined}
        text={t('BottomSheet.BottomSheetTitle')}
      />
    </View>
  );
};

export default Loading;
