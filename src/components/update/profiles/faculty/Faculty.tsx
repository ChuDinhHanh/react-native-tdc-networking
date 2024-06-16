import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

interface Props {
  userData: any;
  _navigation: NativeStackNavigationProp<ParamListBase>;
}

const Faculty = (props: Props) => {
  return (
    <View>
      <Text>faculty</Text>
    </View>
  );
};

export default Faculty;
