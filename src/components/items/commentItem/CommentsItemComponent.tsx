import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../../App';
import {Colors} from '../../../constants/Colors';
import {PROFILE_SCREEN} from '../../../constants/Screen';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {useAppDispatch, useAppSelector} from '../../../redux/Hook';
import {setHiddenBottomSheet} from '../../../redux/Slice';
import {numberDayPassed} from '../../../utils/FormatTimeUtils';
import ButtonComponent from '../../buttons/ButtonComponent';
import DefaultAvatar from '../../common/defaultAvatar/DefaultAvatar';
import Content from '../../post/session/content/Content';
import RowComponent from '../../row/RowComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import styles from './CommentsItemComponent.style';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface Props {
  item: any;
  type: 1 | 2;
  onPress?: () => void;
  seeMore?: boolean;
  totalOfScreen?: number;
  onDeleteEvent: (postId: number) => void;
  onReplyEvent: (postId: number, name: string) => void;
}

const CommentsItemComponent = (props: Props) => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
  );
  const dispatch = useAppDispatch();
  const {
    item,
    onPress,
    seeMore,
    type,
    totalOfScreen,
    onDeleteEvent,
    onReplyEvent,
  } = props;

  const handlePressAvatarAndName = () => {
    navigation.navigate(PROFILE_SCREEN);
    dispatch(setHiddenBottomSheet());
  };

  return (
    <RowComponent
      marginVertical={10}
      justifyContent="flex-start"
      marginLeft={type === 1 ? 0 : 32}>
      <View style={styles.wrapperLeft}>
        <TouchableOpacity onPress={handlePressAvatarAndName}>
          <DefaultAvatar
            size={type === 1 ? 45 : 38}
            identifer={item.user.name[0]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperRight}>
        <ButtonComponent
          style={{alignSelf: 'flex-start'}}
          onPress={handlePressAvatarAndName}
          title={
            <Text style={{color: Colors.BLACK}}>
              {item.user.name}
              {item.user.id === userLogin?.id && (
                <Text style={{color: Colors.COLOR_BLUE_BANNER}}>
                  {'\xa0'}
                  <MaterialCommunityIconsIcon
                    name="microphone-variant"
                    color={Colors.COLOR_BLUE_BANNER}
                    size={15}
                  />
                  Tác giả
                </Text>
              )}
            </Text>
          }
        />
        <Content
          paddingVertical={5}
          t={t}
          content={item.content ?? item.feedback}
        />
        <View style={styles.bottom}>
          <RowComponent justifyContent="space-between" alignItems="center">
            <TextComponent
              fontSize={10}
              text={numberDayPassed(item.createdAt)}
              color={Colors.BLACK}
            />
            <ButtonComponent
              onPress={() => onReplyEvent(item.id, item.user.name)}
              title={
                <TextComponent
                  fontSize={10}
                  text={t('Comment.commentReplyComment')}
                  color={Colors.BLACK}
                />
              }
            />
            {userLogin?.id === item.user.id && (
              <ButtonComponent
                onPress={() => onDeleteEvent(item.id)}
                title={
                  <TextComponent
                    fontSize={10}
                    text={t('Comment.commentDeleteComment')}
                    color={Colors.BLACK}
                  />
                }
              />
            )}
          </RowComponent>
          {onPress && (
            <RowComponent
              onPress={onPress}
              alignItems="center"
              justifyContent="flex-start">
              <View
                style={{width: 30, height: 1, backgroundColor: Colors.BLACK}}
              />
              <SpaceComponent width={5} />
              <TextComponent
                fontSize={10}
                color={Colors.BLACK}
                text={!seeMore ? `Xem ${totalOfScreen} câu trả lời` : 'Ẩn bớt'}
              />
            </RowComponent>
          )}
        </View>
      </View>
    </RowComponent>
  );
};

export default CommentsItemComponent;
