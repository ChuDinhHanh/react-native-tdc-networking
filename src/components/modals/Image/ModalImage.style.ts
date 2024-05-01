import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  wrapper: {
    width: '100%',
    height: '85%',
  },
  button: {
    position: 'absolute',
    zIndex: 999,
    top: -40,
    right: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default styles;
