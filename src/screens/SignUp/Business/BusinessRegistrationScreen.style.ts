import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  headerModal: {
    borderBottomWidth: 0.7,
  },
  btnRegister: {
    backgroundColor: Colors.COLOR_BTN_BLUE_SECOND,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: Colors.COLOR_BTN_BLUE_SECOND,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtHeader: {
    color: Colors.WHITE,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    borderColor: Colors.DROPDOWN_COLOR,
    borderWidth: 2,
  },
  ip: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: Colors.GREY1,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  group: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  txt: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.GREY1,
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.BLACK,
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28,
  },
  icon: {
    fontSize: 20,
    position: 'absolute',
    padding: 50,
    right: -20,
  },
  icon1: {
    fontSize: 20,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnImg: {
    marginRight: 30,
  },
  img: {
    width: 130,
    height: 130,
    marginTop: 10,
    borderRadius: 100,
  },
  txtRegister: {
    color: Colors.WHITE,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  wrapperIconCamera: {
    paddingRight: 5,
  },
});

export default styles;
