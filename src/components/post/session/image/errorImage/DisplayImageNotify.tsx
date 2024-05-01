import React, {memo} from 'react';
import {useTranslation} from 'react-multi-lang';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../../../constants/Colors';
import TextComponent from '../../../../text/TextComponent';
import styles from './DisplayImageNotify.style';

const DisplayImageNotify = () => {
  const t = useTranslation();
  return (
    <View style={styles.container}>
      <Ionicons name="refresh-outline" size={30} color={Colors.BLACK} />
      <TextComponent text={t('ImageError.couldNotLoadActivity')} />
    </View>
  );
};

export default memo(DisplayImageNotify);
