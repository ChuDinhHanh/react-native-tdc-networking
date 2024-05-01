import React, {memo} from 'react';
import {Image, Modal, View} from 'react-native';
import {Colors} from '../../../constants/Colors';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ButtonComponent from '../../buttons/ButtonComponent';
import styles from './ModalImage.style';

interface Props {
  visible: boolean;
  image: string;
  onCloseModal: () => void;
}

const ModalImage = (props: Props) => {
  const {image, onCloseModal, visible} = props;
  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ButtonComponent
            style={styles.button}
            onPress={onCloseModal}
            suffix={
              <IconAntDesign
                name="closecircle"
                size={35}
                color={Colors.WHITE}
              />
            }
          />
          <Image style={styles.image} source={{uri: image}} />
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalImage);
