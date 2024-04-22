import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  imageLogin: {
    resizeMode: 'cover',
  },
  txtLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginVertical: 15,
  },
  form: {},
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.GREY1,
    marginVertical: 5,
  },
  txtIP: {
    fontSize: 18,
    paddingLeft: 30,
  },
  icon: {
    fontSize: 20,
    position: 'absolute',
    top: 14,
  },
  txtForgot: {
    fontSize: 15,
  },
  btnLogin: {
    width: '100%',
    fontSize: 30,
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
    paddingVertical: 15,
    marginVertical: 25,
    borderRadius: 15,
  },
  txtB: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: 'bold',
    marginRight: 10,
    alignSelf: 'center',
  },
  txt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  txtTypePasswordShow: {
    marginLeft: 10,
  },
  txtPasswordError: {
    color: Colors.RED,
    marginTop: 10,
  },
});

export default styles;
