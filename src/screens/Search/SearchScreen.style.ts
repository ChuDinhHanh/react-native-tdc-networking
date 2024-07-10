import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  searchScreen: {
    backgroundColor: 'white',
    flex: 1,
  },
  search: {
    flex: 1,
    paddingLeft: 10,
  },
  drop: {
    flex: 5,
    color: 'white',
  },
  dropDown: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center',
    paddingLeft: 35,
    width: '49%',
  },
  dropDown2: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 20,
    width: '49%',
  },
  btnSearch: {
    flex: 1,
    backgroundColor: '#0065ff',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 5,
  },
  indicator: {
    marginTop: 100,
  },
  buttonSearch: {
    paddingHorizontal: 5,
  },
  wrapperSearchArea: {
    height: 45,
    width: '100%',
  },
});

export default styles;
