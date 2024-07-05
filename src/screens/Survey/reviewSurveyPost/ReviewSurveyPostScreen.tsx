import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PEDDING_POST_TAB, TOP_TAB_NAVIGATOR } from '../../../constants/Screen';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook';
import { useAddSurveyPostMutation, useUpdateSurveyPostMutation } from '../../../redux/Service';
import { setSurveyPostRequest, setSurveyPostUpdated } from '../../../redux/Slice';
import { Variable } from '../../../constants/Variables';
import MultiChoiceQuestion from '../../../components/survey/multiChoiceQuestion/MultiChoiceQuestion';
import OneChoiceQuestion from '../../../components/survey/oneChoiceQuestion/OneChoiceQuestion';
import ShortAnswerQuestion from '../../../components/survey/shortAnswerQuestion/ShortAnswerQuestion';
import ButtonFullWith from '../../../components/buttons/ButtonFullWith';
import styles from './ReviewSurveyPostScreen.style';

const ReviewSurveyPostScreen = () => {
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [addSurvey, addSurveyResult] = useAddSurveyPostMutation();
  const [updateSurvey, updateSurveyResult] = useUpdateSurveyPostMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addSurveyResult.data) {
      if (addSurveyResult.data.status === 200 || 201) {
        Alert.alert(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveSuccessTitle'), t('ReviewSurveyPostScreen.reviewSurveyScreenSaveSuccessContent'));
        navigation.navigate(TOP_TAB_NAVIGATOR);
      } else {
        Alert.alert(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailTitle'), t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailContent'));
      }
      dispatch(setSurveyPostRequest(null));
    }
  }, [addSurveyResult]);

  useEffect(() => {
    if (updateSurveyResult.data) {
      if (updateSurveyResult.data.status === 200 || 201) {
        dispatch(setSurveyPostUpdated(surveyPostRequest));
        Alert.alert(t('ReviewSurveyPostScreen.reviewSurveyScreenUpdateSuccessTitle'), t('ReviewSurveyPostScreen.reviewSurveyScreenUpdateSuccessContent'));
        navigation.navigate(PEDDING_POST_TAB);
      } else {
        Alert.alert(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailTitle'), t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailContent'));
      }
      dispatch(setSurveyPostRequest(null))
    }
  }, [updateSurveyResult]);

  const onBtnPublishPostPress = () => {
    if (surveyPostRequest) {
      if (surveyPostRequest.postId) {
        updateSurvey(surveyPostRequest);
      } else {
        addSurvey(surveyPostRequest);
      }
    }
  }

  const onBtnBackPress = useCallback(() => {
    navigation.pop();
  }, [])

  return (
    <ScrollView>
      <Text
        style={styles.surveyTitle}
      >
        {surveyPostRequest?.title}
      </Text>
      <Text
        style={styles.surveyDesc}
      >
        {surveyPostRequest?.description}
      </Text>
      <Text style={styles.textTitle}>
        {t('ReviewSurveyPostScreen.reviewSurveyScreenAnswerTitle')}
      </Text>
      <View style={styles.questionWrapper}>
        {surveyPostRequest?.questions.map((item, index) => {
          if (item.type === Variable.MULTI_CHOICE_QUESTION) {
            return <MultiChoiceQuestion
              key={index}
              mode={[Variable.REVIEW_MODE]}
              data={item}
              index={index}
              isDisableDeleteBtn />
          } else if (item.type === Variable.ONE_CHOICE_QUESTION) {
            return <OneChoiceQuestion
              key={index}
              mode={[Variable.REVIEW_MODE]}
              data={item}
              index={index}
              isDisableDeleteBtn />
          } else {
            return <ShortAnswerQuestion
              key={index}
              mode={[Variable.REVIEW_MODE]}
              data={item}
              index={index}
              isDisableDeleteBtn />
          }
        })}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <ButtonFullWith
          textColor='#000'
          btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
          onPress={onBtnBackPress}
          iconName='arrow-left-thin'
          title={t('ReviewSurveyPostScreen.reviewSurveyScreenButtonGoBack')}
        />
        <ButtonFullWith
          disable={updateSurveyResult.isLoading || addSurveyResult.isLoading}
          loading={updateSurveyResult.isLoading || addSurveyResult.isLoading}
          btnStyle={{ marginLeft: 10, width: 140 }}
          onPress={onBtnPublishPostPress}
          iconName='plus'
          title={t('ReviewSurveyPostScreen.reviewSurveyScreenButtonComplete')}
        />
      </View>
    </ScrollView>
  );
};

export default ReviewSurveyPostScreen;
