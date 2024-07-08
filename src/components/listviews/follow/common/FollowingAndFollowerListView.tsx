import React, { memo, useMemo, useState } from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import { View } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../../constants/Colors';
import en from '../../../../languages/en.json';
import jp from '../../../../languages/jp.json';
import vi from '../../../../languages/vi.json';
import { useAppSelector } from '../../../../redux/Hook';
import {
  useFollowMutation
} from '../../../../redux/Service';
import ContainerComponent from '../../../../screens/container/ContainerComponent';
import { FollowRequest } from '../../../../types/request/FollowRequest';
import InputComponentWithTextError from '../../../input/inputComponentWithTextError/InputComponentWithTextError';
import UserItem from '../../../items/userItem/UserItem';
import SessionComponent from '../../../session/SessionComponent';
import styles from './FollowingAndFollowerListView.style';
setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface Props {
  flag: boolean;
  data: any;
}

const FollowingAndFollowerListView = (props: Props) => {
  const t = useTranslation();
  const {flag, data} = props;
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);
  const [
    follow,
    {isLoading: _isFollow, isError: followError, error: followErrorMessage},
  ] = useFollowMutation();
  const [search, setSearch] = useState('');

  const filter = data?.data?.filter((item: any) =>
    item.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/d/g, 'đ')
      .includes(
        search
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/d/g, 'đ'),
      ),
  );

  const followAction = (uid: number) => {
    const followData: FollowRequest = {
      userFollowId: uid,
      userId: userLogin?.id ?? 0,
    };
    follow(followData);
  };

  const handleDelSearch = () => {
    setSearch('');
  };

  const printfUsers = useMemo(() => {
    const _data = search == '' ? data?.data : filter;
    return _data?.map((item: any) => (
      <UserItem
        key={item.id}
        id={item.id}
        name={item.name}
        image={item.image}
        isFollow={flag}
        group={item.group}
        onFollow={followAction}
      />
    ));
  }, [data, search]);

  return (
    <ContainerComponent isFullHeight={true} isFullWidth={true}>
      <SessionComponent>
        <View style={styles.wrapper}>
          <InputComponentWithTextError
            affix={
              <IconFeather name={'search'} size={25} color={Colors.BLACK} />
            }
            placeholder={t('FollowComponent.search')}
            typePassword={false}
            validateVisible={false}
            allowClear={true}
            onChange={val => setSearch(val)}
            validateTextError={''}
          />
        </View>
        {printfUsers}
      </SessionComponent>
    </ContainerComponent>
  );
};

export default memo(FollowingAndFollowerListView);
