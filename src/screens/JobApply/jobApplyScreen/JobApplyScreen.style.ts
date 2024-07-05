import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  btnContainer: {
    backgroundColor: Colors.COLOR_BLUE_RECRUITMENT_DETAIL_POST,
    flexDirection: 'row',
    flexShrink: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  btnTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnIcon: {
    marginStart: 10,
  },
  cvSource: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#eee',
    paddingBottom: 5,
  },
});

export default styles;
