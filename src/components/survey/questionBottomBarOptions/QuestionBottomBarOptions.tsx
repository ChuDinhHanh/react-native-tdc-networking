import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import ToggleSwitch from 'toggle-switch-react-native'
import { Variable } from '../../../constants/Variables'
import { useAppDispatch, useAppSelector } from '../../../redux/Hook'
import { deleteQuestion, updateQuestion } from '../../../redux/Slice'
import styles from './QuestionBottomBarOptions.style'

interface QuestionBottomBarOptionsProps {
    index?: number
    mode: number[]
    onBtnUpdateQuestionPress?: (questionIndex: number) => void
}

const QuestionBottomBarOptions = (props: QuestionBottomBarOptionsProps) => {
    const t = useTranslation();
    const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer);
    const dispatch = useAppDispatch();
    const questionUpdate = useMemo(() => [...surveyPostRequest?.questions ?? []][props.index ?? -1], [props.index,surveyPostRequest]);

    const onBtnDeletePress = () => {
        dispatch(deleteQuestion(props.index));
    }

    const [switchToggle, setSwitchToggle] = useState(questionUpdate.required !== 0);

    useEffect(() => {
        if (surveyPostRequest) {
            dispatch(updateQuestion({
                index: props.index ?? -1,
                question: {
                    ...questionUpdate,
                    required: switchToggle ? 1 : 0
                }
            }))
        }
    }, [switchToggle])

    return (
        <View style={[styles.body, { display: props.mode.includes(Variable.EDIT_MODE) ? 'flex' : 'none' }]}>
            <IconButton
                icon='delete'
                iconColor='#f70000'
                size={25}
                style={[styles.btnDelete]}
                onPress={() => {
                    onBtnDeletePress()
                }}
            />
            <IconButton
                icon='square-edit-outline'
                iconColor='#14a44d'
                size={25}
                onPress={() => {
                    props.onBtnUpdateQuestionPress && props.onBtnUpdateQuestionPress(props.index ?? -1)
                }}
            />
            <ToggleSwitch
                isOn={switchToggle}
                onColor="#6f42c1"
                offColor="gray"
                label={t('QuestonBottomBarOptions.questionBottomBarQuestionRequireToggle')}
                size="small"
                onToggle={() => {
                    setSwitchToggle(!switchToggle)
                }}
            />
        </View>
    )
}

export default QuestionBottomBarOptions