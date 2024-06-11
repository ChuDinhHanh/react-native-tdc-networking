import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView} from 'react-native';
import {Client, Frame} from 'stompjs';
import PostTypeChecker from '../../../components/post/postTypeChecker/PostTypeChecker';
import SkeletonPost from '../../../components/skeleton/post/SkeletonPost';
import {Variable} from '../../../constants/Variables';
import {Data} from '../../../data/Data';
import {useAppSelector} from '../../../redux/Hook';
import {
  useDeletePostMutation,
  useGetBusinessPostQuery,
  useSaveOrUnSavePostMutation,
} from '../../../redux/Service';
import {LikeAction} from '../../../types/LikeAction';
import {GetPostActive} from '../../../utils/GetPostActive';
import {Post} from '../../../types/Post';
import axios from 'axios';
import Path from '../../../constants/Path';
import {SavePostRequest} from '../../../types/request/SavePostRequest';
import {shallowEqual} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import ContainerComponent from '../../container/ContainerComponent';
import {Colors} from '../../../constants/Colors';
import {Text} from 'react-native';
import SessionComponent from '../../../components/session/SessionComponent';
import {getStompClient} from '../../../sockets/getStompClient';
import {SERVER_ADDRESS} from '../../../constants/SystemConstant';
import {DeletePostRequest} from '../../../types/request/DeletePostRequest';
import CreatePostToolbar from '../../../components/toolbars/post/CreatePostToolbar';

let stompClient: Client;
const BusinessDashboardScreen = () => {
  console.log('===============BusinessDashboardScreen=====================');
  const isFocused = useIsFocused();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
    shallowEqual,
  );
  const [
    deletePost,
    {isLoading: isDelete, isError: deleteError, error: deleteErrorMessage},
  ] = useDeletePostMutation();
  const [
    saveOrUnSavePost,
    {
      isLoading: isSaveOrUnSave,
      isError: saveOrUnSaveError,
      error: saveOrUnSaveMessage,
    },
  ] = useSaveOrUnSavePostMutation();
  const [posts, setPosts] = useState<Post[]>([]);
  const latestDataRef = useRef<Post[]>([]);
  const code = Variable.GROUP_BUSINESS;
  const {data, isFetching} = useGetBusinessPostQuery(
    {
      id: userLogin?.id ?? 0,
    },
    {
      pollingInterval: isFocused ? 2000 : 86400000,
    },
  );

  useEffect(() => {
    if (data) {
      latestDataRef.current = data.data || [];
      setPosts(latestDataRef.current);
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
    likeData.code = Variable.TYPE_POST_BUSINESS;
    stompClient.send(
      `/app/posts/group/${code}/like`,
      {},
      JSON.stringify(likeData),
    );
  };

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
      return GetPostActive(item.active) ? (
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
      ) : null;
    },
    [posts],
  );

  return (
    <ContainerComponent backgroundColor={Colors.COLOR_GREY_FEEBLE}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {isFetching ? (
          <SkeletonPost />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            extraData={data?.data}
            data={data?.data}
            renderItem={({ item }) => renderItem(item)}
          />
        )} */}
        {userLogin?.roleCodes === Variable.TYPE_POST_BUSINESS && (
          <CreatePostToolbar
            role={userLogin.roleCodes}
            image={''}
            name={userLogin.name}
          />
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          extraData={posts}
          data={posts}
          renderItem={({item}) => renderItem(item)}
        />
      </ScrollView>
    </ContainerComponent>
  );
};

export default BusinessDashboardScreen;
