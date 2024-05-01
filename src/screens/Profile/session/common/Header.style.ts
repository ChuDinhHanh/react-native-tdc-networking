import {StyleSheet} from 'react-native';
import {appInfo} from '../../../../constants/Infos';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  imageBackground: {
    height: appInfo.sizes.HEIGHT * 0.3,
    objectFit: 'cover',
    backgroundColor: Colors.GREY1,
  },
  imageAvatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    position: 'absolute',
    bottom: -20,
    left: 10,
  },
  btnUploadImageAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
  btnUploadImageBackground: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.GREY1,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    objectFit: 'cover',
    backgroundColor: Colors.WHITE,
  },
  wrapperCameraBackground: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default styles;
