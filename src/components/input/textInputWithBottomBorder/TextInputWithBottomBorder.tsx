import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

interface Props {
    defaultValue?: string
    placeholder?: string
    icon?: string
    iconColor?: string
    onActionButtonPress?: () => void
    onTextChange?: (value: string) => void;
}

export default function TextInputWithBottomBorder(props: Readonly<Props>) {
    const { defaultValue, icon, iconColor, onActionButtonPress, onTextChange, placeholder } = props;

    return (
        <TextInput
            defaultValue={defaultValue}
            multiline
            placeholder={placeholder}
            style={styles.ip}   
            onChangeText={value => onTextChange && onTextChange(value)}
        />
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ip: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#97A1B0',
        padding: 5,
        flex: 1
    }
})