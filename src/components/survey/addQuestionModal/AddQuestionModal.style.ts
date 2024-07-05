import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#00000099',
    elevation: 5,
  },
  containerStyle: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    borderRadius: 4,
    margin: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginStart: 15,
    color: '#000',
  },
  btnClose: {
    marginStart: 'auto',
  },
  modalBody: {
    maxHeight: '90%',
    paddingHorizontal: 5,
  },
  modalFooter: {
    paddingHorizontal: 5,
  },
});

export default styles;
