import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {shallowEqual} from 'react-redux';
import {Client, Frame} from 'stompjs';
import {Colors} from '../../constants/Colors';
import {useAppDispatch, useAppSelector} from '../../redux/Hook';
import {setHiddenBottomSheet} from '../../redux/Slice';
import {getStompClient} from '../../sockets/getStompClient';
import {Comment} from '../../types/Comment';
import ButtonComponent from '../buttons/ButtonComponent';
import InputCommentModal from '../input/InputCommentModal/InputCommentModal';
import PrintfCommentComponent from '../listviews/comments/PrintfCommentComponent';
import SessionComponent from '../session/SessionComponent';
import TextComponent from '../text/TextComponent';
import styles from './BottomSheetModalWrapper.style';

let stompClient: Client;

interface Props {
  children: ReactNode;
}

interface CreateNewCommentForm {
  postId: number;
  userId: number;
  content: string;
  parentCommentId: number;
}

interface DeleteCommentForm {
  commentId: number;
  postId: number;
  userId: number;
}

const BottomSheetModalWrapper = (props: Props) => {
  const {children} = props;
  const inputRef = useRef<TextInput>(null);
  const [replyComment, setReplyComment] = useState({postId: 0, name: ''});
  const [comments, setComments] = useState<Comment[] | []>([]);
  const userLogin = useAppSelector(
    state => state.TDCSocialNetworkReducer.userLogin,
  );
  const modalCommentData = useAppSelector(
    state => state.TDCSocialNetworkReducer.modalCommentData,
    shallowEqual,
  );
  const openBottomSheet = useAppSelector(
    state => state.TDCSocialNetworkReducer.modalCommentData,
    shallowEqual,
  );
  useEffect(() => {
    setComments(modalCommentData?.comments ?? []);
  }, [modalCommentData]);

  const dispatch = useAppDispatch();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['60%', '95%'], []);

  useEffect(() => {
    if (openBottomSheet) {
      bottomSheetModalRef.current?.present();
    } else {
      handleClickCloseBtn();
    }
  }, [openBottomSheet]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClickCloseBtn = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handleClearReplyData = () => {
    setReplyComment({
      postId: 0,
      name: '',
    });
  };

  // Add new comment
  const handleCreateNewComment = useCallback(
    (val: string) => {
      const newComment: CreateNewCommentForm = {
        postId: modalCommentData?.id ?? 0,
        userId: userLogin?.id ?? 0,
        content: val,
        parentCommentId: replyComment.postId,
      };
      // Send to server
      stompClient.send(
        `/app/posts/${modalCommentData?.id}/comments`,
        {},
        JSON.stringify(newComment),
      );
      handleClearReplyData();
    },
    [replyComment, modalCommentData],
  );

  // Reply comment
  const handleClickToCommentReplyEvent = useCallback(
    (postId: number, name: string) => {
      setReplyComment({
        postId: postId,
        name: name,
      });
      inputRef?.current && inputRef.current?.focus();
    },
    [inputRef],
  );

  // Delete comment
  const handleClickDeleteCommentEvent = useCallback(
    async (id: number) => {
      const deleteComment: DeleteCommentForm = {
        commentId: id,
        postId: modalCommentData?.id ?? 0,
        userId: userLogin?.id ?? 0,
      };
      stompClient.send(
        `/app/posts/${modalCommentData?.id}/comments/delete`,
        {},
        JSON.stringify(deleteComment),
      );
    },
    [modalCommentData],
  );

  // Socket
  useEffect(() => {
    stompClient = getStompClient();
    const onConnected = () => {
      stompClient.subscribe(
        `/topic/posts/${modalCommentData?.id}`,
        onMessageReceived,
      );
      stompClient.send(`/app/posts/${modalCommentData?.id}/comments/listen`);
    };
    const onMessageReceived = (payload: any) => {
      setComments(JSON.parse(payload.body));
    };
    const onError = (err: string | Frame) => {};
    stompClient.connect({}, onConnected, onError);
  }, [openBottomSheet]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {children}
        <BottomSheetModal
          onDismiss={() => {
            dispatch(setHiddenBottomSheet());
            handleClearReplyData();
          }}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <View>
              {/* Header */}
              <SessionComponent padding={0} marginHorizontal={16}>
                <View style={styles.wrapperHeader}>
                  <TextComponent
                    fontSize={16}
                    fontWeight="bold"
                    color={Colors.BLACK}
                    text="Bình luận"
                  />
                  <ButtonComponent
                    suffix={
                      <IconAntDesign
                        name="closecircle"
                        color={Colors.GREY1}
                        size={20}
                      />
                    }
                    onPress={handleClickCloseBtn}
                  />
                </View>
              </SessionComponent>
              <Divider />
            </View>
            {/* body */}
            <ScrollView>
              <SessionComponent>
                <PrintfCommentComponent
                  comments={comments}
                  onDeleteEvent={handleClickDeleteCommentEvent}
                  onReplyEvent={handleClickToCommentReplyEvent}
                />
              </SessionComponent>
            </ScrollView>
            {/* Input */}
            <SafeAreaView style={[styles.textInput, {bottom: '0%'}]}>
              <InputCommentModal
                onCancelReply={handleClearReplyData}
                userReply={replyComment.name}
                inputRef={inputRef}
                onCreateNewComment={handleCreateNewComment}
              />
            </SafeAreaView>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetModalWrapper;
