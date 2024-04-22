import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Appbar} from 'react-native-paper';
import {RootStackParamList} from '../../App';
import {CONVERSATION_SCREEN, SEARCH_SCREEN} from '../../constants/Screen';
import styles from './common.style';

const ToolBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const onSearchBtnPress = useCallback(() => {
    navigation.navigate(SEARCH_SCREEN);
  }, []);

  const onMessengerBtnPress = useCallback(() => {
    navigation.navigate(CONVERSATION_SCREEN);
  }, []);

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon={'menu'}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Appbar.Content
        title="TDC Social Network"
        titleStyle={styles.appbarContent}
      />

      <Appbar.Action
        style={styles.appbarAction}
        icon="magnify"
        size={25}
        onPress={() => {
          onSearchBtnPress();
        }}
      />

      <Appbar.Action
        style={styles.appbarAction}
        icon="facebook-messenger"
        size={25}
        onPress={() => {
          onMessengerBtnPress();
        }}
      />
    </Appbar.Header>
  );
};

export default ToolBar;
