import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {ReactNode, useCallback, useEffect, useMemo, useRef} from 'react';
import {Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../constants/Colors';
import {useAppDispatch, useAppSelector} from '../../redux/Hook';
import {setHiddenBottomSheet} from '../../redux/Slice';
import ButtonComponent from '../buttons/ButtonComponent';
import SessionComponent from '../session/SessionComponent';
import TextComponent from '../text/TextComponent';
import styles from './BottomSheetModalWrapper.style';

interface Props {
  children: ReactNode;
}
const BottomSheetModalWrapper = (props: Props) => {
  const {children} = props;

  const {modalCommentData} = useAppSelector(
    state => state.TDCSocialNetworkReducer,
  );

  const {openBottomSheet} = useAppSelector(
    state => state.TDCSocialNetworkReducer,
  );

  const dispatch = useAppDispatch();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['60%', '95%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (openBottomSheet) {
      bottomSheetModalRef.current?.present();
    }
  }, [openBottomSheet]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClickCloseBtn = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {children}
        <BottomSheetModal
          onDismiss={() => {
            dispatch(setHiddenBottomSheet());
          }}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <View>
              {/* Header */}
              <SessionComponent padding={0} marginHorizontal={16}>
                <View style={styles.wrapperHeader}>
                  <TextComponent
                    fontSize={16}
                    fontWeight="bold"
                    color={Colors.BLACK}
                    text="Bình luận"
                  />
                  <ButtonComponent
                    suffix={
                      <IconAntDesign
                        name="closecircle"
                        color={Colors.GREY1}
                        size={20}
                      />
                    }
                    onPress={handleClickCloseBtn}
                  />
                </View>
              </SessionComponent>
              {/* body */}
              <View>
                <Text>{JSON.stringify(modalCommentData)}</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetModalWrapper;
