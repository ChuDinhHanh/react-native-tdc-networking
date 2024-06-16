import React, {memo} from 'react';
import {Image, Modal, View} from 'react-native';
import {Colors} from '../../../constants/Colors';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../../buttons/ButtonComponent';
import styles from './ModalImage.style';
import RowComponent from '../../row/RowComponent';
import {globalStyles} from '../../../styles/GlobalStyles';
import TextComponent from '../../text/TextComponent';
import SpaceComponent from '../../space/SpaceComponent';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import vi from '../../../languages/vi.json';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
setTranslations({vi, jp, en});
setDefaultLanguage('jp');

interface Props {
  isUpload: boolean;
  visible: boolean;
  image: any;
  onCloseModal: () => void;
  onUpdate?: () => void;
}

const ModalImage = (props: Props) => {
  const t = useTranslation();
  const {image, onCloseModal, visible, isUpload, onUpdate} = props;
  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={[styles.button, globalStyles.row]}>
            {isUpload && (
              <>
                <ButtonComponent
                  onPress={onUpdate!}
                  backgroundColor={Colors.COLOR_BTN_BLUE_PRIMARY}
                  borderRadius={5}
                  title={
                    <TextComponent
                      color={Colors.WHITE}
                      fontSize={10}
                      text={t('ModalImage.textUpdate')}
                    />
                  }
                  style={styles.buttonUpload}
                  spaceBehind={5}
                  suffix={
                    <IconEntypo
                      name="upload-to-cloud"
                      size={30}
                      color={Colors.WHITE}
                    />
                  }
                />
                <SpaceComponent width={10} />
              </>
            )}
            <ButtonComponent
              onPress={onCloseModal}
              suffix={
                <IconAntDesign
                  name="closecircle"
                  size={35}
                  color={Colors.WHITE}
                />
              }
            />
          </View>
          {isUpload ? (
            <Image style={styles.image} source={image} />
          ) : (
            <Image style={styles.image} source={{uri: image}} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalImage);
