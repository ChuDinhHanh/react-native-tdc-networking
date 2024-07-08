import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Client, Frame } from 'stompjs';
import { RootStackParamList } from '../../../../App';
import PostTypeChecker from '../../../../components/post/postTypeChecker/PostTypeChecker';
import TextComponent from '../../../../components/text/TextComponent';
import { Variable } from '../../../../constants/Variables';
import { useAppSelector } from '../../../../redux/Hook';
import { getStompClient } from '../../../../sockets/getStompClient';
import { LikeAction } from '../../../../types/LikeAction';
import ContainerComponent from '../../../container/ContainerComponent';
import styles from './DetailPost.style';

let stompClient: Client
const DetailPost = () => {
  const t = useTranslation();
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const route = useRoute<RouteProp<RootStackParamList, 'DETAIL_POST_SCREEN'>>();
  const post = route.params?.post ?? null;
  const notificationType = route.params?.notificationType ?? '';
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);

  const likeDataToCallRefreshAction: LikeAction = {
    code: '',
    postId: post.id,
    userId: userLogin?.id ?? 0,
  }

  const likeAction = (likeData: LikeAction) => {
    stompClient.send(`/app/posts/${post.id}/detail/like`, {}, JSON.stringify(likeData));
  };

  const handleUnSave = (idPost: number) => {
    stompClient.send(`/app/posts/${post.id}/detail/unsave`, {}, JSON.stringify({
      userId: userLogin?.id,
      postId: idPost
    }))
  }

  useEffect(() => {
    stompClient = getStompClient();
    const onConnected = () => {
      if (notificationType != Variable.POST_LOG) {
        if (stompClient.connected) {
          stompClient.subscribe(`/topic/posts/${post.id}/detail`, onMessageReceived)
        }
      }
    }
    const onMessageReceived = (payload: any) => {
      setData(JSON.parse(payload.body))
    }
    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    likeAction(likeDataToCallRefreshAction);
    likeAction(likeDataToCallRefreshAction);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const printfPost = useMemo(() => {
    if (!data) {
      if (post) {
        if (notificationType == Variable.POST_LOG) {
          return (
            <View style={styles.post}>
              <TextComponent
                style={styles.txt}
                text={`${t("DetailPost.detailPostWasNotApproved")}${post.content}`}
              />
            </View>
          )
        }
        return (
          <View style={styles.post}>
            <PostTypeChecker
              id={post.id}
              userId={post.user.id}
              name={post.user.name}
              avatar={post.user.image}
              typeAuthor={post.user['roleCodes']}
              available={null}
              timeCreatePost={post.createdAt}
              content={post.content}
              type={post.type}
              likes={post.likes}
              comments={post.comment}
              commentQty={post.commentQuantity}
              images={post.images}
              role={post.user.roleCodes}
              likeAction={likeAction}
              location={post.location ?? null}
              title={post.title ?? null}
              expiration={post.expiration ?? null}
              salary={post.salary ?? null}
              employmentType={post.employmentType ?? null}
              description={post.description ?? null}
              isSave={post.isSave}
              group={''}
              onUnSave={handleUnSave}
              onDelete={() => { }}
              active={0} />
          </View>
        )
      } else {
        return (
          <View style={styles.post}>
            <TextComponent text={t("DetailPost.detailPostWasNotExist")} />
          </View>
        )
      }
    } else {
      if (data) {
        return (
          <View style={styles.post}>
            <PostTypeChecker
              id={data.id}
              userId={data.user.id}
              name={data.user.name}
              avatar={data.user.image}
              typeAuthor={data.user['roleCodes']}
              available={null}
              timeCreatePost={data.createdAt}
              content={data.content}
              type={data.type}
              likes={data.likes}
              comments={data.comment}
              commentQty={data.commentQuantity}
              images={data.images}
              role={data.user.roleCodes}
              likeAction={likeAction}
              location={data.location ?? null}
              title={data.title ?? null}
              expiration={data.expiration ?? null}
              salary={data.salary ?? null}
              employmentType={data.employmentType ?? null}
              description={data.description ?? null}
              isSave={data.isSave}
              group={''}
              onUnSave={handleUnSave}
              onDelete={() => { }}
              active={0} />
          </View>
        )
      } else {
        return <></>
      }
    }
  }, [post, data]);

  return <ContainerComponent
    isFull={true}
  >
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {
        printfPost
      }
    </ScrollView>
  </ContainerComponent>

};

export default DetailPost;
