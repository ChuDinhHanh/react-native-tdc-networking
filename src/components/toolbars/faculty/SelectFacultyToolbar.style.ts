import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1e90ff',
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
  form: {marginTop: 10},
  group: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  txt: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  ip: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#97A1B0',
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  btnRegister: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtRegister: {
    color: Colors.WHITE,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },

  dropdown: {
    height: 50,
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 5,
    flex: 1,
    borderColor: Colors.GREY1,
  },

  dropdownHaveValues: {
    backgroundColor: Colors.WHITE,
  },

  dropdownUnHaveValues: {
    backgroundColor: Colors.WHITE,
  },

  activityIndicator: {
    marginLeft: 16,
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
  icon: {
    fontSize: 20,
    position: 'absolute',
    padding: 50,
    right: -20,
  },
  icon1: {
    fontSize: 20,
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 10,
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
  textInput: {
    borderColor: '#228b22',
    borderWidth: 2,
  },
});

export default styles;
