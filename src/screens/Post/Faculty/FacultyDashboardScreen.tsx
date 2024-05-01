import React, {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import SkeletonPost from '../../../components/skeleton/post/SkeletonPost';
import {useGetFacultyPostQuery} from '../../../redux/Service';
import {useAppSelector} from '../../../redux/Hook';
import {GetPostActive} from '../../../utils/GetPostActive';
import PostTypeChecker from '../../../components/post/postTypeChecker/PostTypeChecker';
import {LikeAction} from '../../../types/LikeAction';
import {Variable} from '../../../constants/Variables';
import {Data} from '../../../data/Data';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';

const FacultyDashboardScreen = () => {
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);
  const [code, setCode] = useState('');
  const {data, isFetching} = useGetFacultyPostQuery(
    {
      faculty: code,
      id: userLogin?.id ?? 0,
    },
    {},
  );

  const handleSavePost = async (id: number) => {};

  const handleDeletePost = async (id: number) => {};

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

export default FacultyDashboardScreen;
