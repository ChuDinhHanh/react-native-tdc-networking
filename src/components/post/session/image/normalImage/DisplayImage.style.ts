import {StyleSheet} from 'react-native';
import {Colors} from '../../../../../constants/Colors';
import {appInfo} from '../../../../../constants/Infos';

const styles = StyleSheet.create({
  wrapImage: {
    justifyContent: 'space-between',
    width: '100%',
    height: appInfo.sizes.HEIGHT * 0.4,
  },
  wrapImageSquare: {
    justifyContent: 'space-between',
    aspectRatio: 2 / 1,
  },
  imageOnePost: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  widthGreaterHeight: {
    width: '100%',
    height: '49.5%',
  },
  heightGreaterWidth: {
    width: '49.5%',
    height: '100%',
  },
  imageSquare: {
    width: '49.5%',
    height: '49.5%',
  },
  biggestWithGreaterHeight: {
    width: '100%',
    height: '59.5%',
  },
  biggestHeightGreaterWidth: {
    height: '100%',
    width: '59.5%',
  },
  justifyContent: {
    justifyContent: 'space-between',
  },
  smallImageBottom: {
    width: '32.83%',
    height: '100%',
  },
  smallImageRight: {
    height: '32.83%',
    width: '100%',
  },
  // Two image area
  wrapImageRow: {
    flexDirection: 'row',
  },
  // Three image area
  bottomWrapImageThree: {
    justifyContent: 'space-between',
    width: '100%',
    height: '39.5%',
  },
  // four image area
  bottomWrapImageFour: {
    justifyContent: 'space-between',
    width: '100%',
    height: '34.5%',
  },
  rightWrapImageFour: {
    justifyContent: 'space-between',
    height: '100%',
    width: '39.5%',
  },
  wrapImageFourSquare: {
    height: '49.5%',
    width: '100%',
  },
  wrapperLastImageButRemaining: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberImageRemaining: {
    zIndex: 999,
    position: 'absolute',
    color: Colors.WHITE,
    fontSize: 35,
  },
  marginRight: {
    marginRight: '0.5%',
  },
  wrapperLastImageButRemainingNotFound: {
    backgroundColor: Colors.RED,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999,
  },
});

export default styles;
