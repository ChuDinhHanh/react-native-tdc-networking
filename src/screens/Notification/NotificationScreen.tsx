import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import NotificationListView from '../../components/listviews/notification/NotificationListView';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import TextComponent from '../../components/text/TextComponent';
import {Colors} from '../../constants/Colors';
import en from '../../languages/en.json';
import jp from '../../languages/jp.json';
import vi from '../../languages/vi.json';
import {useAppDispatch, useAppSelector} from '../../redux/Hook';
import {
  useChangeStatusNotificationMakeNotSeeMutation,
  useChangeStatusNotificationMutation,
  useDeleteNotificationMutation,
  useGetNotificationsUserQuery,
  useMarkAsReadNotificationsMutation,
} from '../../redux/Service';
import {NotificationModel} from '../../types/response/NotificationModel ';
import ContainerComponent from '../container/ContainerComponent';
import styles from './NotificationScreen.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Variable} from '../../constants/Variables';
import {DETAIL_JOB_APPLY, DETAIL_POST_SCREEN} from '../../constants/Screen';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');
const NotificationScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
  );

  const [
    markAsReadNotifications,
    {
      isLoading: isDeleteMarkAsReadNotifications,
      isError: deleteErrorMarkAsReadNotifications,
      error: deleteErrorMessageMarkAsReadNotifications,
    },
  ] = useMarkAsReadNotificationsMutation();

  const [
    deleteNotification,
    {
      isLoading: isDeleteNotification,
      isError: deleteErrorNotification,
      error: deleteErrorMessageNotification,
    },
  ] = useDeleteNotificationMutation();

  const [
    changeStatusNotification,
    {
      isLoading: isLoadingChangeStatusNotification,
      isError: isErrorChangeStatusNotification,
      error: errorChangeStatusNotification,
    },
  ] = useChangeStatusNotificationMutation();

  const [
    changeStatusNotificationMakeNotSee,
    {
      isLoading: isLoadingChangeStatusNotificationMakeNotSee,
      isError: isErrorChangeStatusNotificationMakeNotSee,
      error: errorChangeStatusNotificationMakeNotSee,
    },
  ] = useChangeStatusNotificationMakeNotSeeMutation();

  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const latestDataRef = useRef<NotificationModel[]>([]);

  const {data, isFetching} = useGetNotificationsUserQuery(
    {
      id: userLogin?.id ?? -1,
    },
    {
      pollingInterval: isFocused ? 2000 : 86400000,
    },
  );

  useEffect(() => {
    latestDataRef.current = data?.data ?? [];
    setNotifications(latestDataRef.current);
  }, [data]);

  const handleListIsRead = async () => {
    try {
      const response = await markAsReadNotifications({
        userId: userLogin?.id ?? 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelNotification = async (id: number) => {
    try {
      const response = await deleteNotification({
        id: id,
        userId: userLogin?.id ?? 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemCanNotClick = async (id: number) => {
    try {
      const response = await changeStatusNotification({
        id: id,
        userId: userLogin?.id ?? 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkNotRead = async (id: number) => {
    try {
      const response = await changeStatusNotificationMakeNotSee({
        id: id,
        userId: userLogin?.id ?? 0,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickItem = async (id: number) => {
    const notification = data?.data.find(item => id === item.id);
    if (notification) {
      switch (notification.type) {
        case Variable.CREATE_SURVEY:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'create_survey',
          });
          break;
        case Variable.SAVE_POST:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'save_post',
          });
          break;
        case Variable.USER_LIKE_POST:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'user_like_post',
          });
          break;
        case Variable.USER_COMMENT_POST:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'user_comment_post',
          });
          break;
        case Variable.USER_REPLY_COMMENT:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'user_reply_comment',
          });
          break;
        case Variable.USER_CONDUCT_SURVEY:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'user_conduct_survey',
          });
          break;
        case Variable.ACCEPT_POST:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'accept_post',
          });
          break;
        case Variable.USER_CREATE_WATCH_JOB:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'user_create_watch_job',
          });
          break;
        case Variable.POST_LOG:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: notification.dataValue,
            notificationType: 'post_log',
          });
          break;
        case Variable.USER_APPLY_JOB:
          navigation.navigate(DETAIL_JOB_APPLY, {
            cvId: notification.dataValue.id,
          });
          break;
        default:
          navigation.navigate(DETAIL_POST_SCREEN, {
            post: null,
            notificationType: '',
          });
          break;
      }
    }
    handleItemCanNotClick(id);
  };

  return (
    <ContainerComponent isFullHeight isFullWidth>
      <ScrollView>
        <SessionComponent paddingTop={10}>
          <RowComponent justifyContent="space-between" alignItems="center">
            <TextComponent
              fontSize={18}
              color={Colors.BLACK}
              fontWeight="bold"
              text={t('NotificationsComponent.notification')}
            />
            <ButtonComponent
              style={styles.tickButton}
              title={
                <TextComponent
                  fontWeight="bold"
                  color={Colors.WHITE}
                  text={t('NotificationsComponent.readAll')}
                />
              }
              onPress={handleListIsRead}
              spacePrevious={10}
              affix={<Icon name="readme" size={20} color={Colors.WHITE} />}
            />
          </RowComponent>
        </SessionComponent>
        <NotificationListView
          data={notifications}
          onClickItem={handleClickItem}
          onMarkNotRead={handleMarkNotRead}
          onDelNotification={handleDelNotification}
          onItemCanNotClick={handleItemCanNotClick}
        />
      </ScrollView>
    </ContainerComponent>
  );
};

export default NotificationScreen;
