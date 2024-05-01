import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    marginBottom: 0.5,
  },
  wrapperMenu: {
    paddingTop: 10,
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    width: '100%',
  },
  headerAvatar: {
    width: 43,
    height: 43,
    borderRadius: 22.5,
  },
  headerBusinessName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  headerCenterTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenterType: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenterTimePost: {
    fontWeight: 'normal',
    fontSize: 13,
    color: 'black',
    marginTop: 4,
  },
  headerTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  headerItem: {
    marginRight: 5,
  },
  wrapAvatar: {
    width: '15%',
  },
  wrapName: {
    width: '80%',
  },
  wrapMenu: {
    width: '5%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  menuOption: {
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    width: 160,
    marginLeft: -15,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default styles;
