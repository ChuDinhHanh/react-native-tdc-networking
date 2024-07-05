import {View, Pressable, Image, Text} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from './NotificationItem.style';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon1 from 'react-native-vector-icons/Entypo';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import RowComponent from '../../row/RowComponent';
import DefaultAvatar from '../../common/defaultAvatar/DefaultAvatar';
import {useIsFocused} from '@react-navigation/native';
import {Variable} from '../../../constants/Variables';
import moment from 'moment';
import vi from '../../../languages/vi.json';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import {Colors} from '../../../constants/Colors';
import TextComponent from '../../text/TextComponent';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

export interface Props {
  id: any;
  status: string;
  dataValue: any;
  type: string;
  createdAt: any;
  content: string;
  userInteracted: any;
  onClickItem: (id: number) => void;
  onMarkNotRead: (id: number) => void;
  onDelNotification: (id: number) => void;
  onItemCanNotClick: (id: number) => void;
}

export interface Value {
  header: string;
  body: string;
  image: string;
  group: string;
  defaultImage: string;
  time: string;
  canClick: boolean;
}

const NotificationItem = (props: Props) => {
  const {
    content,
    createdAt,
    dataValue,
    id,
    onDelNotification,
    onClickItem,
    onMarkNotRead,
    onItemCanNotClick,
    status,
    type,
    userInteracted,
  } = props;
  const t = useTranslation();
  const isFocused = useIsFocused();
  const [value, setValue] = useState<Value>({
    header: '',
    body: '',
    image: '',
    group: '',
    defaultImage: '',
    time: '',
    canClick: false,
  });

  useEffect(() => {
    checkType();
  }, [isFocused, props]);

  const checkType = useCallback(() => {
    switch (props.type) {
      // Thong bao dang ky thanh cong
      case Variable.REGISTER_SUCCESS:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: t('Notifications.register_success'),
          image: '',
          group: '',
          time: props.createdAt,
        });
        break;
      // Thong báo thay đổi mk
      case Variable.CHANGE_PASSWORD_SUCCESS:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: t('Notifications.change_password_success'),
          image: '',
          group: '',
          time: props.createdAt,
        });
        break;

      // Doanh nghiệp đăng khảo sát
      case Variable.CREATE_SURVEY:
        setValue({
          ...value,
          defaultImage:
            props.userInteracted.name.length > 0
              ? props.userInteracted.name[0]
              : '',
          header: props.userInteracted.name,
          body: t('Notifications.create_survey'),
          image: props.userInteracted.image,
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Bài viết đã lưu
      case Variable.SAVE_POST:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: t('Notifications.save_post'),
          image: '',
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Người dùng like bài viết của mình
      case Variable.USER_LIKE_POST:
        setValue({
          ...value,
          defaultImage:
            props.userInteracted.name.length > 0
              ? props.userInteracted.name[0]
              : '',
          header: props.userInteracted.name,
          body: t('Notifications.user_like_post'),
          image: props.userInteracted.image,
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Người dùng comment bài viết của mình
      case Variable.USER_COMMENT_POST:
        setValue({
          ...value,
          defaultImage:
            props.userInteracted.name.length > 0
              ? props.userInteracted.name[0]
              : '',
          header: props.userInteracted.name,
          body: t('Notifications.user_comment_post'),
          image: props.userInteracted.image,
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Trả lời comment của mình trong bài viết
      case Variable.USER_REPLY_COMMENT:
        setValue({
          ...value,
          defaultImage:
            props.userInteracted.name.length > 0
              ? props.userInteracted.name[0]
              : '',
          header: props.userInteracted.name,
          body: t('Notifications.user_reply_comment'),
          image: props.userInteracted.image,
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Người trả lời khảo sát của mình
      case Variable.USER_CONDUCT_SURVEY:
        setValue({
          ...value,
          defaultImage:
            props.userInteracted.name.length > 0
              ? props.userInteracted.name[0]
              : '',
          header: props.userInteracted.name,
          body: t('Notifications.user_conduct_survey'),
          image: props.userInteracted.image,
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Bài viết không được duyệt
      case Variable.POST_LOG:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: title_post_log,
          image: '',
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Bài viết đã được duyệt
      case Variable.ACCEPT_POST:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: t('Notifications.accept_post'),
          image: '',
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Cập nhật trang cá nhân
      case Variable.USER_UPDATE:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: t('Notifications.user_update'),
          image: '',
          group: '',
          time: props.createdAt,
        });
        break;
      // Có người follow mình
      case Variable.USER_FOLLOW:
        setValue({
          ...value,
          defaultImage:
            props.userInteracted.name.length > 0
              ? props.userInteracted.name[0]
              : '',
          header: props.userInteracted.name,
          body: t('Notifications.user_follow'),
          image: props.userInteracted.image,
          group: '',
          time: props.createdAt,
        });
        break;
      // Thay đổi ngôn ngữ
      case Variable.USER_CHANGE_LANGUAGE:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: t('Notifications.user_change_language'),
          image: '',
          group: '',
          time: props.createdAt,
        });
        break;
      // Thông báo cho người nộp tuyển dụng
      case Variable.USER_APPLY_JOB:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body:
            `${t('Notifications.user_apply_job')} " ` +
            props.dataValue?.jobTitle +
            ' "',
          image: props.dataValue != null ? props.dataValue.studentAvatar : '',
          group: '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      // Thông báo cho người đăng tuyển dụng có người tuyển dụng (Bài đăng tuyển dụng của mình)
      case Variable.USER_CREATE_WATCH_JOB:
        setValue({
          ...value,
          defaultImage:
            props.userInteracted.name.length > 0
              ? props.userInteracted.name[0]
              : '',
          header: props.userInteracted.name,
          body:
            `${t('Notifications.user_create_watch_job')} " ` +
            props.dataValue.title +
            ' "',
          image: props.userInteracted.image,
          group: props?.dataValue?.group?.name ?? '',
          time: props.createdAt,
          canClick: true,
        });
        break;
      case Variable.USER_UPDATE_AVATAR:
        setValue({
          ...value,
          defaultImage: 'admin',
          header: '',
          body: 'Bạn vừa cập nhật ảnh nền',
          image: '',
          group: '',
          time: props.createdAt,
        });
        break;
      default:
        return null;
    }
  }, [props.type]);

  const title_post_log = useMemo(() => {
    let title = '';
    if (props.dataValue != null) {
      if (props.dataValue.post) {
        title += 'Bài viết: "';
        if (props.dataValue.post.title) {
          if (props.dataValue.post.title > 15) {
            title +=
              props.dataValue.post.title.substring(0, 15) + '..." bị từ chối';
          }
        } else {
          title += props.dataValue.post.content;
        }
      }
    }
    return title;
  }, [props]);

  return (
    <View>
      <Pressable
        onPress={() =>
          value.canClick === true
            ? onClickItem(props.id)
            : onItemCanNotClick(props.id)
        }
        style={[
          styles.item,
          {
            backgroundColor:
              props.status === '1' ? Colors.WHITE : Colors.COLOR_BLUE_FEEBLE,
          },
        ]}>
        <RowComponent alignItems="center" justifyContent="space-between">
          {/* Hinh */}
          {value.image ? (
            <Image
              style={styles.image}
              source={{
                uri: 'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg',
              }}
            />
          ) : value.defaultImage === 'admin' ? (
            <Image
              style={styles.image}
              source={require('../../../assets/image/splash/logo.png')}
            />
          ) : (
            <DefaultAvatar size={60} identifer={value.defaultImage[0]} />
          )}
          {/* Noi dung */}
          <View style={styles.content}>
            <Text
              style={[
                styles.name,
                {
                  color:
                    props.status === '1'
                      ? Colors.COLOR_CONTENT_HAD_RED
                      : Colors.BLACK,
                },
              ]}>
              <Text style={styles.nameTxt}>{value.header}</Text>
              {value.body}
              {value.group != '' ? t('Notifications.in_group') : '.'}
              <Text style={styles.nameTxt}>
                {' '}
                {value.group != '' ? value.group + '.' : ''}
              </Text>
            </Text>
            <TextComponent
              style={styles.tg}
              text={moment(value.time).fromNow()}
            />
          </View>
          {/* Menu */}
          <Menu style={styles.menu} key={props.id}>
            <MenuTrigger>
              <Icon1
                name="dots-three-vertical"
                size={17}
                color={Colors.BLACK}
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuOptions}>
              <MenuOption onSelect={() => onDelNotification(props.id)}>
                <TextComponent
                  style={styles.option}
                  text={t('NotificationsComponent.deleteNotification')}
                />
              </MenuOption>
              <MenuOption onSelect={() => onMarkNotRead(props.id)}>
                <TextComponent
                  style={styles.option}
                  text={t('NotificationsComponent.unReadNotification')}
                />
              </MenuOption>
            </MenuOptions>
          </Menu>
        </RowComponent>
      </Pressable>
    </View>
  );
};

export default NotificationItem;
