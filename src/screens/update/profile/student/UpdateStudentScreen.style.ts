import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.COLOR_BLUE_BANNER,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtHeader: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  group: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ipError: {
    fontSize: 18,
    borderColor: Colors.RED,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  ipFirstTime: {
    fontSize: 18,
    borderColor: Colors.GREY1,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnRegister: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnAble: {
    backgroundColor: Colors.COLOR_BTN_BLUE_PRIMARY,
  },
  btnDisable: {
    backgroundColor: Colors.GREY1,
  },
  txtRegister: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
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
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
    marginLeft: 10,
  },
  btnImg: {
    marginRight: 30,
  },

  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ipUnError: {
    borderColor: Colors.GREEN,
  },
  spinner: {
    position: 'absolute',
    left: '10%',
  },
  wrapperImage: {
    alignItems: 'center',
  },
});
export default styles;
