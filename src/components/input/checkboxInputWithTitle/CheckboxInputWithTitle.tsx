import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from './CheckboxInputWithTitle.style';
import { Pressable } from 'react-native';

interface CheckboxInputWithTitleProps {
    label?: string
    onPress?: () => void
}

export default function CheckboxInputWithTitle(props: CheckboxInputWithTitleProps) {
    const { label, onPress } = props;
    const [checked, setChecked] = useState(false);
    return (
        <View style={styles.radioInputBody}>
            <Checkbox.Android
                onPress={() => {
                    setChecked(!checked)
                    props.onPress && props.onPress()
                }}
                status={checked ? 'checked' : 'unchecked'}
            />
            <Pressable
                onPress={() => {
                    setChecked(!checked)
                    props.onPress && props.onPress()
                }}
            >
                <Text style={styles.radioInputTitle}>{props.label ?? ''}</Text>
            </Pressable>
        </View>
    )
}