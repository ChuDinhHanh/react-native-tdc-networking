import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {Text, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {RootStackParamList} from '../../../../App';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import RecruitmentDetailItem from '../../../../components/items/recruitmentDetail/RecruitmentDetailItem';
import SpaceComponent from '../../../../components/space/SpaceComponent';
import TextComponent from '../../../../components/text/TextComponent';
import {Colors} from '../../../../constants/Colors';
import {JOB_APPLY_SCREEN} from '../../../../constants/Screen';
import en from '../../../../languages/en.json';
import jp from '../../../../languages/jp.json';
import vi from '../../../../languages/vi.json';
import {useAppSelector} from '../../../../redux/Hook';
import {useGetDetailRecruitmentQuery} from '../../../../redux/Service';
import {Recruitment} from '../../../../types/Recruitment';
import {formatCurrency} from '../../../../utils/FormatCurrencyUtils';
import ContainerComponent from '../../../container/ContainerComponent';
import styles from './RecruitmentDetailScreen.style';
import {globalStyles} from '../../../../styles/GlobalStyles';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

const RecruitmentDetailScreen = () => {
  const t = useTranslation();
  const route =
    useRoute<RouteProp<RootStackParamList, 'RECRUITMENT_DETAIL_SCREEN'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
  );
  const postId = route.params?.postId ?? 0;

  const [dataRecruitment, setDataRecruitment] = useState<Recruitment>({
    createdAt: '',
    salary: '',
    expiration: '',
    location: '',
    employmentType: '',
    benefit: [],
    description: [],
    requirement: [],
    title: '',
    isApplyJob: 0,
  });

  const latestDataRef = useRef<Recruitment>();

  const {data, isFetching} = useGetDetailRecruitmentQuery({
    postId: postId,
    userLogin: userLogin?.id ?? 0,
  });

  useEffect(() => {
    if (data) {
      latestDataRef.current = data.data;
      setDataRecruitment(latestDataRef.current!);
    }
  }, [data]);

  const printfBenefit = useMemo(() => {
    return (
      <View style={styles.welfare}>
        {[dataRecruitment.description]
          .filter(item => item !== '')
          .map((item, index) => (
            <TextComponent
              style={styles.welfareTxt}
              key={item.id}
              text={item}
            />
          ))}
      </View>
    );
  }, [dataRecruitment.benefit]);

  const printfDescription = useMemo(() => {
    return (
      <View>
        {[dataRecruitment.description]
          .filter(item => item !== '')
          .map((item, index) => (
            <View style={styles.description} key={item.id}>
              <Text
                style={{
                  marginRight: 6,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: 'black',
                }}
              />
              <TextComponent key={item.id} text={item} color={Colors.BLACK} />
            </View>
          ))}
      </View>
    );
  }, [dataRecruitment.description]);

  const printfRequirement = useMemo(() => {
    return (
      <View>
        {[dataRecruitment.requirement]
          .filter(item => item !== '')
          .map((item, index) => (
            <View style={styles.description} key={item.id}>
              <Text
                style={{
                  marginRight: 6,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: 'black',
                }}
              />
              <TextComponent key={item.id} text={item} color={Colors.BLACK} />
            </View>
          ))}
      </View>
    );
  }, [dataRecruitment.requirement]);

  const onSubmit = () => {
    // if (dataRecruitment.isApplyJob === 1) {
    //   Alert.alert(t('RecuitmentPostDetailComponent.textNotification'), t('RecuitmentPostDetailComponent.textApplied'))
    // } else if (!isStudent(userLogin)) {
    //   Alert.alert(t('RecuitmentPostDetailComponent.textNotification'), t('RecuitmentPostDetailComponent.textNoApply'))
    // } else {
    //   navigation.navigate(JOB_APPLY_SCREEN, { recruitmentPostId: postId })
    // }
    navigation.navigate(JOB_APPLY_SCREEN, {recruitmentPostId: postId});
  };

  return (
    <ContainerComponent
      isScrollEnable={true}
      isFull={true}
      backgroundColor={Colors.WHITE}>
      <RecruitmentDetailItem
        title={t('RecuitmentPostDetailComponent.titleJob')}
        content={dataRecruitment.title}
        icon={
          <FontAwesome6Icon
            name="ranking-star"
            size={16}
            color={Colors.GREY1}
          />
        }
      />
      <RecruitmentDetailItem
        title={t('RecuitmentPostDetailComponent.employeType')}
        content={dataRecruitment.employmentType}
        icon={<Icon name="briefcase" size={16} color={Colors.GREY1} />}
      />
      <RecruitmentDetailItem
        title={t('RecuitmentPostDetailComponent.salary')}
        content={`${formatCurrency(dataRecruitment?.salary)} ${t(
          'RecuitmentPostDetailComponent.salaryUnitMonth',
        )}`}
        icon={
          <FontAwesome6Icon
            name="money-bill-1"
            size={16}
            color={Colors.GREY1}
          />
        }
      />
      <RecruitmentDetailItem
        title={t('RecuitmentPostDetailComponent.location')}
        content={dataRecruitment.location}
        icon={
          <AntDesignIcon name="clockcircleo" size={16} color={Colors.GREY1} />
        }
      />
      <SpaceComponent height={15} />
      {/* Benefit */}
      <TextComponent
        style={styles.headerWelfare}
        text={t('RecuitmentPostDetailComponent.benefit')}
      />
      {printfBenefit}
      <SpaceComponent height={5} />
      {/* Description */}
      <TextComponent
        style={styles.headerWelfare}
        text={t('RecuitmentPostDetailComponent.descriptionJob')}
      />
      {printfDescription}
      <SpaceComponent height={5} />
      {/* Requirement */}
      <TextComponent
        style={styles.headerWelfare}
        text={t('RecuitmentPostDetailComponent.requipmentJob')}
      />
      {printfRequirement}
      <SpaceComponent height={5} />
      <ButtonComponent
        onPress={onSubmit}
        style={[styles.btnRecruitment, globalStyles.shadow]}
        title={
          <TextComponent
            fontSize={18}
            fontWeight="bold"
            color={Colors.WHITE}
            text={t('RecuitmentPostDetailComponent.btnApplyJob')}
          />
        }
      />
    </ContainerComponent>
  );
};

export default RecruitmentDetailScreen;
