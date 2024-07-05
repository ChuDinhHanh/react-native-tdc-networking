import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../constants/Colors';
import { SERVER_ADDRESS } from '../../../constants/SystemConstant';
import styles from './ImageItem.style';

interface Props {
    imageName: string,
    handleLongClickIntoImage: (imageName: string) => void;
}
const ImageItem = React.memo((props: Props) => {
    const { handleLongClickIntoImage, imageName } = props;
    return (
        <View
            style={styles.wrapImage}
        >
            <TouchableOpacity
                onPress={() => handleLongClickIntoImage(imageName)}
                style={styles.wrapperBtnDelete}
            >
                <IconAntDesign
                    name="closecircle"
                    color={Colors.WHITE}
                    size={25}
                />
            </TouchableOpacity>
            <Image style={styles.image} source={{ uri: SERVER_ADDRESS + `api/images/${imageName}` }} />
        </View>
    );
});
export default ImageItem