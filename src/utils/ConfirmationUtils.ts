import {Alert} from 'react-native';
export const ConfirmationUtils = (
  title: string,
  content: string,
  yes: string,
  cancel: string,
) => {
  return new Promise<boolean>(resolve => {
    Alert.alert(title, content, [
      {
        text: cancel,
        onPress: () => {
          resolve(false);
        },
        style: 'cancel',
      },
      {
        text: yes,
        onPress: () => {
          resolve(true);
        },
      },
    ]);
  });
};
