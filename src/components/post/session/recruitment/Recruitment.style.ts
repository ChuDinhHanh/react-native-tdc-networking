import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  containerContentRecruitment: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    marginTop: 10,
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
    width: '95%',
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: 16,
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
  rightContainerBottom: {
    width: '95%',
  },
  rightContainerBottom3Info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomButton: {
    flexDirection: 'row',
    backgroundColor: Colors.COLOR_BLUE_BANNER,
    padding: 5,
    marginTop: 10,
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  item: {
    marginVertical: 2,
  },
  address: {
    color: Colors.COLOR_GREY,
    paddingLeft: 5,
  },
  careerTitle: {
    color: Colors.COLOR_GREY,
  },
  timeCreated: {
    color: Colors.COLOR_GREY,
  },
  salary: {
    color: Colors.COLOR_GREY,
  },
  typeCareer: {
    color: Colors.COLOR_GREY,
  },
  rightContainerTopTitle: {
    flexDirection: 'row',
    width: '100%',
  },
  itemType: {
    color: Colors.WHITE,
    fontWeight: '300',
    fontSize: 14,
  },
  iconArrow: {
    paddingLeft: 2,
  },
});

export default styles;
