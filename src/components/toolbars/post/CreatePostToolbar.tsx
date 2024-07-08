import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo, useState } from 'react';
import {
  setDefaultLanguage,
  setTranslations,
  useTranslation,
} from 'react-multi-lang';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../../App';
import { Colors } from '../../../constants/Colors';
import {
  BUSINESS_DASHBOARD_SCREEN,
  CREATE_NORMAL_POST_SCREEN,
  CREATE_RECRUITMENT_SCREEN,
  CREATE_SURVEY_SCREEN,
  FACULTY_DASHBOARD_SCREEN,
  MY_PROFILE_SCREEN,
} from '../../../constants/Screen';
import { SERVER_ADDRESS } from '../../../constants/SystemConstant';
import { Variable } from '../../../constants/Variables';
import en from '../../../languages/en.json';
import jp from '../../../languages/jp.json';
import vi from '../../../languages/vi.json';
import { globalStyles } from '../../../styles/GlobalStyles';
import ButtonComponent from '../../buttons/ButtonComponent';
import DefaultAvatar from '../../common/defaultAvatar/DefaultAvatar';
import RowComponent from '../../row/RowComponent';
import SessionComponent from '../../session/SessionComponent';
import TextComponent from '../../text/TextComponent';
import styles from './CreatePostToolbar.style';
import { Group } from '../../../constants/Group';

setTranslations({ vi, jp, en });
setDefaultLanguage('vi');

interface Props {
  role: string;
  image: string | null;
  name: string;
  screens: string;
}

const CreatePostToolbar = (props: Props) => {
  const { image, name, role, screens } = props;
  const navigationTopTab =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [typeChoose, setTypeChoose] = useState(Variable.TYPE_NORMAL_POST);
  const t = useTranslation();

  const handleClickChooseTypePost = (typePost: string) => {
    setTypeChoose(typePost);
  };

  const handleClickCreatePostEvent = () => {
    const groupId = identifyGroupId();
    if (typeChoose === Variable.TYPE_NORMAL_POST) {
      navigation.navigate(CREATE_NORMAL_POST_SCREEN, { group: groupId });
    } else if (typeChoose === Variable.TYPE_RECRUITMENT_POST) {
      navigation.navigate(CREATE_RECRUITMENT_SCREEN, { groupId: Group.GROUP_CONNECT_BUSINESS_ID });
    } else {
      navigation.navigate(CREATE_SURVEY_SCREEN, { groupId: Group.GROUP_CONNECT_BUSINESS_ID });
    }
  };

  const identifyGroupId = () => {
    let groupId = -1;
    if (screens === BUSINESS_DASHBOARD_SCREEN) {
      groupId = Group.GROUP_CONNECT_BUSINESS_ID;
    } else if (screens === FACULTY_DASHBOARD_SCREEN) {
      groupId = Group.GROUP_FACULTY_ID;
    } else {
      groupId = Group.GROUP_TDC_ID;
    }
    return groupId;
  }

  return (
    <View style={[styles.container, globalStyles.shadow]}>
      <RowComponent marginVertical={10}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => navigationTopTab.navigate(MY_PROFILE_SCREEN)}>
            {Boolean(props.image) ? (
              <Image
                style={styles.avatar}
                source={{ uri: SERVER_ADDRESS + `api/images/${props.image}` }}
              />
            ) : (
              <DefaultAvatar identifer={props.name[0]} size={40} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={handleClickCreatePostEvent}
            style={styles.wrapInput}>
            <Text style={styles.txtInput}>
              {t('CreatePostSelector.createPostSelectorPlaceHolder')}
            </Text>
          </TouchableOpacity>
        </View>
      </RowComponent>
      <Divider bold />
      <SessionComponent
        paddingVertical={0}
      >
        <RowComponent
          flexWrap='wrap'
          justifyContent="flex-start"
          alignItems="center"
        >
          <ButtonComponent
            style={[
              typeChoose == Variable.TYPE_SURVEY_POST
                ? styles.activeButton
                : styles.unActiveButton,
              styles.button,
            ]}
            affix={
              <FontAwesome5Icon
                name="poll"
                size={20}
                color={
                  typeChoose == Variable.TYPE_SURVEY_POST
                    ? Colors.WHITE
                    : Colors.GREY1
                }
              />
            }
            onPress={() => handleClickChooseTypePost(Variable.TYPE_SURVEY_POST)}
            title={
              <TextComponent
                fontSize={12}
                style={
                  typeChoose == Variable.TYPE_SURVEY_POST
                    ? styles.txtButtonChooseTypePostActive
                    : styles.txtButtonChooseTypePostUnActive
                }
                text={t('CreatePostSelector.createPostSelectorSurveyText')}
              />
            }
          />
          {!(
            props.role === Variable.TYPE_POST_STUDENT ||
            props.role === Variable.TYPE_POST_FACULTY
          ) && (
              <ButtonComponent
                style={[
                  typeChoose == Variable.TYPE_RECRUITMENT_POST
                    ? styles.activeButton
                    : styles.unActiveButton,
                  styles.button,
                ]}
                affix={
                  <FontAwesome5Icon
                    name="shopping-bag"
                    size={20}
                    color={
                      typeChoose == Variable.TYPE_RECRUITMENT_POST
                        ? Colors.WHITE
                        : Colors.GREY1
                    }
                  />
                }
                onPress={() =>
                  handleClickChooseTypePost(Variable.TYPE_RECRUITMENT_POST)
                }
                title={
                  <TextComponent
                    fontSize={12}
                    style={
                      typeChoose == Variable.TYPE_RECRUITMENT_POST
                        ? styles.txtButtonChooseTypePostActive
                        : styles.txtButtonChooseTypePostUnActive
                    }
                    text={t(
                      'CreatePostSelector.createPostSelectorRecruitmentText',
                    )}
                  />
                }
              />
            )}

          <ButtonComponent
            style={[
              typeChoose == Variable.TYPE_NORMAL_POST
                ? styles.activeButton
                : styles.unActiveButton,
              styles.button,
            ]}
            affix={
              <IconIonicons
                name="create"
                size={20}
                color={
                  typeChoose == Variable.TYPE_NORMAL_POST
                    ? Colors.WHITE
                    : Colors.GREY1
                }
              />
            }
            onPress={() => handleClickChooseTypePost(Variable.TYPE_NORMAL_POST)}
            title={
              <TextComponent
                fontSize={12}
                style={
                  typeChoose == Variable.TYPE_NORMAL_POST
                    ? styles.txtButtonChooseTypePostActive
                    : styles.txtButtonChooseTypePostUnActive
                }
                text={t('CreatePostSelector.createPostSelectorNormalText')}
              />
            }
          />
        </RowComponent>
      </SessionComponent>
    </View>
  );
};

export default memo(CreatePostToolbar);
