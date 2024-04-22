import {View, Text} from 'react-native';
import React from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './common.style';
import IconButton from '../buttons/IconButton';

interface ToolbarWithBackPressProps {
  title: string;
}

const ToolbarWithBackPress = ({title}: ToolbarWithBackPressProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.toolbarBody}>
      <IconButton
        iconSize={18}
        iconName="chevron-left"
        iconColor="#000"
        onPress={() => handleGoBack()}
        inactiveBackgroundColor="#ffffff00"
        activeBackgroundColor="#ffffff1a"
        customStyle={styles.backBtnStyle}
      />
      <Text style={styles.toolbarTitle}>{title}</Text>
    </View>
  );
};

export default ToolbarWithBackPress;
