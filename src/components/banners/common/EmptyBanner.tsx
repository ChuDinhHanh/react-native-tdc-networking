import {View, Text, ImageSourcePropType} from 'react-native';
import React, {ReactNode} from 'react';
import {Image} from 'react-native';
import {Colors} from '../../../constants/Colors';
import TextComponent from '../../text/TextComponent';

interface Props {
  content: string;
  icon: ImageSourcePropType;
}
const EmptyBanner = (props: Props) => {
  const {content, icon} = props;
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={icon} />
      <TextComponent
        fontWeight="bold"
        fontSize={18}
        color={Colors.BLACK}
        text={content}
      />
    </View>
  );
};

export default EmptyBanner;
