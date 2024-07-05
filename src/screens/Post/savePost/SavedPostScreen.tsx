import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { FlatList, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Client, Frame } from 'stompjs';
import PostTypeChecker from '../../../components/post/postTypeChecker/PostTypeChecker';
import { SERVER_ADDRESS } from '../../../constants/SystemConstant';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook';
import { getStompClient } from '../../../sockets/getStompClient';
import { LikeAction } from '../../../types/LikeAction';
import { Post } from '../../../types/Post';
import { GetPostActive } from '../../../utils/GetPostActiveUtils';
import ContainerComponent from '../../container/ContainerComponent';
import { useGetSavedPostQuery } from '../../../redux/Service';
import Loading from '../../../components/loading/Loading';
import SkeletonPost from '../../../components/skeleton/post/SkeletonPost';
import EmptyBanner from '../../../components/banners/common/EmptyBanner';

let stompClient: Client;
const SavedPostScreen = () => {
  const t = useTranslation();
  const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer);
  const { data, error, isLoading } = useGetSavedPostQuery({
    uid: userLogin?.id ?? 0,
  });
  const [posts, setPosts] = useState<Post[] | []>(data?.data ?? []);

  useEffect(() => {
    stompClient = getStompClient();
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/save`, onMessageReceived);
    };
    const onMessageReceived = (payload: any) => {
      setPosts(JSON.parse(payload.body));
    };
    const onError = (err: string | Frame) => {
      console.log(err);
    };
    stompClient.connect({}, onConnected, onError);
  }, []);

  const likeAction = (obj: LikeAction) => {
    like(obj);
  };

  const like = useCallback(async (likeData: LikeAction) => {
    stompClient.send(`/app/posts/save/user/like`, {}, JSON.stringify(likeData));
  }, []);

  const handleUnSave = (post_id: number) => {
    stompClient.send(
      `/app/posts/save/user/unsave`,
      {},
      JSON.stringify({
        postId: post_id,
        userId: userLogin?.id,
      }),
    );
  };

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}api/posts/user/save/${userLogin?.id}`)
      .then(response => {
        setPosts(response.data.data);
      });
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
            active={item.active}
            onDelete={() => { }}
          />
        );
      } else {
        return null;
      }
    },
    [data],
  );

  return (
    <ContainerComponent
      isScrollEnable={false}
      backgroundColor={Colors.WHITE}
      isFullHeight={true}
      isFullWidth={true}
      isCenter={posts.length ? false : true}
    >
      {isLoading ? (
        <SkeletonPost />
      ) : (
        <>
          {
            posts ?
              <FlatList
                data={posts}
                extraData={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => renderItem(item)}
              />
              :
              <EmptyBanner
                content={t(
                  'FacultyDashboard.facultyDashboardNotifyNotHavePost',
                )}
                icon={require('../../../assets/image/post/Women.png')}
              />
          }
        </>
      )
      }
    </ContainerComponent>
  );
};
export default SavedPostScreen;
