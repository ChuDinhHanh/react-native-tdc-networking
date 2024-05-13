import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import SkeletonPost from '../../../components/skeleton/post/SkeletonPost';
import {
  useDeletePostMutation,
  useGetStudentPostQuery,
  useSaveOrUnSavePostMutation,
} from '../../../redux/Service';
import {useAppSelector} from '../../../redux/Hook';
import {GetPostActive} from '../../../utils/GetPostActive';
import PostTypeChecker from '../../../components/post/postTypeChecker/PostTypeChecker';
import {Variable} from '../../../constants/Variables';
import {LikeAction} from '../../../types/LikeAction';
import {Data} from '../../../data/Data';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SavePostRequest} from '../../../types/request/SavePostRequest';
import {Post} from '../../../types/Post';
import {useIsFocused} from '@react-navigation/native';
import ContainerComponent from '../../container/ContainerComponent';
import {Colors} from '../../../constants/Colors';

const StudentDiscussionDashboardScreen = () => {
  console.log(
    '====================StudentDiscussionDashboardScreen================',
  );
  const isFocused = useIsFocused();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
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
  const code = Variable.GROUP_STUDENT;
  const [posts, setPosts] = useState<Post[]>([]);
  const latestDataRef = useRef<Post[]>([]);
  const {data, isFetching} = useGetStudentPostQuery(
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
    try {
      const response = await deletePost(postId);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }, []);

  const likeAction = (likeData: LikeAction) => {
    likeData.code = Variable.TYPE_POST_BUSINESS;
    console.log('====================================');
    console.log(code, JSON.stringify(likeData));
    console.log('====================================');
  };

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
            likes={Data.Likes}
            // likes={item.likes}
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

export default StudentDiscussionDashboardScreen;
