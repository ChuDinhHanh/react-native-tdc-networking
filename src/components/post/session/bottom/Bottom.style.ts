import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  wrapBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  wrapIconAndTextBottom: {
    width: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerCenter: {},
  wrapBottomChild: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: Colors.RED,
    borderRadius: 15,
  },
  containerContent: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  iconRight: {
    marginLeft: 20,
  },
  wrapBottomLeft: {
    width: '50%',
  },
  wrapBottomRight: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatarUserReacted: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  absolute: {
    position: 'absolute',
  },
  avatarUserReactedOne: {
    right: '70%',
  },
  avatarUserReactedTwo: {
    right: '48%',
  },
  avatarUserReactedThree: {
    right: '24%',
  },
  numberUserReactedRemaining: {
    right: 0,
    backgroundColor: Colors.GREY1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomWrapRightText: {
    color: 'black',
    marginRight: 5,
  },
  txtNumberUserReactedRemaining: {
    color: 'black',
  },
  avatarUserReactedContainer: {
    width: 100,
    height: '100%',
  },
  wrapAvatarBottomRight: {
    flexDirection: 'row',
  },
  avatarUserReactedDefault: {
    margin: 1,
  },
});
export default styles;
