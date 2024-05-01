import React from 'react';
import { useTranslation } from 'react-multi-lang';
import { View } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import SessionComponent from '../../../../components/session/SessionComponent';
import TextComponent from '../../../../components/text/TextComponent';
import { Colors } from '../../../../constants/Colors';
import { Variable } from '../../../../constants/Variables';
import styles from './FacultyBody.style';

interface Props {
  t: ReturnType<typeof useTranslation>
  isFollow: boolean,
  onClickButtonEvent: (flag: number) => void,
  phone: string,
  email: string,
  name: string,
  numberPost: number,
  isSameUser: boolean,
}

const FacultyBody = (props: Props) => {
  const { email, isFollow, isSameUser, name, numberPost, onClickButtonEvent, phone, t } = props;
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
            <IconFeather
              style={styles.iconInfo}
              name='phone-call' size={20} color={Colors.BLACK} />
          }
          color={Colors.BLACK}
          text={`${t("Profile.profilePhone")}: ${phone}`}
        />

        <TextComponent
          marginTop={8}
          suffix={
            <IconFontisto
              style={styles.iconInfo}
              name='email' size={20} color={Colors.BLACK} />
          }
          color={Colors.BLACK}
          text={`${t("Profile.profileEmail")}: ${email}`}
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

export default FacultyBody;
