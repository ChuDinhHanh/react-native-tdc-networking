import React, {memo, useMemo} from 'react';
import {useTranslation} from 'react-multi-lang';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../../../constants/Colors';
import {Variable} from '../../../../constants/Variables';
import {useAppSelector} from '../../../../redux/Hook';
import DefaultAvatar from '../../../common/defaultAvatar/DefaultAvatar';
import SpaceComponent from '../../../space/SpaceComponent';
import TextComponent from '../../../text/TextComponent';
import styles from './Header.style';

export interface Props {
  t: ReturnType<typeof useTranslation>;
  userId: number;
  name: string;
  avatar: string;
  typeAuthor: string | null;
  available: boolean | null;
  timeCreatePost: string;
  type: string | null;
  role: string;
  isSave: number;
  active: number;
  onClickMenuOption: (flag: number) => void;
  onClickIntoAvatarAndNameAndMenuEvent: (flag: number) => void;
}

interface MenuOptionItem {
  type: number;
  name: string;
  visible: boolean;
}

const Header = (props: Props) => {
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);
  const {
    active,
    available,
    avatar,
    onClickIntoAvatarAndNameAndMenuEvent,
    onClickMenuOption,
    isSave,
    name,
    role,
    t,
    timeCreatePost,
    type,
    typeAuthor,
    userId,
  } = props;

  // Constant
  const NUM_OF_LINES = 5;
  const HEADER_ICON_SIZE = 15;
  const BOTTOM_ICON_SIZE = 30;

  const menuOptions = useMemo<MenuOptionItem[]>(() => {
    const options: MenuOptionItem[] = [
      {
        type: Variable.CLICK_SAVE_POST_EVENT,
        name: t('MenuOption.menuOptionSaveArticle'),
        visible: isSave === 0 && userLogin?.id !== userId,
      },
      {
        type: Variable.CLICK_UN_SAVE_POST,
        name: t('MenuOption.menuOptionUnSaveArticle'),
        visible: isSave === 0 && userLogin?.id !== userId,
      },
    ];

    if (userLogin?.id === userId) {
      options.push({
        type: Variable.CLICK_UPDATE_POST,
        name: t('MenuOption.menuOptionViewSurveyUpdateNormalPost'),
        visible: isSave === 0 && userLogin?.id !== userId,
      });
    }

    if (userLogin?.id === userId && type === Variable.TYPE_RECRUITMENT_POST) {
      options.push({
        type: Variable.CLICK_SEE_LIST_CV_POST_EVENT,
        name: t('MenuOption.menuOptionViewResumeList'),
        visible: true,
      });
    }

    if (userLogin?.id === userId && type === Variable.TYPE_SURVEY_POST) {
      options.push({
        type: Variable.CLICK_SEE_RESULT_POST_EVENT,
        name: t('MenuOption.menuOptionViewSurveyResults'),
        visible: true,
      });
    }

    if (userLogin?.id === userId) {
      options.push({
        type: Variable.CLICK_DELETE_POST_EVENT,
        name: t('MenuOption.menuOptionDeleteArticle'),
        visible: true,
      });
    }

    return options;
  }, [isSave, userId, type, userLogin?.id, t, active]);

  const handlePrintMenuOption = useMemo(() => {
    return menuOptions.map(
      (item, index) =>
        item.visible && (
          <MenuOption
            key={item.type}
            onSelect={() => props.onClickMenuOption(item.type)}>
            <TextComponent fontSize={15} text={item.name} />
          </MenuOption>
        ),
    );
  }, [menuOptions]);

  return (
    <View style={[styles.wrapHeader]}>
      <View style={styles.wrapAvatar}>
        <TouchableOpacity
          onPress={() =>
            onClickIntoAvatarAndNameAndMenuEvent(Variable.GO_TO_PROFILE_ACTIONS)
          }>
          <DefaultAvatar size={43} identifer={name[0]} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapName}>
        <TouchableOpacity
          onPress={() =>
            onClickIntoAvatarAndNameAndMenuEvent(Variable.GO_TO_PROFILE_ACTIONS)
          }>
          {/* Name */}
          <Text style={[styles.headerBusinessName, styles.headerItem]}>
            {name}
            <SpaceComponent width={10} />
            {role !== Variable.TYPE_POST_STUDENT && (
              <IconAntDesign
                name="checkcircle"
                size={HEADER_ICON_SIZE}
                color={Colors.COLOR_BLUE_BANNER}
                style={styles.headerItem}
              />
            )}
          </Text>
        </TouchableOpacity>
        <View style={styles.headerCenterTop}>
          {/* Time created post */}
          <TextComponent
            style={[styles.headerCenterTimePost, styles.headerItem]}
            text={timeCreatePost}
          />
          {/* Type author */}
          {(role === Variable.TYPE_POST_BUSINESS ||
            role === Variable.TYPE_POST_FACULTY) &&
            type !== Variable.TYPE_NORMAL_POST && (
              <View style={styles.headerCenterType}>
                <TextComponent
                  fontSize={10}
                  fontWeight="bold"
                  color={Colors.BLACK}
                  text={typeAuthor ?? ''}
                />
              </View>
            )}
        </View>
      </View>
      <View style={styles.wrapMenu}>
        <Menu>
          <MenuTrigger>
            <View style={styles.wrapperMenu}>
              <IconEntypo
                name="dots-three-vertical"
                size={HEADER_ICON_SIZE}
                color={Colors.COLOR_BLACK}
              />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.menuOption}>
            {handlePrintMenuOption}
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default memo(Header);
