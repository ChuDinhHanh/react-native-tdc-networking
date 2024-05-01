import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SERVER_ADDRESS} from '../../constants/SystemConstant';
import DefaultAvatar from '../common/defaultAvatar/DefaultAvatar';
import {Avatar} from 'react-native-paper';
import RowComponent from '../row/RowComponent';
import TextComponent from '../text/TextComponent';
import {Colors} from '../../constants/Colors';
import SpaceComponent from '../space/SpaceComponent';

interface Props {
  avatar: string;
  name: string;
  email: string;
}

const DrawerHeader = (props: Props) => {
  const {email, name, avatar} = props;
  return (
    <View>
      {avatar && Boolean(avatar) ? (
        <Avatar.Image
          size={60}
          source={{uri: SERVER_ADDRESS + 'api/images/' + avatar}}
        />
      ) : (
        <DefaultAvatar size={60} identifer={name[0]} />
      )}
      <SpaceComponent height={10} />
      <TextComponent
        text={name}
        fontSize={16}
        fontWeight="bold"
        color={Colors.BLACK}
      />
      <TextComponent text={email} fontSize={14} />
    </View>
  );
};

export default DrawerHeader;
