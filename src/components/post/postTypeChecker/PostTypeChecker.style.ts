import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: Colors.COLOR_WHITE,
    marginBottom: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 300,
  },
  bodyWrap: {
    marginVertical: 10,
  },
});

export default styles;
