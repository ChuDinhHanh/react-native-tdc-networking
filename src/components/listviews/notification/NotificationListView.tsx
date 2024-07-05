import React from 'react';
import {FlatList} from 'react-native';
import NotificationItem from '../../items/notificationItem/NotificationItem';

export interface Props {
  data: any;
  onClickItem: (id: number) => void;
  onMarkNotRead: (id: number) => void;
  onDelNotification: (id: number) => void;
  onItemCanNotClick: (id: number) => void;
}

const NotificationListView = (props: Props) => {
  const {
    data,
    onDelNotification,
    onItemCanNotClick,
    onClickItem,
    onMarkNotRead,
  } = props;
  return (
    <FlatList
      scrollEnabled={false}
      refreshing={false}
      onRefresh={() => {}}
      data={data}
      extraData={data}
      renderItem={({item, index}) => (
        <NotificationItem
          id={item.id}
          status={item.status}
          type={item.type}
          userInteracted={item.userInteracted}
          dataValue={item.dataValue}
          createdAt={item.createdAt}
          content={item.content}
          onClickItem={onClickItem}
          onMarkNotRead={onMarkNotRead}
          onDelNotification={onDelNotification}
          onItemCanNotClick={onItemCanNotClick}
        />
      )}
    />
  );
};

export default NotificationListView;
