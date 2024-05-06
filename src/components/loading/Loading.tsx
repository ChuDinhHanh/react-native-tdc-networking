import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import TextComponent from '../text/TextComponent';
import styles from './Loading.style';

interface Props {
    colorActivityIndicator: string,
    sizeActivityIndicator: number
    colorText?: string,
    fontSizeText?: number
}
const Loading = (props: Props) => {
    const { colorActivityIndicator, colorText, fontSizeText, sizeActivityIndicator } = props;
    return (
        <View
            style={styles.wrapper}>
            <ActivityIndicator color={colorActivityIndicator} size={sizeActivityIndicator} />
            <TextComponent color={colorText ?? undefined} fontSize={fontSizeText ?? undefined} text="Loading..." />
        </View>
    );
};

export default Loading;
