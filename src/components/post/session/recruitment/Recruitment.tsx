import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './Recruitment.style';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../../../../constants/Colors';
import { numberDayPassed } from '../../../../utils/FormatTimeUtils';
import { formatCurrency } from '../../../../utils/FormatCurrencyUtils';
import TextComponent from '../../../text/TextComponent';
import ButtonComponent from '../../../buttons/ButtonComponent';

interface Props {
  id: number;
  createdAt: string;
  location: string;
  title: string;
  salary: string;
  employmentType: string;
  current?: string;
  textButton?: string;
  onClickBtnSeeDetailEvent: (id: number) => void;
}

const Recruitment = (props: Props) => {
  const {
    createdAt,
    employmentType,
    id,
    location,
    onClickBtnSeeDetailEvent,
    salary,
    title,
    current,
    textButton,
  } = props;
  return (
    <View style={styles.containerContentRecruitment}>
      <View style={styles.leftContainer} />
      <View style={styles.rightContainer}>
        <View style={styles.rightContainerBottom}>
          <TextComponent
            marginBottom={2}
            suffix={
              <FontAwesome6Icon
                name="map-location-dot"
                size={20}
                color={Colors.GREY1}
              />
            }
            style={styles.address}
            text={`\xa0${location}`}
          />
          <TextComponent
            marginBottom={2}
            color={Colors.COLOR_GREY}
            text={title}
          />
          <TextComponent
            marginBottom={2}
            suffix={
              <AntDesignIcon
                name="clockcircleo"
                size={20}
                color={Colors.GREY1}
              />
            }
            style={styles.address}
            text={numberDayPassed(createdAt)}
          />
          <View style={styles.rightContainerBottom3Info}>
            <TextComponent
              style={styles.rowAndCenter}
              suffix={
                <FontAwesome6Icon
                  name="money-bill-1"
                  size={20}
                  color={Colors.GREY1}
                />
              }
              text={`\xa0${formatCurrency(parseInt(salary), 'VND')} ${current}`}
            />
            <TextComponent
              style={styles.rowAndCenter}
              suffix={
                <FontAwesome6Icon
                  name="bag-shopping"
                  size={20}
                  color={Colors.GREY1}
                />
              }
              text={`\xa0${employmentType}`}
            />
          </View>
        </View>
        <ButtonComponent
          widthAutoFollowContent={true}
          style={[styles.bottomButton]}
          onPress={() => onClickBtnSeeDetailEvent(id)}
          suffix={
            <FeatherIcon
              style={styles.iconArrow}
              name="chevrons-right"
              size={20}
              color={Colors.WHITE}
            />
          }
          title={<TextComponent color={Colors.WHITE} text={`${textButton}`} />}
        />
      </View>
    </View>
  );
};

export default Recruitment;
