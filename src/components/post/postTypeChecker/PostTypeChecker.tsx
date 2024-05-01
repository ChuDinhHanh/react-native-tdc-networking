import React, {useCallback, useMemo, useState} from 'react';
import {Variable} from '../../../constants/Variables';
import {Post} from '../../../types/Post';

import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants/Colors';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {numberDayPassed} from '../../../utils/FormatTime';
import Bottom from '../session/bottom/Bottom';
import Content from '../session/content/Content';
import Header from '../session/header/Header';
import DisplayImage from '../session/image/normalImage/DisplayImage';
import {Like} from '../../../types/Like';
import {useAppDispatch, useAppSelector} from '../../../redux/Hook';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {PROFILE_SCREEN} from '../../../constants/Screen';
import {LikeAction} from '../../../types/LikeAction';
import {setShowBottomSheet} from '../../../redux/Slice';
import {ModalComments} from '../../../types/ModalComments ';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

const PostTypeChecker = (props: Post) => {
  const {
    active,
    available,
    avatar,
    commentQty,
    comments,
    content,
    description,
    employmentType,
    expiration,
    group,
    handleDelete,
    handleUnSave,
    id,
    images,
    isSave,
    likeAction,
    likes,
    location,
    name,
    role,
    salary,
    timeCreatePost,
    title,
    type,
    typeAuthor,
    userId,
  } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const t = useTranslation();

  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);

  const [likeData, setLikeData] = useState<LikeAction>({
    code: '',
    postId: id,
    userId: userLogin?.id ?? 0,
  });

  const [commentData, setCommentData] = useState<ModalComments>({
    id: id,
    userCreatedPostId: userId,
    group: group,
    commentFather: [],
  });

  const handleClickMenuOption = useCallback((flag: number) => {}, []);

  const handleClickIntoAvatarAndNameAndMenuEvent = useCallback(
    (flag: number | null) => {
      if (flag === Variable.GO_TO_PROFILE_ACTIONS) {
        navigation.navigate(PROFILE_SCREEN);
      }
    },
    [],
  );

  const handleClickIntoAnyImageEvent = (
    imageId: number,
    listImageError: number[],
  ) => {};

  const handleCheckLiked = useMemo(() => {
    let result = false;
    likes.some((item: Like) => {
      if (item.id === userLogin?.id) {
        result = true;
      }
    });
    return result;
  }, [likes, userLogin?.id]);

  const handleClickBottomBtnEvent = useCallback((flag: number | null) => {
    if (flag === Variable.LIKE_ACTION) {
      handleClickIntoBtnIconLikeEvent();
    } else if (flag === Variable.COMMENT_ACTION) {
      handleClickIntoBtnIconComments();
    } else {
      handleClickIntoListUserReactions();
    }
  }, []);

  const handleClickIntoBtnIconLikeEvent = () => {
    likeAction(likeData);
  };

  const handleClickIntoBtnIconComments = () => {
    dispatch(setShowBottomSheet(commentData));
  };

  const handleClickIntoListUserReactions = () => {
    console.log('open user reaction');
  };

  const identifyTypeAuthor = useMemo(() => {
    if (type == Variable.TYPE_POST_FACULTY) {
      return t('Post.normalPostIdentifyAuthorFaculty');
    } else if (type == Variable.TYPE_POST_BUSINESS) {
      return t('Post.normalPostIdentifyAuthorCompany');
    }
    return null;
  }, [typeAuthor]);

  switch (type) {
    case Variable.TYPE_NORMAL_POST:
      return (
        <View style={styles.container}>
          <Header
            t={t}
            userId={userId}
            name={name}
            avatar={avatar}
            available={available}
            timeCreatePost={numberDayPassed(timeCreatePost)}
            typeAuthor={identifyTypeAuthor}
            type={type}
            role={role}
            onClickMenuOption={handleClickMenuOption}
            onClickIntoAvatarAndNameAndMenuEvent={
              handleClickIntoAvatarAndNameAndMenuEvent
            }
            isSave={isSave}
            active={active}
          />
          {Boolean(content) && <Content t={t} content={content} />}
          {Boolean(images.length !== 0) && <DisplayImage images={images} />}
          <Bottom
            isLike={handleCheckLiked}
            likes={likes}
            onClickBottomBtnEvent={handleClickBottomBtnEvent}
            commentQty={commentQty}
            textLikeBy={t('Post.normalPostLikeBy')}
          />
        </View>
      );
    case Variable.TYPE_RECRUITMENT_POST:
      return <></>;
    case Variable.TYPE_SURVEY_POST:
      return <></>;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: Colors.COLOR_WHITE,
    marginBottom: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 300,
  },
  bodyWrap: {
    marginVertical: 10,
  },
});

export default PostTypeChecker;
