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
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../../constants/Colors';
import {PROFILE_SCREEN} from '../../../constants/Screen';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {useAppDispatch, useAppSelector} from '../../../redux/Hook';
import {setHiddenModalLike} from '../../../redux/Slice';
import ButtonComponent from '../../buttons/ButtonComponent';
import DefaultAvatar from '../../common/defaultAvatar/DefaultAvatar';
import Divider from '../../common/divider/Divider';
import Loading from '../../loading/Loading';
import RowComponent from '../../row/RowComponent';
import SessionComponent from '../../session/SessionComponent';
import TextComponent from '../../text/TextComponent';
import styles from './ModalLike.style';
setTranslations({vi, jp, en});
setDefaultLanguage('vi');

const ModalLike = (props: {children: ReactNode}) => {
  console.log('==================ModalLike==================');
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const modalLikeData = useAppSelector(
    state => state.TDCSocialNetworkReducer.modalLikeData,
  );
  const isOpenModalLike = useAppSelector(
    state => state.TDCSocialNetworkReducer.openModalLike,
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

  const handleSeeUserProfileScreen = (item: any) => {
    dispatch(setHiddenModalLike());
    navigation.navigate(PROFILE_SCREEN);
  };

  const renderItem = (item: any) => (
    <RowComponent
      key={item.id}
      alignItems="center"
      marginVertical={5}
      onPress={() => handleSeeUserProfileScreen(item)}>
      {Boolean(item?.image) ? (
        <Image style={styles.avatar} source={{uri: item.image}} />
      ) : (
        <DefaultAvatar size={40} identifer={item.name[0]} />
      )}
      <TextComponent style={styles.txtName} text={item.name} />
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
