import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import ButtonFullWith from '../../../components/buttons/ButtonFullWith';
import { QuestionUpdate } from '../../../components/survey/addQuestionChoice/AddQuestionChoice';
import AddQuestionModal from '../../../components/survey/addQuestionModal/AddQuestionModal';
import ChooseQuestionBar, { QuestionType } from '../../../components/survey/chooseQuestionBar/ChooseQuestionBar';
import MultiChoiceQuestion from '../../../components/survey/multiChoiceQuestion/MultiChoiceQuestion';
import OneChoiceQuestion from '../../../components/survey/oneChoiceQuestion/OneChoiceQuestion';
import ShortAnswerQuestion from '../../../components/survey/shortAnswerQuestion/ShortAnswerQuestion';
import { Colors } from '../../../constants/Colors';
import { REVIEW_SURVEY_POST_SCREEN } from '../../../constants/Screen';
import { Variable } from '../../../constants/Variables';
import { useAppDispatch, useAppSelector } from '../../../redux/Hook';
import { addQuestion } from '../../../redux/Slice';
import ContainerComponent from '../../container/ContainerComponent';
import styles from './AddQuestionScreen.style';

const AddQuestionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [questionUpdate, setQuestionUpdate] = useState<QuestionUpdate | null>(null);
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const onBtnBackPress = useCallback(() => {
    navigation.goBack();
  }, [])

  const onBtnNextPress = useCallback(() => {
    if (surveyPostRequest?.questions.length === 0) {
      Alert.alert(t('AddQuestionScreen.textEmptyQuestionErrorTitle'), t('AddQuestionScreen.textEmptyQuestionErrorContent'))
      return;
    }
    navigation.navigate(REVIEW_SURVEY_POST_SCREEN);
  }, [surveyPostRequest?.questions]);

  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);

  const onUpdateQuestion = (questionIndex: number) => {
    if (surveyPostRequest) {
      setQuestionUpdate({
        index: questionIndex,
        data: surveyPostRequest.questions[questionIndex]
      })
    }
  }


  return (
    <ContainerComponent isFull={true} backgroundColor={Colors.WHITE}>
      <ChooseQuestionBar
        onQuestionTypeDropdownChange={(questionType) => {
          setSelectedType(questionType)
        }}
      />
      <ScrollView
        style={styles.body}
      >
        {
          surveyPostRequest?.questions.map((item, index) => {
            if (item.type === Variable.MULTI_CHOICE_QUESTION) {
              return <MultiChoiceQuestion
                mode={[Variable.EDIT_MODE]}
                data={item}
                index={index}
                onUpdateQuestion={(questionIndex) => onUpdateQuestion(questionIndex)}
              />
            } else if (item.type === Variable.ONE_CHOICE_QUESTION) {
              return <OneChoiceQuestion
                mode={[Variable.EDIT_MODE]}
                data={item}
                index={index}
                onUpdateQuestion={(questionIndex) => onUpdateQuestion(questionIndex)}
              />
            } else {
              return <ShortAnswerQuestion
                mode={[Variable.EDIT_MODE]}
                data={item}
                index={index}
                onUpdateQuestion={(questionIndex) => onUpdateQuestion(questionIndex)}
              />
            }
          })
        }
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ButtonFullWith
            textColor='#000'
            btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
            onPress={onBtnBackPress}
            iconName='arrow-left-thin'
            title={t('AddQuestionScreen.textButtonGoBack')}
          />
          <ButtonFullWith
            btnStyle={{ marginLeft: 10, width: 140 }}
            onPress={onBtnNextPress}
            iconName='arrow-right-thin'
            contentStyle={{ flexDirection: 'row-reverse' }}
            title={t('AddQuestionScreen.textButtonGoNext')}
          />
        </View>
      </ScrollView>
      <AddQuestionModal
        questionUpdate={questionUpdate}
        type={selectedType}
        onDismiss={() => {
          if (questionUpdate) {
            setQuestionUpdate(null)
          }
          setSelectedType(null)
        }}
        onCompleteSaveQuestion={(question) => {
          dispatch(addQuestion(question))
        }}
      />
    </ContainerComponent>
  );
};
export default AddQuestionScreen;
