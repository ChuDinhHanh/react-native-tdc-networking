import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {appInfo} from '../../../constants/Infos';
import Divider from '../../common/divider/Divider';
import CommentsItemComponent from '../../items/commentItem/CommentsItemComponent';
import Loading from '../../loading/Loading';
import RowComponent from '../../row/RowComponent';
import SpaceComponent from '../../space/SpaceComponent';
import TextComponent from '../../text/TextComponent';
import styles from './PrintfCommentComponent.style';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
setTranslations({vi, jp, en});
setDefaultLanguage('vi');

interface Props {
  comments: any;
  onDeleteEvent: (postId: number) => void;
  onReplyEvent: (postId: number, name: string) => void;
  isFather?: boolean | undefined;
}

interface Comment {
  id: number;
  parent: number | null;
  childrens?: Comment[];
}

const PrintfCommentComponent = React.memo((props: Props) => {
  const {comments, onDeleteEvent, onReplyEvent} = props;
  const [showData, setShowData] = useState(false);
  const memoizedComments = useMemo(() => comments, [comments]);

  useEffect(() => {
    setTimeout(() => {
      setShowData(true);
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      {showData ? (
        <PrintfFatherCommentComponent
          comments={memoizedComments}
          onDeleteEvent={onDeleteEvent}
          onReplyEvent={onReplyEvent}
        />
      ) : (
        <View style={{marginTop: appInfo.sizes.HEIGHT * 0.3}}>
          <Loading
            colorActivityIndicator={Colors.COLOR_BLUE_BANNER}
            sizeActivityIndicator={30}
          />
        </View>
      )}
    </React.Fragment>
  );
});

const PrintfFatherCommentComponent = React.memo((props: Props) => {
  const {comments, onDeleteEvent, onReplyEvent} = props;
  const memoizedComments = useMemo(() => comments, [comments]);

  const renderCommentItem = useCallback(
    ({item}: {item: Comment}) => {
      if (!item.parent) {
        return (
          <React.Fragment key={item.id}>
            <CommentsItemComponent
              onDeleteEvent={onDeleteEvent}
              onReplyEvent={onReplyEvent}
              item={item}
              type={1}
            />
            {item.childrens && item.childrens.length !== 0 && (
              <PrintfChildrenCommentComponent
                comments={item.childrens}
                onDeleteEvent={onDeleteEvent}
                onReplyEvent={onReplyEvent}
              />
            )}
          </React.Fragment>
        );
      }
      return null;
    },
    [onDeleteEvent, onReplyEvent],
  );

  return (
    <FlatList
      extraData={props.comments}
      scrollEnabled={false}
      data={memoizedComments}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.wrapperChildrenComment}
      renderItem={renderCommentItem}
    />
  );
});

const PrintfChildrenCommentComponent = React.memo((props: Props) => {
  const t = useTranslation();
  const {comments, onDeleteEvent, onReplyEvent, isFather} = props;
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const memoizedComments = useMemo(() => comments, [comments]);
  const totalOfScreen = useMemo(() => {
    return memoizedComments.length;
  }, [memoizedComments]);

  return (
    <>
      <RowComponent
        alignItems="center"
        onPress={() => {
          setSeeMore(!seeMore);
          !seeMore && setLoading(true);
        }}
        justifyContent={undefined}>
        <View style={styles.wrapperLeft} />
        <View style={styles.wrapperRight}>
          <RowComponent
            marginLeft={props.isFather ? 0 : 32}
            alignItems="center"
            justifyContent="flex-start">
            {loading ? (
              <TextComponent
                fontSize={10}
                color={Colors.COLOR_BTN_BLUE_PRIMARY}
                text={t('InputComment.loadingText')}
              />
            ) : (
              <>
                <Divider width={30} backgroundColor={Colors.BLACK} />
                <SpaceComponent width={5} />
                <TextComponent
                  fontSize={10}
                  color={Colors.BLACK}
                  text={
                    !seeMore ? `Xem ${totalOfScreen} câu trả lời` : 'Ẩn bớt'
                  }
                />
              </>
            )}
          </RowComponent>
        </View>
      </RowComponent>
      {seeMore && (
        <FlatList
          onViewableItemsChanged={() => {
            setLoading(false);
          }}
          extraData={props.comments}
          scrollEnabled={false}
          data={memoizedComments}
          renderItem={({item}) => (
            <React.Fragment key={item.id}>
              <CommentsItemComponent
                item={item}
                type={2}
                onDeleteEvent={onDeleteEvent}
                onReplyEvent={onReplyEvent}
              />
              {item.childrens && item.childrens.length !== 0 && (
                <PrintfChildrenCommentComponent
                  comments={item.childrens}
                  onDeleteEvent={onDeleteEvent}
                  onReplyEvent={onReplyEvent}
                />
              )}
            </React.Fragment>
          )}
        />
      )}
    </>
  );
});

export default memo(PrintfCommentComponent);
