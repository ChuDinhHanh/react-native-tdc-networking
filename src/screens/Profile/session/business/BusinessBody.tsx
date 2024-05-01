import React from 'react';
import {useTranslation} from 'react-multi-lang';
import {View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {Variable} from '../../../../constants/Variables';
import styles from './BussinesBody.style';

interface Props {
  t: ReturnType<typeof useTranslation>;
  isFollow: boolean;
  onClickButtonEvent: (flag: number) => void;
  timeWork: string;
  taxIdentificationNumber: string;
  representor: string;
  address: string;
  phone: string;
  email: string;
  name: string;
  numberPost: number;
  isSameUser: boolean;
}

const BusinessBody = (props: Props) => {
  const {
    address,
    email,
    isFollow,
    isSameUser,
    name,
    numberPost,
    onClickButtonEvent,
    phone,
    representor,
    t,
    taxIdentificationNumber,
    timeWork,
  } = props;
  return (
    <SessionComponent padding={10} paddingTop={20}>
      {/* Name */}
      <TextComponent
        fontSize={18}
        color={Colors.BLACK}
        fontWeight="bold"
        text={name}
      />
      {/* Btn action */}
      <View style={[styles.buttonContainer]}>
        {!isSameUser && (
          <>
            <ButtonComponent
              title={
                <TextComponent
                  text={t('Profile.chat')}
                  style={styles.txtContentBtn}
                />
              }
              style={[styles.buttonAction, styles.marginRightBtnAction]}
              onPress={() => onClickButtonEvent(Variable.MESSENGER_ACTION)}
              affix={
                <IconFontisto name="messenger" size={20} color={Colors.WHITE} />
              }
            />

            <ButtonComponent
              title={
                <TextComponent
                  text={isFollow ? t('Profile.unFollow') : t('Profile.follow')}
                  style={styles.txtContentBtn}
                />
              }
              style={[styles.buttonAction, styles.marginRightBtnAction]}
              onPress={() => onClickButtonEvent(Variable.FOLLOW_ACTION)}
              affix={
                isFollow ? (
                  <IconIonicons
                    name="person-remove-sharp"
                    size={20}
                    color={Colors.WHITE}
                  />
                ) : (
                  <IconIonicons
                    name="person-add"
                    size={20}
                    color={Colors.WHITE}
                  />
                )
              }
            />
          </>
        )}

        {isSameUser && (
          <ButtonComponent
            style={[styles.marginRightBtnAction, styles.btnOption]}
            onPress={() => onClickButtonEvent(Variable.MENU_CLICK_ACTION)}
            suffix={
              <IconEntypo
                name="dots-three-horizontal"
                size={20}
                color={Colors.BLACK}
              />
            }
          />
        )}
      </View>
      {/* Info*/}
      <View>
        <TextComponent
          suffix={
            <IconIonicons
              style={styles.iconInfo}
              name="time-outline"
              size={20}
              color={Colors.BLACK}
            />
          }
          color={Colors.BLACK}
          text={`${t('Profile.profileOperatingHours')}: ${timeWork}`}
        />

        <TextComponent
          marginTop={8}
          suffix={
            <IconFontAwesome
              style={styles.iconInfo}
              name="barcode"
              size={20}
              color={Colors.BLACK}
            />
          }
          color={Colors.BLACK}
          text={`${t('Profile.profileTaxID')}: ${taxIdentificationNumber}`}
        />

        <TextComponent
          marginTop={8}
          suffix={
            <IconFeather
              style={styles.iconInfo}
              name="user"
              size={20}
              color={Colors.BLACK}
            />
          }
          color={Colors.BLACK}
          text={`${t('Profile.profileRepresentative')}: ${representor}`}
        />

        <TextComponent
          marginTop={8}
          suffix={
            <IconEvilIcons
              style={styles.iconInfo}
              name="location"
              size={20}
              color={Colors.BLACK}
            />
          }
          color={Colors.BLACK}
          text={`${t('Profile.profileAddress')}: ${address}`}
        />

        <TextComponent
          marginTop={8}
          suffix={
            <IconFeather
              style={styles.iconInfo}
              name="phone-call"
              size={20}
              color={Colors.BLACK}
            />
          }
          color={Colors.BLACK}
          text={`${t('Profile.profilePhone')}: ${phone}`}
        />

        <TextComponent
          marginTop={8}
          suffix={
            <IconFontisto
              style={styles.iconInfo}
              name="email"
              size={20}
              color={Colors.BLACK}
            />
          }
          color={Colors.BLACK}
          text={`${t('Profile.profileEmail')}: ${email}`}
        />
      </View>
      {/* Number post */}
      <TextComponent
        style={[styles.paddingVertical]}
        text={`${t('Profile.profileArticles')} (${numberPost})`}
      />
    </SessionComponent>
  );
};

export default BusinessBody;
