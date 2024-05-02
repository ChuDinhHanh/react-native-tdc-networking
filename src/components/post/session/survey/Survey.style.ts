import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {},
  containerSurvey: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  leftContainer: {
    width: '15%',
  },
  rightContainer: {
    width: '85%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: 16,
    width: '95%',
  },
  menu: {
    width: '5%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  textTypePost: {
    backgroundColor: Colors.COLOR_SUCCESS,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemType: {
    color: Colors.WHITE,
    fontWeight: '300',
    fontSize: 14,
  },
  rightContainerBottom: {
    width: '95%',
  },
  rightContainerBottom3Info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomButton: {
    flexDirection: 'row',
    backgroundColor: Colors.COLOR_BLUE_BANNER,
    padding: 6,
    alignItems: 'center',
    borderRadius: 5,
  },
  item: {
    marginVertical: 2,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  address: {
    color: Colors.COLOR_GREY,
  },
  rightContainerTopTitle: {
    flexDirection: 'row',
  },
  contentContainer: {},
  title: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    marginTop: 15,
  },
  txtBtn: {
    color: Colors.WHITE,
    paddingRight: 5,
  },
});

export default styles;
