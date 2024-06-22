import {View, Text} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Route} from 'react-native-tab-view';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Variable} from '../../../constants/Variables';
import UpdateStudentScreen from '../../update/profile/student/UpdateStudentScreen';
import UpdateBusinessScreen from '../../update/profile/business/UpdateBusinessScreen';
import UpdateFacultyScreen from '../../update/profile/faculty/UpdateFacultyScreen';

const UpdateProfileScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'UPDATE_PROFILE'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {userData} = route.params;
  const handleIdentifyTypeUpdate = () => {
    switch (userData?.roleCodes) {
      case Variable.TYPE_POST_STUDENT:
        return (
          <UpdateStudentScreen userData={userData} _navigation={navigation} />
        );
      case Variable.TYPE_POST_BUSINESS:
        return (
          <UpdateBusinessScreen userData={userData} _navigation={navigation} />
        );
      case Variable.TYPE_POST_FACULTY:
        return (
          <UpdateFacultyScreen userData={userData} _navigation={navigation} />
        );
      default:
        break;
    }
  };

  return <React.Fragment>{handleIdentifyTypeUpdate()}</React.Fragment>;
};

export default UpdateProfileScreen;
