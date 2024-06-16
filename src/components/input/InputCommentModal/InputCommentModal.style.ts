import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: 'rgb(250 250 250)',
    width: '100%',
  },
  inputWrapper: {
    width: '87%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(241 241 242)',
    borderRadius: 100,
  },
  wrapperUserTag: {
    flex: 1,
  },
  textUserTagTitle: {
    fontSize: 10,
  },
  textUserNameTag: {
    color: 'black',
    fontSize: 10,
  },
  wrapperAvatar: {
    width: '13%',
  },
  textInput: {
    paddingLeft: 15,
    flex: 1,
    color: 'black',
    fontSize: 10,
  },
  wrapperButton: {
    width: '13%',
  },
});

export default styles;
