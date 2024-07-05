import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_MODAL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBody: {
    height: '90%',
    width: '100%',
  },
  wrapperHeader: {
    height: '10%',
    width: '100%',
  },
  wrapLayout: {
    width: '80%',
    height: '70%',
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
  },
  header: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: Colors.GREY1,
  },
  txtTitle: {
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  btnIconClose: {
    position: 'absolute',
    right: 10,
  },
  wrapListUserReaction: {},
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  txtName: {
    color: Colors.BLACK,
    paddingLeft: 10,
  },
});

export default styles;
