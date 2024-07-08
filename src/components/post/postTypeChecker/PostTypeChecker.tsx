import React, { memo, useCallback, useMemo, useState } from 'react';
import { Variable } from '../../../constants/Variables';
import { Post } from '../../../types/Post';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import { View } from 'react-native';
import { shallowEqual } from 'react-redux';
import { RootStackParamList } from '../../../App';
import {
  CREATE_NORMAL_POST_SCREEN,
  LIST_JOB_APPLY_SCREEN,
  MY_PROFILE_SCREEN,
  PROFILE_SCREEN,
  RECRUITMENT_DETAIL_SCREEN,
  SURVEY_CONDUCT_SCREEN,
  SURVEY_RESULT_SCREEN,
} from '../../../constants/Screen';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook';
import {
  setNavigateToProfileSameUser,
  setShowBottomSheet,
  setShowModalLike,
} from '../../../redux/Slice';
import { Like } from '../../../types/Like';
import { LikeAction } from '../../../types/LikeAction';
import { ModalComments } from '../../../types/ModalComments ';
import { UpdateNormalPost } from '../../../types/UpdateNormalPost';
import { numberDayPassed } from '../../../utils/FormatTimeUtils';
import Bottom from '../session/bottom/Bottom';
import Content from '../session/content/Content';
import Header from '../session/header/Header';
import DisplayImage from '../session/image/normalImage/DisplayImage';
import Recruitment from '../session/recruitment/Recruitment';
import Survey from '../session/survey/Survey';
import styles from './PostTypeChecker.style';
setTranslations({ vi, jp, en });
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
    onDelete,
    onUnSave,
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

  const navigationTopTab =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useAppDispatch();

  const t = useTranslation();

  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
    shallowEqual,
  );

  const userIdOfProfileScreen = useAppSelector(
    state => state.TDCSocialNetworkReducer.userIdOfProfileScreen,
    shallowEqual,
  );

  const [likeData, setLikeData] = useState<LikeAction>({
    code: '',
    postId: id,
    userId: userLogin?.id ?? 0,
  });

  const handleSeeListCvPost = () => {
    navigation.navigate(LIST_JOB_APPLY_SCREEN, { postId: id });
  };

  const handleSeeResultSurveyPost = () => {
    navigation.navigate(SURVEY_RESULT_SCREEN, { surveyPostId: id });
  };

  const handleUpdateNormalPostEvent = () => {
    const updateNormalPost: UpdateNormalPost = {
      postId: props.id,
      content: props.content,
      images: props.images,
    };
    navigation.navigate(CREATE_NORMAL_POST_SCREEN, {
      updateNormalPost
    });
  };

  const handleClickMenuOption = useCallback((flag: number) => {
    switch (flag) {
      case Variable.CLICK_SAVE_POST_EVENT:
        onUnSave(id);
        break;
      case Variable.CLICK_DELETE_POST_EVENT:
        onDelete(id);
        break;
      case Variable.CLICK_UN_SAVE_POST:
        onUnSave(id);
        break;
      case Variable.CLICK_SEE_LIST_CV_POST_EVENT:
        handleSeeListCvPost();
        break;
      case Variable.CLICK_SEE_RESULT_POST_EVENT:
        handleSeeResultSurveyPost();
        break;
      case Variable.CLICK_UPDATE_POST:
        if (type.includes(Variable.TYPE_NORMAL_POST)) {
          handleUpdateNormalPostEvent();
        }
        break;
      default:
        return null;
    }
  }, []);

  const handleClickIntoAvatarAndNameAndMenuEvent = useCallback(
    (flag: number | null) => {
      if (flag === Variable.GO_TO_PROFILE_ACTIONS) {
        if (userIdOfProfileScreen !== userId) {
          if (userId !== userLogin?.id) {
            navigation.navigate(PROFILE_SCREEN, { userId: userId, group: group });
          } else {
            navigationTopTab.navigate(MY_PROFILE_SCREEN);
          }
        } else {
          dispatch(setNavigateToProfileSameUser(userId));
        }
      }
    },
    [],
  );

  const handleClickIntoAnyImageEvent = (
    imageId: number,
    listImageError: number[],
  ) => { };

  const handleCheckLiked = useMemo(() => {
    let result = false;
    likes.some((item: Like) => {
      if (item.id === userLogin?.id) {
        result = true;
      }
    });
    return result;
  }, [likes, userLogin?.id]);

  const handleClickBottomBtnEvent = useCallback(
    (flag: number | null) => {
      if (flag === Variable.LIKE_ACTION) {
        handleClickIntoBtnIconLikeEvent();
      } else if (flag === Variable.COMMENT_ACTION) {
        handleClickIntoBtnIconComments();
      } else {
        handleClickIntoListUserReactions();
      }
    },
    [commentQty, comments, likes],
  );

  const handleClickIntoBtnIconLikeEvent = () => {
    likeAction(likeData);
  };

  const handleClickIntoBtnIconComments = () => {
    const newComment: ModalComments = {
      id: id,
      userCreatedPostId: userId,
      group: group,
      comments: comments,
    };
    dispatch(setShowBottomSheet(newComment));
  };

  const handleClickIntoListUserReactions = () => {
    dispatch(
      setShowModalLike({
        group: group,
        likes: likes,
      }),
    );
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
    navigation.navigate(RECRUITMENT_DETAIL_SCREEN, { postId: idPost });
  }, []);

  const handleClickBtnSurveyDetailEvent = (idPost: number) => {
    navigation.navigate(SURVEY_CONDUCT_SCREEN, { surveyPostId: idPost });
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

export default memo(PostTypeChecker);
