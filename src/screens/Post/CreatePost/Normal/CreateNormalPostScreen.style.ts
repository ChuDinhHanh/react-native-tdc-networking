import {Colors} from '../../../../constants/Colors';
import {appInfo} from '../../../../constants/Infos';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  tabBarContainer: {
    borderColor: Colors.GREY1,
    width: '100%',
  },
  wrapTabBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: appInfo.sizes.HEIGHT * 0.08,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  wrapTabBarBtnRightAble: {
    padding: 5,
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapTabBarBtnRightUnAble: {
    padding: 5,
    backgroundColor: Colors.GREY1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarBtnRightTxt: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  // Body
  wrapperBody: {
    height: appInfo.sizes.HEIGHT * 0.75,
    zIndex: 999,
  },
  txtBody: {
    color: Colors.BLACK,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
  // Bottom
  wrapBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
  bottomContainer: {
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
    position: 'absolute',
    bottom: 0,
  },
  wrapperBodyImage: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    bottom: 0,
  },
  wrapperBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  wrapperInput: {
    width: '100%',
  },
});
export default styles;
