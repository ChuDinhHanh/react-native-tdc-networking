import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon1 from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../../App';
import { Colors } from '../../../constants/Colors';
import { PROFILE_SCREEN } from '../../../constants/Screen';
import ButtonComponent from '../../buttons/ButtonComponent';
import DefaultAvatar from '../../common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../row/RowComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import styles from './UserItem.style';

interface UserItemType {
  id: number;
  image: string;
  name: string;
  isFollow: boolean;
  group: string;
  onFollow: (userId: number) => void;
}

interface OptionItem {
  type: number;
  title: string;
  visible: boolean;
}

export default function UserItem(props: Readonly<UserItemType>) {
  const { group, onFollow, id, image, isFollow, name } = props;
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const printfOptions = useMemo(() => {
    const options: OptionItem[] = [
      {
        type: 1,
        title: t('UserItem.profile'),
        visible: true,
      },
      {
        type: 2,
        title: t('UserItem.unFollow'),
        visible: isFollow,
      },
    ];
    return options;
  }, [isFollow, id]);

  const handleMoveToProfileScreen = () => {
    navigation.navigate(PROFILE_SCREEN, { userId: id, group: group });
  };

  const isFollowed = () => {
    return (
      <Menu key={id}>
        <MenuTrigger>
          <View style={{ paddingTop: 10 }}>
            <Icon1 name="dots-three-vertical" size={18} color="#000000" />
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menuOption}>
          <MenuOption onSelect={handleMoveToProfileScreen}>
            <Text style={styles.menuText}>{t('UserItem.profile')}</Text>
          </MenuOption>
          <MenuOption onSelect={() => onFollow(id)}>
            <Text style={styles.menuText}>{t('UserItem.unFollow')}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  };

  const isNotFollow = () => {
    return (
      <ButtonComponent
        affix={<Ionicons name="person-add" size={15} color={Colors.WHITE} />}
        padding={10}
        borderRadius={5}
        backgroundColor={Colors.COLOR_BTN_BLUE_PRIMARY}
        onPress={() => onFollow(id)}
      />
    );
  };

  return (
    <RowComponent
      backgroundColor={Colors.GREY_FEEBLE}
      borderRadius={10}
      padding={5}
      marginVertical={4}
      justifyContent="space-between"
      alignItems="center"
      key={id}
      onPress={handleMoveToProfileScreen}>
      <View style={styles.wrapperItem}>
        <RowComponent justifyContent="flex-start" alignItems="center">
          <View style={styles.wrapperAvatar}>
            <DefaultAvatar size={50} identifer={name[0]} />
          </View>
          <View style={styles.wrapperContent}>
            <TextComponent text={name} color={Colors.BLACK} fontSize={10} />
          </View>
        </RowComponent>
      </View>
      <SpaceComponent width={10} />
      <View>{isFollow ? isFollowed() : isNotFollow()}</View>
    </RowComponent>
  );
}
