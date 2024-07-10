import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { ActivityIndicator, ScrollView, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MenuProvider } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Client, Frame } from 'stompjs';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import UserItem from '../../components/items/userItem/UserItem';
import PostTypeChecker from '../../components/post/postTypeChecker/PostTypeChecker';
import RowComponent from '../../components/row/RowComponent';
import SessionComponent from '../../components/session/SessionComponent';
import { Colors } from '../../constants/Colors';
import { SERVER_ADDRESS } from '../../constants/SystemConstant';
import { Variable } from '../../constants/Variables';
import { useAppSelector } from '../../redux/Hook';
import { getStompClient } from '../../sockets/getStompClient';
import { globalStyles } from '../../styles/GlobalStyles';
import { LikeAction } from '../../types/LikeAction';
import { LikeSearch } from '../../types/LikeSearch';
import ContainerComponent from '../container/ContainerComponent';
import styles from './SearchScreen.style';
import SkeletonPost from '../../components/skeleton/post/SkeletonPost';

let stompClient: Client
const SearchScreen = () => {
  console.log('================SearchScreen====================');
  const t = useTranslation();
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [subjects, setSubjects] = useState('user');
  const [qty, setQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(t('SearchComponent.user'));
  const [label2, setLabel2] = useState(`- - ${t('SearchComponent.student')} - -`);
  const [type, setType] = useState(Variable.TYPE_POST_STUDENT);
  let URL = `${SERVER_ADDRESS}api/find/post`;
  const [items, setItems] = useState([
    {
      label: t('SearchComponent.user'),
      value: 'user',
      children: [
        { label: `- - ${t('SearchComponent.student')} - -`, value: Variable.TYPE_POST_STUDENT },
        { label: `- - ${t('SearchComponent.business')} - -`, value: Variable.TYPE_POST_BUSINESS },
        { label: `- - ${t('SearchComponent.faculty')} - -`, value: Variable.TYPE_POST_FACULTY }
      ]
    }, {
      label: t('SearchComponent.post'),
      value: 'post',
      children: [
        { label: `- - ${t('SearchComponent.normal')} - -`, value: Variable.TYPE_NORMAL_POST },
        { label: `- - ${t('SearchComponent.survey')} - -`, value: Variable.TYPE_SURVEY_POST },
        { label: `- - ${t('SearchComponent.recruitment')} - -`, value: Variable.TYPE_RECRUITMENT_POST }
      ]
    }
  ]);

  const handleSearch = () => {
    setIsLoading(true);
    if (stompClient.connected) {
      if (subjects == 'user') {
        stompClient.send(`/app/find/user/follow`, {}, JSON.stringify({
          userId: userLogin?.id,
          type: type,
          name: search,
          userFollowId: null
        }))
      }
      else {
        stompClient.send(`/app/find/post/unsave`, {}, JSON.stringify({
          userId: userLogin?.id,
          type: type,
          search: search,
          postId: null
        }))
      }
    }
  }


  const checkType = useMemo(() => {
    switch (subjects) {
      case 'user':
        return masterData.map((item: any, index) =>
          <UserItem key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            isFollow={item.isFollow}
            group={item.group}
            onFollow={(userId) => handleFollow(userId)} />
        )
      case 'post':
        return (
          <>
            {
              masterData?.map((item: any) => (
                <PostTypeChecker
                  key={item.id}
                  id={item.id}
                  userId={item.user['id']}
                  name={item.user['name']}
                  avatar={item.user['image']}
                  typeAuthor={'Doanh Nghiệp'}
                  available={null}
                  timeCreatePost={item.createdAt}
                  content={item.content}
                  type={item.type}
                  likes={item.likes}
                  comments={item.comment}
                  commentQty={item.commentQuantity}
                  images={item.images}
                  role={item.user['roleCodes']}
                  likeAction={likeAction}
                  location={item.location ?? null}
                  title={item.title ?? null}
                  expiration={item.expiration ?? null}
                  salary={item.salary ?? null}
                  employmentType={item.employmentType ?? null}
                  description={item.description ?? null}
                  isSave={item.isSave}
                  group={''}
                  onUnSave={handleUnSave}
                  onDelete={() => { }}
                  active={0} />
              ))
            }
          </>
        )
      default:
        return null;
    }
  }, [masterData, subjects]);

  const handleUnSave = (idPost: number) => {
    stompClient.send(`/app/find/post/unsave`, {}, JSON.stringify({
      userId: userLogin?.id,
      type: type,
      search: search,
      postId: idPost
    }))
  }


  const handleFollow = (userId: number) => {
    stompClient.send(
      `/app/find/user/follow`,
      {},
      JSON.stringify({
        userId: userLogin?.id,
        type: type,
        name: search,
        userFollowId: userId
      })
    )
  }

  const likeAction = (obj: LikeAction) => {
    const likeData: Omit<LikeSearch, 'code'> = {
      postId: obj.postId,
      userId: obj.userId,
      type: type,
      search: search
    }
    like(likeData);
  }

  const like = useCallback((likeData: Omit<LikeSearch, 'code'>) => {
    stompClient.send(`/app/find/post/like`, {}, JSON.stringify(likeData))
  }, [subjects])

  useEffect(() => {

    stompClient = getStompClient()
    const onConnected = () => {
      if (stompClient.connected) {
        stompClient.subscribe(`/topic/find/user`, onMessageFindUserReceived)
        stompClient.subscribe(`/topic/find/post`, onMessageFindPostReceived)
      }
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, []);

  const onMessageFindUserReceived = (payload: any) => {
    if (subjects == 'user') {
      setIsLoading(false);
      setMasterData(JSON.parse(payload.body))
    }
  }

  const onMessageFindPostReceived = (payload: any) => {
    setIsLoading(false);
    setMasterData(JSON.parse(payload.body))
  }

  return (
    <ContainerComponent
      isFull={true}
      backgroundColor={Colors.WHITE}
    >
      <SessionComponent>
        <View style={styles.wrapperSearchArea}>
          <RowComponent
            alignItems='center'
            backgroundColor={Colors.COLOR_GREY_FEEBLE}
            borderRadius={10}
          >
            <TextInput
              style={styles.search}
              placeholder={t('SearchComponent.search')}
              placeholderTextColor='#000000'
              value={search}
              onChangeText={(txt) => setSearch(txt)}
            />
            <ButtonComponent
              style={styles.buttonSearch}
              onPress={handleSearch}
              affix={<Icon name='search' size={25} color={Colors.BLACK} />}
            />
          </RowComponent>
        </View>
        <RowComponent
          alignItems='center'
          marginVertical={5}
          justifyContent='space-between'
        >
          <Dropdown
            style={[styles.dropDown, globalStyles.shadow]}
            data={items}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={label}
            value={value}
            onChange={item => {
              setMasterData([])
              setQty(0)
              setLabel(item.label)
              setSubjects(item.value)
              setType(item.label === t('SearchComponent.post') ? items[1].children[0].value : items[0].children[0].value)
              setLabel2(item.label === t('SearchComponent.post') ? items[1].children[0].label : items[0].children[0].label)
            }}
          />
          <Dropdown
            style={[styles.dropDown2, globalStyles.shadow]}
            data={label === t('SearchComponent.post') ? items[1].children : items[0].children}
            value={value}
            placeholder={label2}
            labelField='label'
            valueField='value'
            onChange={(item) => {
              setType(item.value)
            }}
          />
        </RowComponent>
      </SessionComponent>
      <MenuProvider>
        <ScrollView>
          {isLoading ?
            <SkeletonPost />
            :
            checkType
          }
        </ScrollView>
      </MenuProvider>
    </ContainerComponent>
  );
};

export default SearchScreen;
