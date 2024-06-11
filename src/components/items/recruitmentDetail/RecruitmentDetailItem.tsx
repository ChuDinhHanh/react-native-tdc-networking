import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {Colors} from '../../../constants/Colors';
import TextComponent from '../../text/TextComponent';
import styles from './RecruitmentDetailItem.style';

interface Props {
  title: string;
  content: string;
  icon: ReactNode;
}

const RecruitmentDetailItem = (props: Props) => {
  const {title, icon, content} = props;
  return (
    <View style={styles.item}>
      <TextComponent
        color={Colors.BLACK}
        fontWeight="bold"
        fontSize={16}
        text={title}
      />
      <View style={styles.iconRecruitment}>
        {icon}
        <TextComponent
          color={Colors.BLACK}
          style={styles.margin}
          text={content}
        />
      </View>
    </View>
  );
};

export default RecruitmentDetailItem;
