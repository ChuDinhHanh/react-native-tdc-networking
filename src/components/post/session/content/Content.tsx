import ReadMore from '@fawazahmed/react-native-read-more';
import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../../constants/Colors';
import styles from './Content.style';
import {useTranslation} from 'react-multi-lang';

interface Props {
  t: ReturnType<typeof useTranslation>;
  content: string;
}
const Content = (props: Props) => {
  const {t, content} = props;
  const [expand, setExpand] = useState(false);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <ReadMore
          seeLessText={t('CommentContainer.commentContainerComponentHidden')}
          seeMoreText={t('CommentContainer.commentContainerComponentSeeMore')}
          seeLessStyle={{
            color: Colors.COLOR_BTN_BLUE_PRIMARY,
          }}
          seeMoreStyle={{
            color: Colors.COLOR_BTN_BLUE_PRIMARY,
          }}
          numberOfLines={3}
          style={styles.textStyle}>
          {content}
        </ReadMore>
      </View>
    </SafeAreaView>
  );
};

export default Content;
