import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  body: {
    borderTopWidth: 20,
    borderTopColor: '#e0e0e0',
    padding: 15,
  },
  textName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    marginTop: 5,
  },
  textEmail: {
    color: '#000',
    marginTop: 2,
    fontSize: 14,
    marginBottom: 5,
  },

  // Button with back action
  toolbarBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#fff',
    elevation: 5,
  },
  toolbarTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backBtnStyle: {
    position: 'absolute',
    left: 10,
    zIndex: 99,
  },

  // Toolbar
  header: {
    height: 40,
  },
  appbarContent: {
    color: '#0065FF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  appbarAction: {
    width: 35,
    height: 35,
  },
});

export default styles;
