import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import styles from './QuestionTitle.style'
import TextComponent from '../../text/TextComponent'

interface QuestionTitleProps {
    required?: number
    title: string
    index: number
    isDisableBtnDelete?: boolean
}
export default function QuestionTitle(props: Readonly<QuestionTitleProps>) {
    const { index, title, isDisableBtnDelete, required } = props;
    return (
        <View style={styles.body}>
            <TextComponent style={styles.questionTitle} text={props.title} />
            {
                Boolean(required) && <Text style={[{ color: 'red' }]}>*</Text>
            }
        </View>
    )
}