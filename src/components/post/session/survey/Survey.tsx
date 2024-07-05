import React from 'react';
import {useTranslation} from 'react-multi-lang';
import {View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../../../../constants/Colors';
import ButtonComponent from '../../../buttons/ButtonComponent';
import TextComponent from '../../../text/TextComponent';
import Content from '../content/Content';
import styles from './Survey.style';

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
    t,
    active,
    description,
    id,
    onClickBtnSeeDetailEvent,
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
