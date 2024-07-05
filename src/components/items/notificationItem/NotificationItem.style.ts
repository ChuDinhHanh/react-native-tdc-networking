import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  menuOptions: {
    marginLeft: 50,
    marginTop: 25,
    borderRadius: 10,
  },
  nameTxt: {
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 15,
    marginBottom: 1,
  },
  item2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 15,
    marginBottom: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    paddingVertical: 20,
    borderColor: '#0065ff',
    borderWidth: 1,
  },
  cont: {
    flexDirection: 'row',
  },
  content: {
    paddingTop: 8,
    paddingLeft: 10,
    width: '80%',
  },
  name: {
    fontSize: 15,
  },
  tg: {
    fontSize: 15,
    color: '#B9B6B6',
    paddingBottom: 0,
  },
  menu: {
    justifyContent: 'center',
  },
  option: {
    fontSize: 15,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
  },
  surveyBtn: {
    backgroundColor: '#0065ff',
    marginTop: 5,
    marginBottom: 5,

    width: '50%',
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyTxt: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default styles;
