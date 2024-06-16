import {View, Text} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Route} from 'react-native-tab-view';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Variable} from '../../../constants/Variables';
import Student from '../../../components/update/profiles/student/student';
import Business from '../../../components/update/profiles/business/Business';
import Faculty from '../../../components/update/profiles/faculty/faculty';

const UpdateProfileScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'UPDATE_PROFILE'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {userData} = route.params;
  const handleIdentifyTypeUpdate = () => {
    switch (userData?.roleCodes) {
      case Variable.TYPE_POST_STUDENT:
        return <Student userData={userData} _navigation={navigation} />;
      case Variable.TYPE_POST_BUSINESS:
        return <Business userData={userData} _navigation={navigation} />;
      case Variable.TYPE_POST_FACULTY:
        return <Faculty userData={userData} _navigation={navigation} />;
      default:
        break;
    }
  };

  return (
    <View>
      <Text>{JSON.stringify(userData)}</Text>
    </View>
  );
};

export default UpdateProfileScreen;
