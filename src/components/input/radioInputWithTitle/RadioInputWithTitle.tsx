import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import styles from './RadioInputWithTitle.style';

interface RadioInputWithTitleProps {
    label?: string,
    value?: string,
    onPress?: () => void
}

export default function RadioInputWithTitle(props: RadioInputWithTitleProps) {
    const { label, onPress, value } = props;
    return (
        <View style={styles.radioInputBody}>
            <RadioButton value={props.value ?? ''} />
            <Pressable onPress={() => onPress && onPress()}>
                <Text style={styles.radioInputTitle}>{props.label ?? ''}</Text>
            </Pressable>
        </View>
    )
}