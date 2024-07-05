import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import TextInputWithTitle from '../../../../components/input/textInputWithTitle/TextInputWithTitle';
import SessionComponent from '../../../../components/session/SessionComponent';
import TextComponent from '../../../../components/text/TextComponent';
import TextValidate from '../../../../components/validation/TextValidate';
import { Variable } from '../../../../constants/Variables';
import { useAppSelector } from '../../../../redux/Hook';
import { useCreateRecruitmentPostMutation } from '../../../../redux/Service';
import { RecruitmentPost } from '../../../../types/RecruitmentPost';
import { formatCurrency } from '../../../../utils/FormatCurrencyUtils';
import { ErrorMessage, isExistFieldInvalid, validateField } from '../../../../utils/ValidateHelper';
import { InputTextValidate } from '../../../../utils/ValidateUtils';
import ContainerComponent from '../../../container/ContainerComponent';
import styles from './CreateRecruitmentScreen.style';

interface CreateRecruitmentPostValidate {
  title: InputTextValidate
  description: InputTextValidate
  benefit: InputTextValidate
  salary: InputTextValidate
  expiration: InputTextValidate
  employmentType: InputTextValidate
  location: InputTextValidate
  requirement: InputTextValidate
}

interface CreateRecruitmentPostError {
  title: ErrorMessage
  description: ErrorMessage
  benefit: ErrorMessage
  salary: ErrorMessage
  expiration: ErrorMessage
  employmentType: ErrorMessage
  location: ErrorMessage
  requirement: ErrorMessage
}

const error: CreateRecruitmentPostError = {
  title: {
    blank: 'RecruitmentScreen.recruitmentTitleEmptyValidate'
  },
  description: {
    blank: 'RecruitmentScreen.recruitmentDescEmptyValidate'
  },
  benefit: {
    blank: 'RecruitmentScreen.recruitmentBenefitEmptyValidate'
  },
  salary: {
    blank: 'RecruitmentScreen.recruitmentSalaryEmptyValidate'
  },
  expiration: {
    blank: 'RecruitmentScreen.recruitmentExpirationValidate'
  },
  employmentType: {
    blank: 'RecruitmentScreen.recruitmentEmploymentTypeEmptyValidate'
  },
  location: {
    blank: 'RecruitmentScreen.recruitmentLocationEmptyValidate'
  },
  requirement: {
    blank: 'RecruitmentScreen.recruitmentRequirementEmptyValidate'
  },
}

const CreateRecruitmentScreen = () => {
  console.log('===============CreateRecruitmentScreen==================');
  const t = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const expirationRef = useRef<TextInput | null>(null);
  const [createRecruitmentPost, createRecruitmentPostResponse] = useCreateRecruitmentPostMutation();
  const [recruitmentModel, setRecruitmentModel] = useState<RecruitmentPost>({
    userId: userLogin?.id ?? -1,
    type: Variable.TYPE_RECRUITMENT_POST,
    title: '',
    salary: NaN,
    benefit: '',
    description: '',
    employmentType: '',
    location: '',
    requirement: '',
    groupId: Variable.BUSINESS_CONNECT_GROUP,
    expiration: '',
  })
  const [validate, setValidate] = useState<CreateRecruitmentPostValidate>({
    title: {
      textError: '',
      isError: true,
      isVisible: false
    },
    description: {
      textError: '',
      isError: true,
      isVisible: false
    },
    benefit: {
      textError: '',
      isError: true,
      isVisible: false
    },
    salary: {
      textError: '',
      isError: true,
      isVisible: false
    },
    expiration: {
      textError: '',
      isError: true,
      isVisible: false
    },
    employmentType: {
      textError: '',
      isError: true,
      isVisible: false
    },
    location: {
      textError: '',
      isError: true,
      isVisible: false
    },
    requirement: {
      textError: '',
      isError: true,
      isVisible: false
    }
  });

  const onTitleChangeText = useCallback((value: string) => {
    validateField(error['title'], validate['title'], value);
    setValidate({ ...validate });
    setRecruitmentModel({ ...recruitmentModel, title: value });
  }, [validate]);

  const onEmploymentTypeChangeText = useCallback((value: string) => {
    validateField(error['employmentType'], validate['employmentType'], value);
    setValidate({ ...validate });
    setRecruitmentModel({ ...recruitmentModel, employmentType: value });
  }, [validate]);

  const onLocationChangeText = useCallback((value: string) => {
    validateField(error['location'], validate['location'], value);
    setValidate({ ...validate });
    setRecruitmentModel({ ...recruitmentModel, location: value });
  }, [validate]);

  const onDescriptionChangeText = useCallback((value: string) => {
    validateField(error['description'], validate['description'], value);
    setValidate({ ...validate });
    setRecruitmentModel({ ...recruitmentModel, description: value });
  }, [validate]);

  const onSalaryChangeText = useCallback((value: string) => {
    validateField(error['salary'], validate['salary'], value);
    setValidate({ ...validate });
    setRecruitmentModel({ ...recruitmentModel, salary: Number(value.replace(/\./g, '')) });
  }, [validate]);

  const onRequirementChangeText = useCallback((value: string) => {
    validateField(error['requirement'], validate['requirement'], value);
    setValidate({ ...validate });
    setRecruitmentModel({ ...recruitmentModel, requirement: value });
  }, [validate]);

  const onBenefitChangeText = useCallback((value: string) => {
    validateField(error['benefit'], validate['benefit'], value);
    setValidate({ ...validate });
    setRecruitmentModel({ ...recruitmentModel, benefit: value });
  }, [validate]);

  const onSubmit = useCallback(() => {
    if (isExistFieldInvalid<RecruitmentPost, CreateRecruitmentPostValidate, CreateRecruitmentPostError>(recruitmentModel, validate, error)) {
      setValidate({ ...validate });
    } else {
      createRecruitmentPost(recruitmentModel);
    }
  }, [validate]);


  useEffect(() => {
    if (createRecruitmentPostResponse.data) {
      Alert.alert(t('RecruitmentScreen.recruitmentSaveSuccessTitle'), t('RecruitmentScreen.recruitmentSaveSuccessContent'));
      navigation.goBack();
    }
  }, [createRecruitmentPostResponse]);

  useEffect(() => {
    if (moment().isAfter(moment(recruitmentModel.expiration))) {
      setValidate({
        ...validate,
        expiration: {
          textError: error.expiration.blank,
          isError: true,
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        expiration: {
          textError: '',
          isError: false,
          isVisible: false
        }
      })
    }
  }, [recruitmentModel.expiration]);

  return (
    <ContainerComponent>
      <ScrollView>
        <SessionComponent>
          <TextInputWithTitle
            defaultValue={recruitmentModel?.title}
            title={t('RecruitmentScreen.recruitmentSaveTitleTitle')}
            placeholder={t('RecruitmentScreen.recruitmentSaveTitlePlaceholder')}
            onChangeText={(value) => onTitleChangeText(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={t(validate.title?.textError)}
            isError={validate.title?.isError!}
            isVisible={validate.title?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={recruitmentModel?.employmentType}
            title={t('RecruitmentScreen.recruitmentSaveSaveEmploymentTypeTitle')}
            placeholder={t('RecruitmentScreen.recruitmentSaveEmploymentTypePlaceholder')}
            onChangeText={(value) => onEmploymentTypeChangeText(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={t(validate.employmentType?.textError)}
            isError={validate.employmentType?.isError!}
            isVisible={validate.employmentType?.isVisible}
          />
          <TextInputWithTitle
            defaultValue={recruitmentModel?.expiration}
            textInputRef={expirationRef}
            onFocus={() => {
              setShowDatePicker(true)
            }}
            title={t('RecruitmentScreen.recruitmentSaveExpirationTitle')}
            placeholder={moment().format('YYYY-MM-DD HH:mm:ss')}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={t(validate.expiration?.textError)}
            isError={validate.expiration?.isError!}
            isVisible={validate.expiration?.isVisible}
          />
          <DatePicker
            modal
            mode='datetime'
            locale={t('RecruitmentScreen.recruitmentSaveExpirationPickerLocale')}
            open={showDatePicker}
            date={new Date()}
            onConfirm={(date) => {
              setRecruitmentModel({
                ...recruitmentModel,
                expiration: moment(date).format('YYYY-MM-DD HH:mm:ss')
              });
              expirationRef.current?.blur();
              setShowDatePicker(false);
            }}
            onCancel={() => {
              expirationRef.current?.blur();
              setShowDatePicker(false);
            }}
          />
          <TextInputWithTitle
            multiline
            defaultValue={recruitmentModel?.location}
            numberOfLine={3}
            textInputStyle={{ textAlignVertical: 'top' }}
            title={t('RecruitmentScreen.recruitmentSaveLocationTitle')}
            placeholder={t('RecruitmentScreen.recruitmentSaveLocationPlaceholder')}
            onChangeText={(value) => onLocationChangeText(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={t(validate.location?.textError)}
            isError={validate.location?.isError!}
            isVisible={validate.location?.isVisible}
          />
          <TextInputWithTitle
            multiline
            defaultValue={recruitmentModel?.description}
            numberOfLine={3}
            textInputStyle={{ textAlignVertical: 'top' }}
            title={t('RecruitmentScreen.recruitmentSaveDescTitle')}
            placeholder={t('RecruitmentScreen.recruitmentSaveDescPlaceholder')}
            onChangeText={(value) => onDescriptionChangeText(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={t(validate.description?.textError)}
            isError={validate.description?.isError!}
            isVisible={validate.description?.isVisible}
          />
          <TextInputWithTitle
            keyboardType='number-pad'
            defaultValue={Number.isNaN(recruitmentModel.salary) ? '' : formatCurrency(Number(recruitmentModel.salary.toString()))}
            title={t('RecruitmentScreen.recruitmentSaveSallaryTitle')}
            placeholder={t('RecruitmentScreen.recruitmentSaveSallaryPlaceholder')}
            onChangeText={(value) => onSalaryChangeText(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={t(validate.salary?.textError)}
            isError={validate.salary?.isError!}
            isVisible={validate.salary?.isVisible}
          />
          <TextInputWithTitle
            multiline
            defaultValue={recruitmentModel?.requirement}
            numberOfLine={3}
            textInputStyle={{ textAlignVertical: 'top' }}
            title={t('RecruitmentScreen.recruitmentSaveRequirementTitle')}
            placeholder={t('RecruitmentScreen.recruitmentSaveRequirementPlaceholder')}
            onChangeText={(value) => onRequirementChangeText(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={t(validate.requirement?.textError)}
            isError={validate.requirement?.isError!}
            isVisible={validate.requirement?.isVisible}
          />
          <TextInputWithTitle
            multiline
            defaultValue={recruitmentModel?.benefit}
            numberOfLine={5}
            textInputStyle={{ textAlignVertical: 'top' }}
            title={t('RecruitmentScreen.recruitmentBenefitTitle')}
            placeholder={t('RecruitmentScreen.recruitmentBenefitPlaceholder')}
            onChangeText={(value) => onBenefitChangeText(value)}
          />
          <Button
            loading={createRecruitmentPostResponse.isLoading}
            disabled={createRecruitmentPostResponse.isLoading}
            icon='plus'
            mode='contained'
            rippleColor={'#0065FF80'}
            buttonColor={'#0065FF'}
            style={styles.buttonCreateRecruitment}
            onPress={onSubmit}
          >
            <TextComponent
              fontSize={16}
              fontWeight='bold'
              text={t('RecruitmentScreen.recruitmentSaveCompleteButton')}
            />
          </Button>
        </SessionComponent>
      </ScrollView>
    </ContainerComponent >
  );
};

export default CreateRecruitmentScreen;
