import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import { View } from 'react-native';
import { RootStackParamList } from '../../App';
import { Variable } from '../../constants/Variables';
import { useAppSelector } from '../../redux/Hook';
import BusinessBody from './session/business/BusinessBody';
import FacultyBody from './session/faculty/FacultyBody';
import StudentBody from './session/student/StudentBody';

import SpaceComponent from '../../components/space/SpaceComponent';
import en from '../../languages/en.json';
import jp from '../../languages/jp.json';
import vi from '../../languages/vi.json';
import { Post } from '../../types/Post';
import styles from './ProfileTypeChecker.style';
import Header from './session/common/Header';

setTranslations({ vi, jp, en });
setDefaultLanguage('jp');

export interface Props {
  isFollow: boolean;
  data: Post[];
  role: string;
  userData: any;
  onClickButtonEvent: (a: number) => void;
  onClickIntoHeaderComponentEvent: (a: number) => void;
}

const ProfileTypeChecker = (props: Props) => {
  const {
    data,
    onClickButtonEvent,
    onClickIntoHeaderComponentEvent,
    isFollow,
    role,
    userData,
  } = props;
  const t = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer);

  const getBody = () => {
    switch (role) {
      case Variable.TYPE_POST_STUDENT:
        return <StudentBody />;
      case Variable.TYPE_POST_BUSINESS:
        return (
          <BusinessBody
            t={t}
            isFollow={isFollow}
            onClickButtonEvent={onClickButtonEvent}
            timeWork={userData?.activeTime ?? t('Profile.unUpdate')}
            taxIdentificationNumber={userData.taxCode ?? t('Profile.unUpdate')}
            representor={userData.representor ?? t('Profile.unUpdate')}
            address={userData.address ?? t('Profile.unUpdate')}
            phone={userData.phone ?? t('Profile.unUpdate')}
            email={userData.email ?? t('Profile.unUpdate')}
            name={userData.name ?? t('Profile.unUpdate')}
            numberPost={data ? data.length : 0}
            isSameUser={userData?.id === userLogin?.id}
          />
        );
      case Variable.TYPE_POST_FACULTY:
        return <FacultyBody />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {userData && (
        <View style={styles.container}>
          <Header
            isSameUser={props.userData?.id === userLogin?.id}
            background={
              'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-deo-kinh.jpg'
            }
            avatar={
              'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-deo-kinh.jpg'
            }
            name={props.userData.name}
            onClickIntoHeaderComponentEvent={onClickIntoHeaderComponentEvent}
          />
          {getBody()}
        </View>
      )}
      <SpaceComponent height={5} />
    </React.Fragment>
  );
};

export default memo(ProfileTypeChecker);
