import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Variable } from '../../../constants/Variables'
import { QuestionProps } from '../../../types/Question'
import RadioInputWithTitle from '../../input/radioInputWithTitle/RadioInputWithTitle'
import QuestionBottomBarOptions from '../questionBottomBarOptions/QuestionBottomBarOptions'
import QuestionTitle from '../questionTitle/QuestionTitle'
import styles from './OneChoiceQuestion.style'

interface OneChoiceQuestionProps extends QuestionProps {
    onChangeValue?: (choice: number[]) => void
}

export default function OneChoiceQuestion(props: Readonly<OneChoiceQuestionProps>) {
    const { mode, data, dataResponse, index, isDisableDeleteBtn, onChangeValue, onUpdateQuestion } = props;
    const t = useTranslation();
    const [value, setValue] = useState('');
    const [selectedChoiceIds, setSelectedChoiceIds] = useState<number[]>([]);

    useEffect(() => {
        onChangeValue && onChangeValue(selectedChoiceIds);
    }, [selectedChoiceIds]);

    return (
        <View style={styles.itemBody}>
            <QuestionTitle
                required={props.mode.includes(Variable.CONDUCT_MODE) ? props.dataResponse?.required : props.data?.required}
                title={`${t('MultiChoiceQuestion.questionComponentAddTextTitle')} ${(props.index ?? -1) + 1}. ${props.data?.title ?? props.dataResponse?.title}`}
                index={props.index ?? 0}
                isDisableBtnDelete={props.isDisableDeleteBtn}
            />
            <RadioButton.Group
                onValueChange={(value) => {
                    setValue(value)
                    if (dataResponse) {
                        setSelectedChoiceIds([parseInt(value)]);
                    }
                }}
                value={value}
            >
                {
                    (data?.choices) && data.choices.map((item, index) => {
                        return <RadioInputWithTitle label={item.content} value={item.id ? String(item.id) : String(index)} />
                    }) ||
                    (
                        dataResponse?.choices && dataResponse.choices.map((item, index) => {
                            return (
                                <RadioInputWithTitle
                                    key={item.id}
                                    onPress={() => {
                                        setValue(item.id!.toString())
                                        if (props.dataResponse) {
                                            setSelectedChoiceIds([parseInt(item.id!.toString())])
                                        }
                                    }}
                                    label={item.content}
                                    value={item.id?.toString()}
                                />
                            )
                        })
                    )
                }
            </RadioButton.Group>
            {
                mode.includes(Variable.EDIT_MODE) && <QuestionBottomBarOptions
                    mode={mode}
                    index={index}
                    onBtnUpdateQuestionPress={props.onUpdateQuestion}
                />
            }
        </View>
    )
}