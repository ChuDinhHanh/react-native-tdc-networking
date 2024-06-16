import React, {ReactNode} from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {appInfo} from '../../constants/Infos';
import RowComponent from '../../components/row/RowComponent';

interface Props {
  isScrollEnable?: boolean;
  isCenter?: boolean;
  backgroundColor?: string;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  isFull?: boolean;
  children: ReactNode;
  paddingVertical?: number;
  showsScrollIndicator?: boolean;
  imageBackground?: ImageSourcePropType | undefined;
}
const ContainerComponent = (props: Props) => {
  const {
    backgroundColor,
    isCenter,
    isFullHeight,
    isFullWidth,
    children,
    paddingVertical,
    isScrollEnable,
    showsScrollIndicator,
    imageBackground,
    isFull,
  } = props;

  const content = (
    <SafeAreaView
      style={{
        paddingVertical,
        flex: isFull ? 1 : undefined,
        backgroundColor: backgroundColor ?? Colors.WHITE,
        justifyContent: isCenter ? 'center' : undefined,
        alignItems: isCenter ? 'center' : undefined,
        height: isFullHeight ? appInfo.sizes.HEIGHT : undefined,
        width: isFullWidth ? appInfo.sizes.WIDTH : undefined,
      }}>
      {children}
    </SafeAreaView>
  );

  return (
    <React.Fragment>
      {isScrollEnable ? (
        <ScrollView
          style={{backgroundColor: backgroundColor ?? Colors.WHITE}}
          showsVerticalScrollIndicator={showsScrollIndicator}>
          <View>
            {imageBackground && (
              <RowComponent
                marginVertical={20}
                alignItems="center"
                justifyContent="center">
                <Image source={imageBackground} />
              </RowComponent>
            )}
            {content}
          </View>
        </ScrollView>
      ) : (
        content
      )}
    </React.Fragment>
  );
};

export default ContainerComponent;
