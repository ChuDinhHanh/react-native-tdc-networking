import React from 'react';
import {Image, Pressable, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import DefaultAvatar from '../../../../components/common/defaultAvatar/DefaultAvatar';
import {Colors} from '../../../../constants/Colors';
import {Variable} from '../../../../constants/Variables';
import styles from './Header.style';

interface Props {
  isSameUser: boolean;
  background: string;
  avatar: string | null;
  name: string;
  onClickIntoHeaderComponentEvent: (flag: number) => void;
}

const Header = (props: Props) => {
  const {
    avatar,
    background,
    isSameUser,
    name,
    onClickIntoHeaderComponentEvent,
  } = props;

  return (
    <View>
      {/* Background */}
      <Pressable
        onPress={() =>
          onClickIntoHeaderComponentEvent(Variable.SEE_BACKGROUND)
        }>
        <Image
          style={styles.imageBackground}
          // source={{ uri: SERVER_ADDRESS + `api/images/${background}` }}
          source={{uri: `${background}`}}
        />
        <View style={styles.wrapperCameraBackground}>
          {isSameUser && (
            <Pressable
              onPress={() =>
                onClickIntoHeaderComponentEvent(
                  Variable.CLICK_CAMERA_BACKGROUND_EVENT,
                )
              }
              style={[styles.btnUploadImageBackground, styles.border]}>
              <IconEntypo name="camera" size={15} color={Colors.BLACK} />
            </Pressable>
          )}
        </View>
      </Pressable>
      <View>
        <Pressable
          onPress={() => onClickIntoHeaderComponentEvent(Variable.SEE_AVATAR)}>
          {Boolean(avatar) ? (
            <View style={[styles.imageAvatarWrapper, styles.border]}>
              <Image
                style={styles.avatar}
                // source={{ uri: SERVER_ADDRESS + `api/images/${avatar}` }}
                source={{uri: `${avatar}`}}
              />
              <Pressable
                onPress={() =>
                  onClickIntoHeaderComponentEvent(
                    Variable.CLICK_CAMERA_AVATAR_EVENT,
                  )
                }
                style={[styles.btnUploadImageAvatar, styles.border]}>
                <IconEntypo name="camera" size={15} color={Colors.BLACK} />
              </Pressable>
            </View>
          ) : (
            <View style={styles.imageAvatarWrapper}>
              <DefaultAvatar identifer={name[0]} size={120} />
              <Pressable
                onPress={() =>
                  onClickIntoHeaderComponentEvent(
                    Variable.CLICK_CAMERA_AVATAR_EVENT,
                  )
                }
                style={[styles.btnUploadImageAvatar, styles.border]}>
                <IconEntypo name="camera" size={15} color={Colors.BLACK} />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
