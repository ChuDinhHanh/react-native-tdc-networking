import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  wrapImage: {
    width: 150,
    height: 200,
    padding: 2,
    zIndex: 999,
  },
  wrapperBtnDelete: {
    position: 'absolute',
    zIndex: 999,
    right: 5,
    top: 5,
  },
});
export default styles;
