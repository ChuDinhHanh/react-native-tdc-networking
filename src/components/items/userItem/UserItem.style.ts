import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  menuText: {
    fontSize: 15,
  },
  menuOption: {
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    width: 130,
    marginLeft: -15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    paddingVertical: 20,
    borderColor: '#0065ff',
    borderWidth: 1,
    resizeMode: 'cover',
  },
  name: {
    paddingRight: 10,
    paddingLeft: 10,
    width: '62%',
    fontSize: 17,
    color: '#5A5F5C',
    fontWeight: 'bold',
  },
  follow: {
    height: 30,
    borderRadius: 5,
    backgroundColor: '#0065ff',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonFollow: {
    backgroundColor: '#f3f9ff',
  },
  wrapperItem: {
    flex: 1,
  },
  wrapperAvatar: {
    width: '20%',
  },
  wrapperContent: {
    width: '80%',
  },
});

export default styles;
