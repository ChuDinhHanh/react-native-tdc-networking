import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import { FlatList, ScrollView, View } from 'react-native';
import { Client, Frame } from 'stompjs';
import EmptyBanner from '../../../components/banners/common/EmptyBanner';
import PostTypeChecker from '../../../components/post/postTypeChecker/PostTypeChecker';
import SelectFacultyToolbar from '../../../components/toolbars/faculty/SelectFacultyToolbar';
import { Variable } from '../../../constants/Variables';
import { Data } from '../../../data/Data';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import { useAppSelector } from '../../../redux/Hook';
import {
  useDeletePostMutation,
  useGetFacultyPostQuery,
  useSaveOrUnSavePostMutation,
} from '../../../redux/Service';
import { getStompClient } from '../../../sockets/getStompClient';
import { LikeAction } from '../../../types/LikeAction';
import { Post } from '../../../types/Post';
import { DeletePostRequest } from '../../../types/request/DeletePostRequest';
import { SavePostRequest } from '../../../types/request/SavePostRequest';
import { GetPostActive } from '../../../utils/GetPostActiveUtils';
import { isFaculty, isStudent } from '../../../utils/UserHelper';
import ContainerComponent from '../../container/ContainerComponent';
import CreatePostToolbar from '../../../components/toolbars/post/CreatePostToolbar';
import styles from './FacultyDashboardScreen.style';
import { FACULTY_DASHBOARD_SCREEN } from '../../../constants/Screen';

setTranslations({ vi, jp, en });
setDefaultLanguage('vi');

let stompClient: Client;
const FacultyDashboardScreen = () => {
  const t = useTranslation();
  console.log('==================FacultyDashboardScreen==================');
  const isFocused = useIsFocused();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
  );
  const [
    deletePost,
    { isLoading: isDelete, isError: deleteError, error: deleteErrorMessage },
  ] = useDeletePostMutation();
  const [
    saveOrUnSavePost,
    {
      isLoading: isSaveOrUnSave,
      isError: saveOrUnSaveError,
      error: saveOrUnSaveMessage,
    },
  ] = useSaveOrUnSavePostMutation();
  const [code, setCode] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const latestDataRef = useRef<Post[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { data, isFetching } = useGetFacultyPostQuery(
    {
      faculty: code,
      id: userLogin?.id ?? 0,
    },
    {
      pollingInterval:
        isFocused && userLogin?.roleCodes !== Variable.TYPE_POST_BUSINESS
          ? 2000
          : 86400000,
    },
  );

  useEffect(() => {
    if (data) {
      setLoading(true);
      latestDataRef.current = data.data || [];
      setPosts(latestDataRef.current);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    stompClient = getStompClient();
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/group/${code}`, onMessageReceived);
      stompClient.send(`/app/posts/group/${code}/listen/${userLogin?.id}`);
    };
    const onMessageReceived = (payload: any) => {
      setPosts(JSON.parse(payload.body));
    };

    const onError = (err: string | Frame) => {
      console.log(err);
    };
    stompClient.connect({}, onConnected, onError);
  }, []);

  const likeAction = (likeData: LikeAction) => {
    likeData.code = Variable.TYPE_POST_STUDENT;
    stompClient.send(
      `/app/posts/group/${code}/like`,
      {},
      JSON.stringify(likeData),
    );
  };

  const getFacultyByFacultyGroupCode = (group: string): string => {
    let faculty = group.substring(group.indexOf('_') + 1);
    faculty = 'khoa_' + faculty;
    return faculty;
  };

  useEffect(() => {
    if (isStudent(userLogin) || isFaculty(userLogin)) {
      if (isFaculty(userLogin)) {
        setCode(userLogin?.code);
      } else {
        setCode(
          getFacultyByFacultyGroupCode(userLogin?.facultyGroupCode ?? ''),
        );
      }
    } else {
      setCode('');
      setPosts([]);
    }
    console.log('====================================');
    console.log(code);
    console.log('====================================');
  }, [userLogin]);

  const handleSavePost = useCallback(async (id: number) => {
    const dataSaveOrUnSavePost: SavePostRequest = {
      userId: userLogin?.id ?? 0,
      postId: id,
    };
    try {
      const response = await saveOrUnSavePost(dataSaveOrUnSavePost);
    } catch (error) {
      console.log('Fail to save or un save post', error);
    }
  }, []);

  const handleDeletePost = useCallback(async (postId: number) => {
    const DeletePostData: DeletePostRequest = {
      postId: postId,
    };
    try {
      const response = await deletePost(DeletePostData);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }, []);

  const renderItem = useCallback(
    (item: any) => {
      if (GetPostActive(item.active)) {
        return (
          <PostTypeChecker
            id={item.id}
            userId={item.user['id']}
            name={item.user['name']}
            avatar={item.user['image']}
            typeAuthor={item.user['roleCodes']}
            available={null}
            timeCreatePost={item.createdAt}
            content={item.content}
            type={item.type}
            likes={item.likes}
            comments={item.comment}
            commentQty={item.commentQuantity}
            images={Data.image}
            // images={item.images}
            role={item.user['roleCodes']}
            likeAction={likeAction}
            location={item.location ?? null}
            title={item.title ?? null}
            expiration={item.expiration ?? null}
            salary={item.salary ?? null}
            employmentType={item.employmentType ?? null}
            description={item.description ?? null}
            isSave={item.isSave}
            group={code}
            onUnSave={handleSavePost}
            onDelete={handleDeletePost}
            active={item.active}
          />
        );
      } else {
        return null;
      }
    },
    [data],
  );

  const handleSelectFacultyEvent = useCallback((_code: string) => {
    setCode(getFacultyByFacultyGroupCode(_code));
  }, []);

  const viewabilityConfig = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100,
  });

  const onViewableItemsChanged = useRef(({ viewableItems, changed }: any) => {
    if (viewableItems.length === posts.length) {
      setLoading(false);
    }
  });

  return (
    <ContainerComponent isFull={true}>
      {
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {userLogin?.roleCodes === Variable.TYPE_POST_FACULTY && (
            <CreatePostToolbar
              role={userLogin.roleCodes}
              image={''}
              name={userLogin.name}
              screens={FACULTY_DASHBOARD_SCREEN}
            />
          )}
          {userLogin?.roleCodes === Variable.TYPE_POST_BUSINESS && (
            <SelectFacultyToolbar
              onSelectFacultyEvent={handleSelectFacultyEvent}
            />
          )}
          <View
            style={styles.container}>
            {Boolean(code) ? (
              <>
                {Boolean(posts.length) ? (
                  <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    extraData={posts}
                    data={posts}
                    renderItem={({ item }) => renderItem(item)}
                  />
                ) : (
                  <EmptyBanner
                    content={t(
                      'FacultyDashboard.facultyDashboardNotifyNotHavePost',
                    )}
                    icon={require('../../../assets/image/post/Women.png')}
                  />
                )}
              </>
            ) : (
              <EmptyBanner
                content={t(
                  'FacultyDashboard.facultyDashboardNotYetSelectFaculty',
                )}
                icon={require('../../../assets/image/post/Notifications.png')}
              />
            )}
          </View>
        </ScrollView>
      }
    </ContainerComponent>
  );
};

export default FacultyDashboardScreen;
