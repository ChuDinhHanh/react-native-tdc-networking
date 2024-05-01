import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../../constants/Colors';
import {Like} from '../../../../types/Like';
import ButtonComponent from '../../../buttons/ButtonComponent';
import RowComponent from '../../../row/RowComponent';
import TextComponent from '../../../text/TextComponent';
import styles from './Bottom.style';
import {Variable} from '../../../../constants/Variables';

interface Props {
  onClickBottomBtnEvent: (a: number | null) => void;
  isLike: boolean;
  likes: Like[];
  commentQty: number;
  textLikeBy: string;
}

const Bottom = (props: Props) => {
  // Constant
  const BOTTOM_ICON_SIZE = 30;

  const {commentQty, isLike, likes, onClickBottomBtnEvent, textLikeBy} = props;

  const formatLikeQty: string = useMemo(() => {
    return likes?.length > 1000
      ? likes?.length / 1000 + 'k'
      : likes?.length + '';
  }, [likes]);

  const printfUserHadLiked = useMemo(() => {
    return <Text>123</Text>;
  }, [likes]);

  return (
    <View style={styles.wrapBottom}>
      <RowComponent justifyContent="space-between" alignItems="center">
        <ButtonComponent
          spacePrevious={3}
          title={<TextComponent fontSize={15} text={formatLikeQty} />}
          onPress={() => onClickBottomBtnEvent(Variable.LIKE_ACTION)}
          affix={
            <IconAntDesign
              name={isLike ? 'like1' : 'like2'}
              size={BOTTOM_ICON_SIZE}
              color={Colors.BLACK}
            />
          }
        />
      </RowComponent>
      <RowComponent justifyContent="space-between" alignItems="center">
        <ButtonComponent
          spacePrevious={3}
          title={<TextComponent fontSize={15} text={formatLikeQty} />}
          onPress={() => onClickBottomBtnEvent(Variable.COMMENT_ACTION)}
          affix={
            <IconMaterialCommunityIcons
              name="comment-outline"
              size={BOTTOM_ICON_SIZE}
              color={Colors.BLACK}
            />
          }
        />
      </RowComponent>
      <RowComponent
        onPress={() => onClickBottomBtnEvent(Variable.SHOW_LIST_USER_REACTED)}
        justifyContent="space-between"
        alignItems="center">
        {printfUserHadLiked}
      </RowComponent>
    </View>
  );
};

export default Bottom;
