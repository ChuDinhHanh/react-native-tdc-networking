import {
  ParamListBase,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactNode, useEffect, useState} from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {FlatList, Modal, Pressable, TouchableOpacity, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '../../../App';
import {Colors} from '../../../constants/Colors';
import {MY_PROFILE_SCREEN, PROFILE_SCREEN} from '../../../constants/Screen';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {useAppDispatch, useAppSelector} from '../../../redux/Hook';
import {
  setHiddenModalLike,
  setNavigateToProfileSameUser,
} from '../../../redux/Slice';
import ButtonComponent from '../../buttons/ButtonComponent';
import DefaultAvatar from '../../common/defaultAvatar/DefaultAvatar';
import Divider from '../../common/divider/Divider';
import Loading from '../../loading/Loading';
import RowComponent from '../../row/RowComponent';
import SessionComponent from '../../session/SessionComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import styles from './ModalLike.style';
import {shallowEqual} from 'react-redux';
setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface User {
  id: number;
  image: string;
  name: string;
}

const ModalLike = (props: {children: ReactNode}) => {
  console.log('==================ModalLike==================');
  const isFocused = useIsFocused();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const userIdOfProfileScreen = useAppSelector(
    state => state.TDCSocialNetworkReducer.userIdOfProfileScreen,
    shallowEqual,
  );

  const navigationTopTab =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
    shallowEqual,
  );
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const modalLikeData = useAppSelector(
    state => state.TDCSocialNetworkReducer.modalLikeData,
    shallowEqual,
  );
  const isOpenModalLike = useAppSelector(
    state => state.TDCSocialNetworkReducer.openModalLike,
    shallowEqual,
  );
  const {children} = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [modalLikeData]);

  const handleSeeUserProfileScreen = (item: User) => {
    dispatch(setHiddenModalLike());
    if (userIdOfProfileScreen !== item.id) {
      if (userLogin?.id !== item.id) {
        navigation.navigate(PROFILE_SCREEN, {
          userId: item.id,
          group: modalLikeData?.group!,
        });
      } else {
        navigationTopTab.navigate(MY_PROFILE_SCREEN);
      }
    } else {
      dispatch(setNavigateToProfileSameUser(item.id));
    }
  };

  const renderItem = (item: any) => (
    <RowComponent
      key={item.id}
      alignItems="center"
      marginVertical={5}
      onPress={() => handleSeeUserProfileScreen(item)}>
      {/* {Boolean(item?.image) ? (
        <Image style={styles.avatar} source={{uri: item.image}} />
      ) : ( */}
      <View style={{width: '10%'}}>
        <DefaultAvatar size={40} identifer={item.name[0]} />
      </View>
      {/* )} */}
      <SpaceComponent width={5} />
      <View style={{width: '90%'}}>
        <TextComponent style={styles.txtName} text={item.name} />
      </View>
    </RowComponent>
  );

  return (
    <React.Fragment>
      {children}
      <Modal visible={isOpenModalLike} transparent statusBarTranslucent={true}>
        <TouchableOpacity
          onPress={() => dispatch(setHiddenModalLike())}
          style={styles.container}>
          <Pressable style={[styles.wrapLayout]}>
            {/* Header */}
            <View style={styles.wrapperHeader}>
              <SessionComponent>
                <RowComponent
                  justifyContent="space-between"
                  alignItems="center">
                  <TextComponent
                    color={Colors.BLACK}
                    text={`${t('ModalListUserLiked.modalListUserLikedTitle')}`}
                  />
                  <ButtonComponent
                    suffix={
                      <IconAntDesign
                        name="close"
                        size={20}
                        color={Colors.BLACK}
                      />
                    }
                    onPress={() => dispatch(setHiddenModalLike())}
                  />
                </RowComponent>
              </SessionComponent>
            </View>
            <Divider thickness={2} />
            <View style={styles.wrapperBody}>
              {isLoading ? (
                <Loading
                  colorActivityIndicator={Colors.COLOR_BTN_BLUE_PRIMARY}
                  sizeActivityIndicator={30}
                />
              ) : (
                <SessionComponent paddingTop={0}>
                  {/* Show list user */}
                  <FlatList
                    refreshing={false}
                    onRefresh={() => {}}
                    data={modalLikeData?.likes}
                    extraData={modalLikeData?.likes}
                    renderItem={({item, index}) => renderItem(item)}
                  />
                </SessionComponent>
              )}
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </React.Fragment>
  );
};

export default ModalLike;
