import {MutableRefObject, useState} from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import {Alert, Keyboard, Text, TextInput, View} from 'react-native';
import {Divider} from 'react-native-paper';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../constants/Colors';
import {Variable} from '../../../constants/Variables';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import {useAppSelector} from '../../../redux/Hook';
import {isLengthInRange, isNotBlank} from '../../../utils/ValidateUtils';
import ButtonComponent from '../../buttons/ButtonComponent';
import DefaultAvatar from '../../common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../row/RowComponent';
import SessionComponent from '../../session/SessionComponent';
import TextComponent from '../../text/TextComponent';
import styles from './InputCommentModal.style';
setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface Props {
  userReply: string;
  inputRef: MutableRefObject<TextInput | null>;
  onCreateNewComment: (val: string) => void;
  onCancelReply: () => void;
}

const InputCommentModal = (props: Props) => {
  const t = useTranslation();
  const {onCreateNewComment, inputRef, userReply, onCancelReply} = props;
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
  );
  const [comment, setComment] = useState<string>('');
  const handleSendComment = () => {
    if (
      isNotBlank(comment.trim()) &&
      isLengthInRange(
        comment,
        Variable.NUMBER_MIN_CHARACTER,
        Variable.NUMBER_MAX_CHARACTER,
      )
    ) {
      Keyboard.dismiss();
      onCreateNewComment(comment);
      setComment('');
    } else {
      Alert.alert(
        `⚠️ ${t('InputComment.warningText')}`,
        `${t('InputComment.requiredTextWarning')}`,
        [{text: `${t('InputComment.continueText')}`}],
      );
    }
  };

  const handleCancelReplyClickEvent = () => {
    Alert.alert(
      `⚠️ ${t('InputComment.requestText')}`,
      `${t('InputComment.contentRequestText')}`,
      [
        {
          text: `${t('InputComment.continueText')}`,
          onPress: onCancelReply,
        },
        {
          text: `${t('InputComment.returnText')}`,
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={[styles.wrapper, {bottom: 0}]}>
      <Divider />
      <SessionComponent>
        {Boolean(userReply) && (
          <RowComponent marginVertical={8}>
            <View style={styles.wrapperUserTag}>
              <Text style={styles.textUserTagTitle}>
                {t('InputComment.respondingText')}{' '}
                <Text style={styles.textUserNameTag}>{userReply}</Text>
              </Text>
            </View>
            <ButtonComponent
              onPress={handleCancelReplyClickEvent}
              title={
                <TextComponent
                  fontWeight="bold"
                  color={Colors.BLACK}
                  fontSize={10}
                  text={t('InputComment.cancelText')}
                />
              }
            />
          </RowComponent>
        )}
        <RowComponent justifyContent="center" alignItems="center">
          <View style={styles.wrapperAvatar}>
            <DefaultAvatar size={38} identifer={userLogin?.name[0]} />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              value={comment}
              onChangeText={val => setComment(val)}
              placeholder={
                Boolean(userReply)
                  ? ''
                  : t('CreateCommentToolbar.commentPlaceholderInput')
              }
              placeholderTextColor="grey"
              style={styles.textInput}
            />
            <View style={styles.wrapperButton}>
              <ButtonComponent
                isDisable={false}
                onPress={handleSendComment}
                suffix={
                  <IconIonicons
                    name="arrow-up-circle"
                    size={35}
                    color={Colors.COLOR_BLUE_BANNER}
                  />
                }
              />
            </View>
          </View>
        </RowComponent>
      </SessionComponent>
    </View>
  );
};

export default InputCommentModal;
