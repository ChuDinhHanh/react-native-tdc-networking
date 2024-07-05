import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { RootStackParamList } from '../../../../App'
import ButtonFullWith from '../../../../components/buttons/ButtonFullWith'
import TextInputWithTitle from '../../../../components/input/textInputWithTitle/TextInputWithTitle'
import SessionComponent from '../../../../components/session/SessionComponent'
import TextValidate from '../../../../components/validation/TextValidate'
import { ADD_QUESTION_SCREEN } from '../../../../constants/Screen'
import { useAppDispatch, useAppSelector } from '../../../../redux/Hook'
import { setSurveyPostRequest, updateSurveyDescription, updateSurveyTitle } from '../../../../redux/Slice'
import { SurveyPostRequest } from '../../../../types/request/SurveyPostRequest'
import { ErrorMessage, isExistFieldInvalid, validateField } from '../../../../utils/ValidateHelper'
import { InputTextValidate } from '../../../../utils/ValidateUtils'
import ContainerComponent from '../../../container/ContainerComponent'
import styles from './CreateSurveyPostScreen.style'

interface CreateSurveyPostScreenValidate {
  title: InputTextValidate
  description: InputTextValidate
}

interface CreateSurveyPostErrorMessage {
  title: ErrorMessage,
  description: ErrorMessage
}

const error: CreateSurveyPostErrorMessage = {
  title: {
    blank: 'CreateSurveyPostScreen.surveySaveTitleEmptyValidate'
  },
  description: {
    blank: 'CreateSurveyPostScreen.surveySaveDescEmptyValidate'
  }
}

const CreateSurveyPostScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'CREATE_SURVEY_SCREEN'>>();

  const defaultSurveyPost: SurveyPostRequest = {
    type: 'khao-sat',
    title: '',
    description: '',
    userId: userLogin?.id ?? -1,
    questions: [],
    groupId: params?.groupId
  }

  const [validate, setValidate] = useState<CreateSurveyPostScreenValidate>({
    title: {
      textError: '',
      isVisible: false,
      isError: false
    },
    description: {
      textError: '',
      isVisible: false,
      isError: false
    }
  })

  useEffect(() => {
    if (surveyPostRequest) {
      dispatch(setSurveyPostRequest(surveyPostRequest));
    } else {
      dispatch(setSurveyPostRequest(defaultSurveyPost));
    }
  }, []);

  const onTitleChangeText = useCallback((value: string) => {
    validateField(error['title'], validate['title'], value);
    setValidate({ ...validate });
    dispatch(updateSurveyTitle(value));
  }, [surveyPostRequest, validate]);

  const onDescriptionChangeText = useCallback((value: string) => {
    validateField(error['description'], validate['description'], value);
    setValidate({ ...validate });
    dispatch(updateSurveyDescription(value));
  }, []);

  const onBtnNextPress = () => {
    if (!surveyPostRequest) return;
    if (isExistFieldInvalid<SurveyPostRequest, CreateSurveyPostScreenValidate, CreateSurveyPostErrorMessage>(surveyPostRequest, validate, error)) {
      setValidate({ ...validate });
    } else {
      navigation.navigate(ADD_QUESTION_SCREEN);
    }
  }

  return (
    <ContainerComponent
      isFull={true}
    >
      <SessionComponent>
        <TextInputWithTitle
          defaultValue={surveyPostRequest?.title}
          onChangeText={(value) => onTitleChangeText(value)}
          title={t('CreateSurveyPostScreen.surveySaveTitleTitle')}
          placeholder={t('CreateSurveyPostScreen.surveySaveTitlePlaceholder')}
        />
        <TextValidate
          customStyle={{
            marginLeft: 10
          }}
          textError={t(validate.title.textError)}
          isError={validate.title.isError!}
          isVisible={validate.title.isVisible}
        />
        <TextInputWithTitle
          defaultValue={surveyPostRequest?.description}
          onChangeText={(value) => onDescriptionChangeText(value)}
          title={t('CreateSurveyPostScreen.surveySaveDescTitle')}
          placeholder={t('CreateSurveyPostScreen.surveySaveDescPlaceholder')}
          multiline={true}
          numberOfLine={7}
          textInputStyle={styles.textInputStyle}
        />
        <TextValidate
          customStyle={{
            marginLeft: 10
          }}
          textError={t(validate.description.textError)}
          isError={validate.description.isError!}
          isVisible={validate.description.isVisible}
        />
        <ButtonFullWith
          iconName='arrow-right-thin'
          btnStyle={styles.customBtnStyle}
          contentStyle={{ flexDirection: "row-reverse" }}
          title={t('CreateSurveyPostScreen.surveySaveButtonGoNext')}
          onPress={onBtnNextPress}
        />
      </SessionComponent>
    </ContainerComponent >
  )
}
export default CreateSurveyPostScreen