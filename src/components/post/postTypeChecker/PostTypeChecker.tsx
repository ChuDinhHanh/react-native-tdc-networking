import React, {useCallback, useMemo, useState} from 'react';
import {Variable} from '../../../constants/Variables';
import {Post} from '../../../types/Post';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {View} from 'react-native';
import {RootStackParamList} from '../../../App';
import {
  PROFILE_SCREEN,
  RECRUITMENT_DETAIL_SCREEN,
  SURVEY_CONDUCT_SCREEN,
} from '../../../constants/Screen';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {useAppDispatch, useAppSelector} from '../../../redux/Hook';
import {setShowBottomSheet} from '../../../redux/Slice';
import {Like} from '../../../types/Like';
import {LikeAction} from '../../../types/LikeAction';
import {ModalComments} from '../../../types/ModalComments ';
import {numberDayPassed} from '../../../utils/FormatTime';
import Bottom from '../session/bottom/Bottom';
import Content from '../session/content/Content';
import Header from '../session/header/Header';
import DisplayImage from '../session/image/normalImage/DisplayImage';
import styles from './PostTypeChecker.style';
import Recruitment from '../session/recruitment/Recruitment';
import Survey from '../session/survey/Survey';

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

  const handleClickBtnRecruitmentDetailEvent = useCallback((idPost: number) => {
    navigation.navigate(RECRUITMENT_DETAIL_SCREEN, {postId: idPost});
  }, []);

  const handleClickBtnSurveyDetailEvent = (idPost: number) => {
    navigation.navigate(SURVEY_CONDUCT_SCREEN, {surveyPostId: idPost});
  };

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
      return (
        <View style={styles.container}>
          <Header
            t={t}
            userId={userId}
            name={name}
            avatar={avatar}
            available={available}
            timeCreatePost={numberDayPassed(timeCreatePost)}
            typeAuthor={t('RecruitmentPost.recruitmentPostType')}
            type={type}
            role={role}
            onClickMenuOption={handleClickMenuOption}
            onClickIntoAvatarAndNameAndMenuEvent={
              handleClickIntoAvatarAndNameAndMenuEvent
            }
            isSave={isSave}
            active={active}
          />
          <Recruitment
            id={id}
            location={location ?? ''}
            title={title ?? ''}
            salary={salary ?? ''}
            employmentType={employmentType ?? ''}
            onClickBtnSeeDetailEvent={handleClickBtnRecruitmentDetailEvent}
            createdAt={timeCreatePost}
            current={t('RecruitmentPost.recruitmentPostCurrency')}
            textButton={t('RecruitmentPost.recruitmentPostButtonSeeDetail')}
          />
          <Bottom
            isLike={handleCheckLiked}
            likes={likes}
            onClickBottomBtnEvent={handleClickBottomBtnEvent}
            commentQty={commentQty}
            textLikeBy={t('Post.normalPostLikeBy')}
          />
        </View>
      );
    case Variable.TYPE_SURVEY_POST:
      return (
        <View style={styles.container}>
          <Header
            t={t}
            userId={userId}
            name={name}
            avatar={avatar}
            available={available}
            timeCreatePost={numberDayPassed(timeCreatePost)}
            typeAuthor={t('SurveyPost.surveyPostType')}
            type={type}
            role={role}
            onClickMenuOption={handleClickMenuOption}
            onClickIntoAvatarAndNameAndMenuEvent={
              handleClickIntoAvatarAndNameAndMenuEvent
            }
            isSave={isSave}
            active={active}
          />
          <Survey
            t={t}
            id={id}
            title={title ?? ''}
            active={active}
            onClickBtnSeeDetailEvent={handleClickBtnSurveyDetailEvent}
            description={description ?? ''}
            textButton={t('SurveyPost.surveyPostButton')}
            textSeeDetailSurvey={t('SurveyPost.surveyPostButtonDetailQuestion')}
            textJoinSurvey={t('SurveyPost.surveyPostButtonJoinSurvey')}
          />
          <Bottom
            isLike={handleCheckLiked}
            likes={likes}
            onClickBottomBtnEvent={handleClickBottomBtnEvent}
            commentQty={commentQty}
            textLikeBy={t('Post.normalPostLikeBy')}
          />
        </View>
      );
    default:
      return null;
  }
};

export default PostTypeChecker;
