import React, { Fragment, useCallback } from 'react'
import { useTranslation } from 'react-multi-lang'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Question } from '../../../types/Question'
import TextInputWithBottomBorder from '../../input/textInputWithBottomBorder/TextInputWithBottomBorder'
import TextComponent from '../../text/TextComponent'
import styles from './AddQuestionChoice.style'
import RowComponent from '../../row/RowComponent'

export interface QuestionUpdate {
    index: number
    data: Question
}

interface AddChoiceProps {
    questionUpdate?: QuestionUpdate
    question: Question
    onDeleteChoice: (index: number) => void
    onAddChoice: () => void
    onChoiceContentTextChange: (index: number, value: string) => void
}

const DELETE_CHOICE = 0;
const ADD_CHOICE = 1;

const AddQuestionChoice = (props: AddChoiceProps) => {
    const t = useTranslation();
    const buttonChoiceMode = useCallback((index: number) => {
        if (props.question?.choices?.length && index !== props.question.choices.length - 1) {
            return DELETE_CHOICE;
        } else {
            return ADD_CHOICE;
        }
    }, [props.question]);

    return (
        <Fragment>
            <TextComponent
                fontSize={16}
                fontWeight='bold'
                style={styles.txt}
                text={t('AddQuestionView.addQuestionViewComponentChoiceInputPlaceholder')}
            />
            <View style={styles.wrapper}>
                {
                    props.question?.choices?.map((item, index) => {
                        return (
                            <RowComponent
                                key={item.id}
                            >
                                <TextInputWithBottomBorder
                                    defaultValue={item.content}
                                    onTextChange={(value) => props.onChoiceContentTextChange(index, value)}
                                    placeholder={`${t('AddQuestionView.addQuestionViewComponentChoiceInputPlaceholder')} ${index + 1}...`}
                                />
                                <IconButton
                                    icon={buttonChoiceMode(index) === DELETE_CHOICE ? 'delete' : 'plus'}
                                    iconColor={buttonChoiceMode(index) === DELETE_CHOICE ? '#f70000' : '#037fe8'}
                                    size={22}
                                    onPress={() => {
                                        if (buttonChoiceMode(index) === DELETE_CHOICE) {
                                            props.onDeleteChoice(index);
                                        } else {
                                            props.onAddChoice()
                                        }
                                    }}
                                />
                            </RowComponent>
                        )
                    })
                }
            </View>
        </Fragment>
    )
}

export default AddQuestionChoice