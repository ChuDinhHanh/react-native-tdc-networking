import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Client} from 'stompjs';
import {setDefaultLanguage, useTranslation} from 'react-multi-lang';
import {useAppSelector} from '../../../redux/Hook';
import {
  useGetFollowerUserQuery,
  useGetFollowingUserQuery,
} from '../../../redux/Service';
import {useIsFocused} from '@react-navigation/native';
import {Post} from '../../../types/Post';
let stompClient: Client;
import vi from '../../../languages/vi.json';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import FollowingAndFollowerListView from '../../../components/listviews/follow/common/FollowingAndFollowerListView';

setDefaultLanguage('vi');

const FollowerScreen = () => {
  const t = useTranslation();
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();
  const [users, setUsers] = useState<any>();
  const latestDataRef = useRef<any>();
  const {data, isFetching} = useGetFollowerUserQuery(
    {
      id: userLogin?.id,
    },
    {
      pollingInterval: isFocused ? 2000 : 24 * 60 * 60,
    },
  );

  useEffect(() => {
    if (data) {
      latestDataRef.current = data.data || [];
      setUsers(latestDataRef.current);
    }
  }, [data]);

  const handleClickOnUserItemEvent = (uid: number) => {
    console.log('handleClickOnUserItemEvent');
  };

  return <FollowingAndFollowerListView flag={false} data={data} />;
};

export default FollowerScreen;
