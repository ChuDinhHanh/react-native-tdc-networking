import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/Colors';

const styles = StyleSheet.create({
  txtHeader: {
    color: Colors.BLACK,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  group: {
    backgroundColor: Colors.COLOR_BLUE_RECRUITMENT_DETAIL_POST,
  },
  item: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 1,
    borderRadius: 10,
    borderBottomWidth: 1,
  },
  txt: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  welfare: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  welfareTxt: {
    backgroundColor: '#3cb371',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 5,
  },
  headerWelfare: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: Colors.BLACK,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {
    fontSize: 5,
    backgroundColor: Colors.BLACK,
    borderRadius: 10,
    top: 7,
    margin: 5,
  },
  btnRecruitment: {
    backgroundColor: '#3cb371',
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  txtRecruitment: {
    color: '#ffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconRecruitment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
});
export default styles;
