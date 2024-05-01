import React, {useCallback} from 'react';
import {FlatList, SafeAreaView, ScrollView} from 'react-native';
import {Client} from 'stompjs';
import PostTypeChecker from '../../../components/post/postTypeChecker/PostTypeChecker';
import SkeletonPost from '../../../components/skeleton/post/SkeletonPost';
import {Variable} from '../../../constants/Variables';
import {Data} from '../../../data/Data';
import {useAppSelector} from '../../../redux/Hook';
import {useGetBusinessPostQuery} from '../../../redux/Service';
import {LikeAction} from '../../../types/LikeAction';
import {GetPostActive} from '../../../utils/GetPostActive';

let stompClient: Client;
const BusinessDashboardScreen = () => {
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);
  const code = Variable.GROUP_BUSINESS;
  const {data, isFetching} = useGetBusinessPostQuery(
    {
      id: userLogin?.id ?? 0,
    },
    {
      // pollingInterval: 1000
    },
  );

  const likeAction = (likeData: LikeAction) => {
    likeData.code = Variable.TYPE_POST_BUSINESS;
    console.log('====================================');
    console.log(code, JSON.stringify(likeData));
    console.log('====================================');
  };

  const handleSavePost = async (id: number) => {};

  const handleDeletePost = async (id: number) => {};

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
            handleUnSave={handleSavePost}
            handleDelete={handleDeletePost}
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
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isFetching ? (
          <SkeletonPost />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            extraData={data?.data}
            data={data?.data}
            renderItem={({item}) => renderItem(item)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessDashboardScreen;
