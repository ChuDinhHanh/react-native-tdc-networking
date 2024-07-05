import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {Alert, Image, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../../App';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import SpaceComponent from '../../../components/space/SpaceComponent';
import TextComponent from '../../../components/text/TextComponent';
import {Colors} from '../../../constants/Colors';
import {SERVER_ADDRESS} from '../../../constants/SystemConstant';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {useAppSelector} from '../../../redux/Hook';
import {
  useJobApplyMutation,
  useJobApplyUpdateMutation,
} from '../../../redux/Service';
import {globalStyles} from '../../../styles/GlobalStyles';
import {Data} from '../../../types/Data';
import {FileUploadRequest} from '../../../types/request/FileUploadRequest';
import {handleUploadDocumentFiles} from '../../../utils/UploadUtils';
import styles from './JobApplyScreen.style';

setTranslations({vi, jp, en});
setDefaultLanguage('vi');

const cvDefaultValue: FileUploadRequest = {
  uri: '',
  type: '',
  size: 0,
  name: '',
};

const JobApplyScreen = () => {
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'JOB_APPLY_SCREEN'>>();
  const [cvSource, setCVSource] = useState<FileUploadRequest>(cvDefaultValue);
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer);
  const [jobApplyRequest, jobApplyResponse] = useJobApplyMutation();
  const [jobApplyUpdateRequest, jobApplyUpdateResponse] =
    useJobApplyUpdateMutation();

  useEffect(() => {
    if (route.params?.profileId) {
      setCVSource({
        ...cvSource,
        uri: SERVER_ADDRESS + 'api/files/' + route.params.cvUrl ?? '',
      });
    }
  }, [route.params?.profileId]);

  const renderCVDocumentView = () => {
    if (cvSource.type.includes('image')) {
      return (
        <Image
          style={{flex: 1, objectFit: 'scale-down'}}
          source={{uri: cvSource.uri}}
        />
      );
    }

    return (
      <Pdf
        trustAllCerts={false}
        source={cvSource}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{flex: 1}}
      />
    );
  };

  const onBtnAddCVPress = async () => {
    DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      copyTo: 'cachesDirectory',
    })
      .then(result => {
        setCVSource({
          uri: result[0].fileCopyUri ?? '',
          size: result[0].size ?? 0,
          type: result[0].type ?? '',
          name: result[0].name ?? '',
        });
      })
      .catch(error => console.log(error));
  };

  const onResult = (result: Data<string[]>) => {
    if (result.status === 200 || result.status === 201) {
      if (route.params?.profileId) {
        jobApplyUpdateRequest({
          profileId: route.params.profileId ?? -1,
          cvUrl: result.data[0],
        });
      } else {
        jobApplyRequest({
          user_id: userLogin?.id ?? -1,
          post_id: route.params?.recruitmentPostId ?? -1,
          cv_url: result.data[0],
        });
      }
    }
  };

  const onBtnFinishJobApplyPress = () => {
    if (!Boolean(cvSource.size)) {
      Alert.alert(
        t('JobApplyScreen.jobApplyScreenEmptyCvTextTitle'),
        t('JobApplyScreen.jobApplyScreenEmptyCvTextContent'),
      );
    }

    if (cvSource.type.includes('image')) {
      Alert.alert(
        t('JobApplyScreen.jobApplyScreenSaveSuccessTextTitle'),
        t('JobApplyScreen.jobApplyScreenUploadErrorFormat'),
      );
    } else {
      handleUploadDocumentFiles([cvSource], onResult);
    }
  };

  useEffect(() => {
    if (jobApplyResponse.isSuccess && jobApplyResponse.data) {
      Alert.alert(
        t('JobApplyScreen.jobApplyScreenSaveSuccessTextTitle'),
        t('JobApplyScreen.jobApplyScreenSaveSuccessTextContent'),
      );
      navigation.goBack();
    } else if (
      jobApplyUpdateResponse.isSuccess &&
      jobApplyUpdateResponse.data
    ) {
      Alert.alert(
        t('JobApplyScreen.jobApplyScreenSaveSuccessTextTitle'),
        t('JobApplyScreen.jobApplyScreenChangeSuccessTextContent'),
      );
      navigation.goBack();
    }
  }, [jobApplyResponse, jobApplyUpdateResponse]);

  return (
    <View style={styles.body}>
      <ButtonComponent
        width={130}
        spacePrevious={5}
        height={40}
        borderRadius={10}
        onPress={() => {
          onBtnAddCVPress();
        }}
        backgroundColor={Colors.GREEN_PRIMARY}
        title={
          <TextComponent
            color={Colors.WHITE}
            text={
              cvSource.size !== 0 || route.params?.profileId
                ? t('JobApplyScreen.jobApplyScreenButtonUpdateCvTitle')
                : t('JobApplyScreen.jobApplyScreenButtonAddCvTitle')
            }
          />
        }
        affix={
          <FontAwesome6Icon
            style={styles.btnIcon}
            name="upload"
            size={20}
            color="#fff"
          />
        }
      />

      <View style={styles.cvSource}>{renderCVDocumentView()}</View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 20,
        }}>
        <ButtonComponent
          width={130}
          spacePrevious={5}
          height={40}
          borderRadius={10}
          onPress={() => {
            setCVSource(cvDefaultValue);
            navigation.goBack();
          }}
          backgroundColor={Colors.GREY_FEEBLE}
          title={
            <TextComponent
              fontSize={16}
              fontWeight="bold"
              color={Colors.BLACK}
              text={t('JobApplyScreen.jobApplyScreenButtonGoBack')}
            />
          }
          affix={
            <IconMaterialCommunityIcons
              name="arrow-left-thin"
              size={20}
              color={Colors.BLACK}
            />
          }
          style={globalStyles.shadow}
        />
        <SpaceComponent width={20} />
        <ButtonComponent
          spacePrevious={5}
          width={130}
          height={40}
          borderRadius={10}
          onPress={onBtnFinishJobApplyPress}
          backgroundColor={Colors.COLOR_BTN_BLUE_PRIMARY}
          title={
            <TextComponent
              fontSize={16}
              fontWeight="bold"
              color={Colors.WHITE}
              text={t('JobApplyScreen.jobApplyScreenButtonComplete')}
            />
          }
          affix={
            <IconMaterialCommunityIcons
              name="plus"
              size={20}
              color={Colors.WHITE}
            />
          }
          style={globalStyles.shadow}
        />
      </View>
    </View>
  );
};

export default JobApplyScreen;
