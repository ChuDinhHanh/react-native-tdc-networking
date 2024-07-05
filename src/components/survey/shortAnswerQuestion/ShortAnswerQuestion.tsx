import React, { memo } from 'react'
import { useTranslation } from 'react-multi-lang'
import { TextInput, View } from 'react-native'
import { Variable } from '../../../constants/Variables'
import { QuestionProps } from '../../../types/Question'
import QuestionBottomBarOptions from '../questionBottomBarOptions/QuestionBottomBarOptions'
import QuestionTitle from '../questionTitle/QuestionTitle'
import styles from './ShortAnswerQuestion.style'

interface ShortAnswerQuestionProps extends QuestionProps {
    isEnableTextInput?: boolean
    onTextChange?: (value: string) => void
}

const ShortAnswerQuestion = (props: ShortAnswerQuestionProps) => {
    const t = useTranslation();
    const { mode, data, dataResponse, index, isDisableDeleteBtn, isEnableTextInput, onTextChange, onUpdateQuestion } = props;
    return (
        <View style={styles.group}>
            <QuestionTitle
                required={mode.includes(Variable.CONDUCT_MODE) ? dataResponse?.required : data?.required}
                title={`${t('MultiChoiceQuestion.questionComponentAddTextTitle')} ${(index ?? -1) + 1}. ${data?.title ?? dataResponse?.title}`}
                index={index ?? 0}
                isDisableBtnDelete={isDisableDeleteBtn}
            />
            <TextInput
                onChangeText={(value) => onTextChange && onTextChange(value)}
                editable={Boolean(isEnableTextInput)}
                placeholder={t('ShortAnswerQuestion.shortAnswerQuestionComponentTitlePlaceholder')}
                style={styles.ip}
            />
            {
                mode.includes(Variable.EDIT_MODE) && <QuestionBottomBarOptions
                    mode={mode}
                    index={index}
                    onBtnUpdateQuestionPress={onUpdateQuestion}
                />
            }
        </View>
    )
}

export default memo(ShortAnswerQuestion)