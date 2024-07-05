import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, ScrollView, View } from 'react-native';
import { IconButton, Modal, Portal } from 'react-native-paper';
import { Variable } from '../../../constants/Variables';
import { useAppDispatch } from '../../../redux/Hook';
import { updateQuestion } from '../../../redux/Slice';
import { Choice, Question } from '../../../types/Question';
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange } from '../../../utils/ValidateUtils';
import ButtonFullWith from '../../buttons/ButtonFullWith';
import TextInputWithTitle from '../../input/textInputWithTitle/TextInputWithTitle';
import TextComponent from '../../text/TextComponent';
import TextValidate from '../../validation/TextValidate';
import AddQuestionChoice, { QuestionUpdate } from '../addQuestionChoice/AddQuestionChoice';
import { QuestionType } from '../chooseQuestionBar/ChooseQuestionBar';
import styles from './AddQuestionModal.style';

interface AddQuestionModalProps {
    questionUpdate: QuestionUpdate | null;
    type: QuestionType | null;
    onDismiss: () => void;
    onCompleteSaveQuestion: (question: Question) => void;
}

const defaultQuestion: Question = {
    choices: [],
    required: 1,
    type: "",
    title: ""
}

const AddQuestionModal = (props: AddQuestionModalProps) => {
    const { onCompleteSaveQuestion, onDismiss, questionUpdate, type } = props;
    const t = useTranslation();
    const dispatch = useAppDispatch();
    const questionType = new Map<string, string>();
    questionType.set(Variable.SHORT_ANSWER, t('AddQuestionView.addQuestionViewComponentShortAnswer'));
    questionType.set(Variable.ONE_CHOICE_QUESTION, t('AddQuestionView.addQuestionViewComponentOneChoiceQuestion'));
    questionType.set(Variable.MULTI_CHOICE_QUESTION, t('AddQuestionView.addQuestionViewComponentMultiChoiceQuestion'));
    const defaultValidate: InputTextValidate = useMemo(() => {
        return {
            textError: t('AddQuestionView.addQuestionViewComponentTitleEmptyValidate'),
            isVisible: false,
            isError: isBlank(questionUpdate?.data.title)
        }
    }, []);

    const [titleValidate, setTitleValidate] = useState<InputTextValidate>(defaultValidate);
    const [question, setQuestion] = useState<Question>(defaultQuestion);

    useEffect(() => {
        if (!type) {
            setTitleValidate(defaultValidate);
        }
    }, [type]);


    useEffect(() => {
        if (props.questionUpdate) {
            setTitleValidate({
                textError: t('AddQuestionView.addQuestionViewComponentTitleEmptyValidate'),
                isVisible: false,
                isError: isBlank(props.questionUpdate?.data.title)
            })
            setQuestion(props.questionUpdate.data)
        }
    }, [props.questionUpdate])


    const onTitleChangeText = useCallback((value: string) => {
        if (isBlank(value)) {
            setTitleValidate({
                ...titleValidate,
                isError: true,
                textError: t('AddQuestionView.addQuestionViewComponentTitleEmptyValidate')
            })
        } else if (isContainSpecialCharacter(value)) {
            setTitleValidate({
                ...titleValidate,
                isError: true,
                textError: t('AddQuestionView.addQuestionViewComponentTitleContainsSpecialCharacterValidate')
            })
        } else if (!isLengthInRange(value, 1, 255)) {
            setTitleValidate({
                ...titleValidate,
                isError: true,
                textError: t('AddQuestionView.addQuestionViewComponentTitleOver255CharacterValidate')
            })
        } else {
            setTitleValidate({
                ...titleValidate,
                isError: false
            })
        }
        setQuestion({
            ...question,
            title: value,
        })
    }, [titleValidate]);


    const onBtnCompleteAddQuestionPress = () => {
        if (!titleValidate.isError) {
            let choices: Choice[] = [];
            if (question.choices) {
                choices = question.choices.filter(question => question.content.trim().length != 0);
                console.log((question.type !== Variable.SHORT_ANSWER && questionUpdate?.data.type !== Variable.SHORT_ANSWER) && choices.length === 0);
                if ((question.type !== Variable.SHORT_ANSWER && questionUpdate?.data.type !== Variable.SHORT_ANSWER) && choices.length === 0) {
                    Alert.alert(t('AddQuestionView.addChoiceValidateErrorTitle'), t('AddQuestionView.addChoiceValidateErrorContent'));
                    return
                }
            }
            if (questionUpdate) {
                dispatch(updateQuestion({
                    index: questionUpdate.index,
                    question: {
                        ...question,
                        choices: choices
                    }
                }))
            } else {
                onCompleteSaveQuestion({
                    ...question,
                    choices: choices
                })
            }
            onDismiss();
            setTitleValidate(defaultValidate);
            setQuestion(defaultQuestion);
        } else if (titleValidate.isError) {
            setTitleValidate({
                ...titleValidate,
                isVisible: true
            })
        }
    }

    useEffect(() => {
        let choices: Choice[] = [];
        if (type && type.value !== Variable.SHORT_ANSWER) {
            choices = [{ content: "" }, { content: "" }, { content: "" }];
        }
        setQuestion({
            ...defaultQuestion,
            type: type?.value ?? "",
            choices: [...choices]
        })
    }, [type])

    const header = useMemo(() => {
        if (type) {
            return type.name;
        } else {
            if (questionUpdate?.data) {
                return questionType.get(questionUpdate.data.type ?? '');
            }
        }
        return ""
    }, [questionUpdate, type]);

    return (
        <View style={styles.body}>
            <Portal>
                <Modal
                    visible={Boolean(type) || Boolean(questionUpdate)}
                    onDismiss={onDismiss}
                    contentContainerStyle={styles.containerStyle}
                >
                    <View style={styles.modalHeader}>
                        <TextComponent
                            style={styles.headerTitle}
                            text={`${header}`}
                        />
                        <IconButton
                            icon='close'
                            iconColor='#ff003e'
                            rippleColor={'#fff'}
                            size={22}
                            style={styles.btnClose}
                            onPress={onDismiss}
                        />
                    </View>
                    <ScrollView style={styles.modalBody}>
                        <TextInputWithTitle
                            onFocus={() => setTitleValidate({ ...titleValidate, isVisible: true })}
                            defaultValue={questionUpdate?.data ? questionUpdate.data.title : ''}
                            placeholder={t('AddQuestionView.addQuestionViewComponentTitleInputPlaceholder')}
                            onChangeText={(value) => onTitleChangeText(value)}
                        />
                        <TextValidate
                            customStyle={{ marginLeft: 10 }}
                            textError={titleValidate.textError}
                            isError={titleValidate.isError!}
                            isVisible={titleValidate.isVisible}
                        />
                        {
                            ((type && type.value !== Variable.SHORT_ANSWER) || question.type !== Variable.SHORT_ANSWER)
                            && <AddQuestionChoice
                                onDeleteChoice={(index) => {
                                    let tempChoices = [...question.choices ?? []]
                                    tempChoices.splice(index, 1)
                                    setQuestion({
                                        ...question,
                                        choices: tempChoices
                                    })
                                }}
                                question={question}
                                onAddChoice={() => {
                                    setQuestion({
                                        ...question,
                                        choices: [...question.choices ?? [], { content: "" }]
                                    })
                                }}
                                onChoiceContentTextChange={(index, value) => {
                                    let choices = [...question.choices ?? []]
                                    choices[index] = {
                                        ...choices[index],
                                        content: value
                                    }
                                    setQuestion({
                                        ...question,
                                        choices: choices
                                    })
                                }}
                            />
                        }
                        <View style={styles.modalFooter}>
                            <ButtonFullWith
                                iconName='plus'
                                title={t('AddQuestionView.addQuestionViewComponentButtonComplete')}
                                onPress={() => onBtnCompleteAddQuestionPress()}
                            />
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>
        </View>
    )
}

export default AddQuestionModal