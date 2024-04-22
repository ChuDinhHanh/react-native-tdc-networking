import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { setDefaultLanguage, setTranslations, useTranslation } from 'react-multi-lang';
import { Alert, Image, SafeAreaView, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStackParamList } from '../../App';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import SpaceComponent from '../../components/space/SpaceComponent';
import TextComponent from '../../components/text/TextComponent';
import { Colors } from '../../constants/Colors';
import {
  BUSINESS_REGISTER_SCREEN,
  STUDENT_REGISTER_SCREEN,
} from '../../constants/Screen';
import en from '../../languages/en.json';
import jp from '../../languages/jp.json';
import vi from '../../languages/vi.json';
import { globalStyles } from '../../styles/GlobalStyles';
import ContainerComponent from '../container/ContainerComponent';
import styles from './IntermediationScreen.style';

setTranslations({ en, vi, jp })
setDefaultLanguage('jp')

const IntermediationScreen = () => {
  const t = useTranslation()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [value, setValue] = useState('');
  const data = [
    { name: t('RegisterComponent.typeStudent'), value: '1' },
    { name: t('RegisterComponent.typeBusiness'), value: '2' }
  ];
  const onChange = () => {
    if (value === '1') {
      navigation.navigate(STUDENT_REGISTER_SCREEN);
    } else if (value === '2') {
      navigation.navigate(BUSINESS_REGISTER_SCREEN);
    } else {
      Alert.alert(t('RegisterComponent.titleNotification'), t('RegisterComponent.warningSelectedType'))
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.wrapperImage}
        resizeMode="cover"
        source={require('../../assets/image/banner/BannerFIT.jpeg')}
      />
      <View style={[styles.wrapperSelectArea, globalStyles.shadow]}>
        <SessionComponent>
          <ContainerComponent>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              labelField="name"
              valueField="value"
              placeholder={t('RegisterComponent.selectedType')}
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
            <RowComponent justifyContent="center" alignItems="center">
              <ButtonComponent
                spacePrevious={5}
                style={styles.btnContinue}
                affix={
                  <Icon
                    color={Colors.WHITE}
                    name="angle-double-left"
                    size={16}
                  />
                }
                onPress={() => navigation.goBack()}
                title={
                  <TextComponent
                    style={styles.txtRegister}
                    color={Colors.WHITE}
                    text={t('RegisterComponent.goBack')}
                  />
                }
              />
              <SpaceComponent width={20} />
              <ButtonComponent
                spaceBehind={5}
                style={styles.btnContinue}
                suffix={
                  <Icon
                    color={Colors.WHITE}
                    name="angle-double-right"
                    size={16}
                  />
                }
                onPress={onChange}
                title={
                  <TextComponent style={styles.txtRegister} text={t('RegisterComponent.continue')} />
                }
              />
            </RowComponent>
          </ContainerComponent>
        </SessionComponent>
      </View>
    </SafeAreaView>
  );
};

export default IntermediationScreen;
