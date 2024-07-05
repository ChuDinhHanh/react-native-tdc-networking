import { useState } from "react";
import { useTranslation } from "react-multi-lang";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "../../../constants/Colors";
import { Variable } from "../../../constants/Variables";
import { Choice } from "../../../types/Question";
import styles from "./ChooseQuestionBar.style";

export interface QuestionType {
    icon: string
    name: string
    value: string
}

interface ChooseQuestionBarProps {
    onQuestionTypeDropdownChange: (type: QuestionType) => void;
}

export default function ChooseQuestionBar(props: Readonly<ChooseQuestionBarProps>) {
    const t = useTranslation();

    const questionTypes: QuestionType[] = [
        {
            icon: 'file-alt',
            name: t('AddQuestionView.addQuestionViewComponentShortAnswer'),
            value: Variable.SHORT_ANSWER
        },
        {
            icon: 'check-circle',
            name: t('AddQuestionView.addQuestionViewComponentOneChoiceQuestion'),
            value: Variable.ONE_CHOICE_QUESTION
        },
        {
            icon: 'check-square',
            name: t('AddQuestionView.addQuestionViewComponentMultiChoiceQuestion'),
            value: Variable.MULTI_CHOICE_QUESTION
        },
    ]

    const [selectType, setSelectedType] = useState<QuestionType | null>(null);

    const onQuestionDropDownChange = (item: QuestionType) => {
        let choices: Choice[] = [];
        if (item.value !== Variable.SHORT_ANSWER) {
            const initialChoice: Choice = {
                content: ""
            }
            choices = [initialChoice, initialChoice, initialChoice];
        }
        props.onQuestionTypeDropdownChange(item);
    }

    const renderItem = (item: QuestionType) => {
        return (
            <View
                style={{ flexDirection: 'row', alignItems: 'center', marginStart: 10 }}
            >
                <Text style={{ margin: 5, fontSize: 16 }}>{item.name}</Text>
                <FontAwesome5Icon name={item.icon} size={16} style={{ marginStart: 'auto', marginEnd: 10 }} />
            </View>
        )
    }

    return (
        <View style={styles.body}>
            <Dropdown
                style={
                    styles.dropdown
                }
                data={questionTypes}
                search
                labelField={'name'}
                valueField={'value'}
                placeholder={t("AddQuestionView.addQuestionViewComponentQuestionTypeDropdownTitle")}
                searchPlaceholder={t("AddQuestionView.addQuestionViewComponentQuestionTypeDropdownSearch")}
                value={selectType?.value}
                onChange={(item) => onQuestionDropDownChange(item)}
                renderItem={renderItem}
            />
        </View>
    )
}