import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchScreen: {
    backgroundColor: 'white',
    flex: 1,
  },
  operation: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 50,
    height: 90
  },
  search: {
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    height: 45,
    paddingLeft: 10
  },
  select: {
    flexDirection: 'row',
    paddingTop: 5
  },
  drop: {
    flex: 5,
    color: 'white'
  },
  dropDown: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center',
    paddingLeft: 35,
    borderWidth: 1,
    borderColor: '#070375'
  }
});

export default styles;
