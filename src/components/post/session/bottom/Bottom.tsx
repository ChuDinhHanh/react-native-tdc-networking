import React, {memo, useMemo} from 'react';
import {Image, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../../constants/Colors';
import {Variable} from '../../../../constants/Variables';
import {Like} from '../../../../types/Like';
import ButtonComponent from '../../../buttons/ButtonComponent';
import DefaultAvatar from '../../../common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../../row/RowComponent';
import TextComponent from '../../../text/TextComponent';
import styles from './Bottom.style';

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
    const userLikedQty = likes.length;
    return likes
      .slice(0, userLikedQty > 3 ? 3 : userLikedQty)
      .map((item, index) => (
        <>
          {item.image ? (
            <Image
              key={item.id}
              style={[styles.avatarUserReacted, {marginLeft: -10}]}
              source={{uri: item.image}}
            />
          ) : (
            <DefaultAvatar
              key={item.id}
              size={30}
              identifer={item.name[0]}
              marginLeft={-10}
            />
          )}
          {userLikedQty > 3 && index === 2 && (
            <DefaultAvatar
              key={likes[3].id}
              size={30}
              identifer={`+${userLikedQty - 3}`}
              marginLeft={-10}
            />
          )}
        </>
      ));
  }, [likes]);

  return (
    <RowComponent
      justifyContent="space-between"
      alignItems="center"
      marginVertical={15}>
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
    </RowComponent>
  );
};

export default memo(Bottom);
