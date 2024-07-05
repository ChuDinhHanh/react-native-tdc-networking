import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  left: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '85%',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  wrapInput: {
    width: '90%',
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: Colors.GREY1,
  },
  txtInput: {
    paddingLeft: 5,
  },
  activeButton: {
    flexDirection: 'row',
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
  },
  unActiveButton: {
    flexDirection: 'row',
    backgroundColor: Colors.GREY_FEEBLE,
  },
  txtButtonChooseTypePostUnActive: {
    color: Colors.GREY1,
    paddingLeft: 5,
  },
  txtButtonChooseTypePostActive: {
    color: Colors.WHITE,
    paddingLeft: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginRight: 10,
    marginVertical:5
  },
});

export default styles;
