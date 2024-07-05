import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QuestionProps } from '../../../types/Question'
import { useTranslation } from 'react-multi-lang';
import QuestionTitle from '../questionTitle/QuestionTitle';
import { Variable } from '../../../constants/Variables';
import CheckboxInputWithTitle from '../../input/checkboxInputWithTitle/CheckboxInputWithTitle';
import QuestionBottomBarOptions from '../questionBottomBarOptions/QuestionBottomBarOptions';
import styles from './MultiChoiceQuestion.style';

interface MultiChoiceQuestionProps extends QuestionProps {
    onChangeValue?: (choice: number[]) => void
}

export default function MultiChoiceQuestion(props: Readonly<MultiChoiceQuestionProps>) {
    const t = useTranslation();
    const { mode, data, dataResponse, index, isDisableDeleteBtn, onChangeValue, onUpdateQuestion } = props;
    const [selectedChoiceIds, setSelectedChoiceIds] = useState<number[]>([]);
    useEffect(() => {
        onChangeValue && onChangeValue(selectedChoiceIds);
    }, [selectedChoiceIds]);

    return (
        <Pressable style={styles.itemBody}>
            <QuestionTitle
                required={mode.includes(Variable.CONDUCT_MODE) ? dataResponse?.required : data?.required}
                title={`${t('MultiChoiceQuestion.questionComponentAddTextTitle')} ${(index ?? -1) + 1}. ${data?.title ?? dataResponse?.title}`}
                index={index ?? 0}
                isDisableBtnDelete={isDisableDeleteBtn}
            />
            {
                (data?.choices && data.choices.map((item, index) => {
                    return (
                        <CheckboxInputWithTitle label={item.content} key={index} />
                    )
                }))
                ||
                (
                    dataResponse?.choices && dataResponse?.choices.map((item, index) => {
                        return (
                            <CheckboxInputWithTitle
                                label={item.content}
                                key={index}
                                onPress={() => {
                                    if (selectedChoiceIds.indexOf(item.id!) != -1) {
                                        setSelectedChoiceIds(selectedChoiceIds.filter((value) => value != item.id))
                                    } else {
                                        setSelectedChoiceIds([...selectedChoiceIds, item.id!])
                                    }
                                }}
                            />
                        )
                    })
                )
            }
            {
                mode.includes(Variable.EDIT_MODE) && <QuestionBottomBarOptions
                    mode={mode}
                    index={index}
                    onBtnUpdateQuestionPress={onUpdateQuestion}
                />
            }
        </Pressable>
    )
}