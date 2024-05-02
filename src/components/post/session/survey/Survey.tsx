import {View, Text} from 'react-native';
import React from 'react';
import styles from './Survey.style';
import Content from '../content/Content';
import {useTranslation} from 'react-multi-lang';
import {TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TextComponent from '../../../text/TextComponent';
import ButtonComponent from '../../../buttons/ButtonComponent';
import {Colors} from '../../../../constants/Colors';

interface Props {
  t: ReturnType<typeof useTranslation>;
  id: number;
  textButton: string;
  title: string;
  description: string;
  active: number;
  textSeeDetailSurvey: string;
  textJoinSurvey: string;
  onClickBtnSeeDetailEvent: (id: number) => void;
}

const Survey = (props: Props) => {
  const {
    active,
    description,
    id,
    onClickBtnSeeDetailEvent,
    t,
    textButton,
    textJoinSurvey,
    textSeeDetailSurvey,
    title,
  } = props;
  return (
    <View style={styles.container}>
      <TextComponent text={title} style={styles.title} />
      <Content content={description} t={t} />
      <ButtonComponent
        style={styles.bottomButton}
        widthAutoFollowContent={true}
        onPress={() => onClickBtnSeeDetailEvent(props.id)}
        suffix={
          <FeatherIcon name="chevrons-right" size={20} color={Colors.WHITE} />
        }
        title={
          <TextComponent
            color={Colors.WHITE}
            text={active === 1 ? textJoinSurvey : textSeeDetailSurvey}
          />
        }
      />
    </View>
  );
};

export default Survey;
