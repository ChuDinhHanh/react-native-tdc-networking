import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 1,
    borderRadius: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.BLACK,
  },
  txt: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconRecruitment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
  margin: {
    marginLeft: 10,
  },
});
export default styles;
