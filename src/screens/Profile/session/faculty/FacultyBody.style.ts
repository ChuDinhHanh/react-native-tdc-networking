import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  imageBackground: {
    aspectRatio: 2 / 1,
    objectFit: 'cover',
  },
  imageAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    objectFit: 'cover',
  },
  buttonAction: {
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 7,
    flexDirection: 'row',
  },
  btnOption: {
    backgroundColor: Colors.COLOR_GREY_FEEBLE,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    flexDirection: 'row',
  },
  txtContentBtn: {
    color: Colors.WHITE,
    paddingLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  paddingVertical: {
    paddingVertical: 7,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  paddingBottom: {
    paddingBottom: 7,
  },
  itemInfo: {
    paddingVertical: 1,
  },
  marginRightBtnAction: {
    marginRight: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  iconInfo: {
    marginRight: 5,
    width: '5%',
  },
  textInfo: {
    color: Colors.BLACK,
    width: '95%',
  },
});

export default styles;
