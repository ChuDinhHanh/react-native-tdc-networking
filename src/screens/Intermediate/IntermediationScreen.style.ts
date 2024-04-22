import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: Colors.GREY1,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28,
  },
  btnContinue: {
    width: 100,
    height: 45,
    backgroundColor: Colors.COLOR_BTN_BLUE_SECOND,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  txtRegister: {
    color: Colors.WHITE,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapperImage: {
    flex: 0.5,
    width: '100%',
  },
  wrapperSelectArea: {
    margin: 10,
    borderRadius: 10,
  },
});

export default styles;
