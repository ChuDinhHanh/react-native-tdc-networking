import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Alert, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Provider } from 'react-redux';
import BottomSheetModalWrapper from './components/bottomSheet/BottomSheetModalWrapper';
import DrawerContent from './components/drawer/DrawerContent';
import ModalLike from './components/modals/Like/ModalLike';
import ToolBar from './components/toolbars/ToolBar';
import ToolbarWithBackPress from './components/toolbars/ToolbarWithBackPress';
import { Colors } from './constants/Colors';
import {
  ACCEPT_SCREEN,
  ADD_QUESTION_SCREEN,
  APPLICATION_OPTION_SCREEN,
  BUSINESS_DASHBOARD_SCREEN,
  BUSINESS_REGISTER_SCREEN,
  CONVERSATION_SCREEN,
  CREATE_NORMAL_POST_SCREEN,
  CREATE_RECRUITMENT_SCREEN,
  CREATE_SURVEY_SCREEN,
  DETAIL_JOB_APPLY,
  DETAIL_POST_SCREEN,
  FACULTY_DASHBOARD_SCREEN,
  FORGOTTEN_PASSWORD_SCREEN,
  IMAGE_VIEW_SCREEN,
  INTERMEDIATELY_SCREEN,
  JOB_APPLY_SCREEN,
  LIST_FOLLOW_SCREEN,
  LIST_JOB_APPLY_SCREEN,
  LOGIN_SCREEN,
  MESSENGER_SCREEN,
  MY_PROFILE_SCREEN,
  NOTIFICATION_SCREEN,
  OPTION_SCREEN,
  PROFILE_SCREEN,
  RECRUITMENT_DETAIL_SCREEN,
  REVIEW_SURVEY_POST_SCREEN,
  SAVED_POST_SCREEN,
  SEARCH_SCREEN,
  SPLASH_SCREEN,
  STUDENT_DISCUSSION_DASHBOARD_SCREEN,
  STUDENT_REGISTER_SCREEN,
  SURVEY_CONDUCT_SCREEN,
  SURVEY_RESULT_SCREEN,
  TOP_TAB_NAVIGATOR,
  UPDATE_PROFILE,
} from './constants/Screen';
import { INITIAL_SCREEN } from './constants/SystemConstant';
import { store } from './redux/Store';
import AcceptScreen from './screens/Censorship/AcceptScreen';
import ConversationScreen from './screens/Converstation/ConversationScreen';
import DetailJobApplyScreen from './screens/Details/Post/Job/DetailJobApplyScreen';
import DetailPost from './screens/Details/Post/Normal/DetailPost';
import RecruitmentDetailScreen from './screens/Details/Post/Recruitment/RecruitmentDetailScreen';
import ListFollowScreen from './screens/Follow/common/ListFollowScreen';
import ForgottenPasswordScreen from './screens/ForgotPass/ForgottenPasswordScreen';
import ImageViewScreen from './screens/Image/ImageViewScreen';
import IntermediationScreen from './screens/Intermediate/IntermediationScreen';
import SplashScreen from './screens/Intro/SplashScreen';
import JobApplyScreen from './screens/JobApply/jobApplyScreen/JobApplyScreen';
import ListJobApplyScreen from './screens/JobApply/ListJobApplyScreen';
import LoginScreen from './screens/Login/LoginScreen';
import MessengerScreen from './screens/Messager/MessengerScreen';
import NotificationScreen from './screens/Notification/NotificationScreen';
import ApplicationOptionScreen from './screens/Options/ApplicationOptionScreen';
import OptionScreen from './screens/Options/OptionScreen';
import BusinessDashboardScreen from './screens/Post/bussiness/BusinessDashboardScreen';
import CreateNormalPostScreen from './screens/Post/CreatePost/Normal/CreateNormalPostScreen';
import CreateRecruitmentScreen from './screens/Post/CreatePost/Recruitment/CreateRecruitmentScreen';
import CreateSurveyPostScreen from './screens/Post/CreatePost/Survey/CreateSurveyPostScreen';
import FacultyDashboardScreen from './screens/Post/faculty/FacultyDashboardScreen';
import SavedPostScreen from './screens/Post/savePost/SavedPostScreen';
import StudentDiscussionDashboardScreen from './screens/Post/studentAndFaculty/StudentDiscussionDashboardScreen';
import MyProfileScreen from './screens/Profile/session/myProfile/MyProfileScreen';
import ProfileScreen from './screens/Profile/session/otherProfile/ProfileScreen';
import UpdateProfileScreen from './screens/Profile/update/UpdateProfileScreen';
import SearchScreen from './screens/Search/SearchScreen';
import BusinessRegistrationScreen from './screens/SignUp/Business/BusinessRegistrationScreen';
import StudentRegistrationScreen from './screens/SignUp/Student/StudentRegistrationScreen';
import AddQuestionScreen from './screens/Survey/addQuestion/AddQuestionScreen';
import ReviewSurveyPostScreen from './screens/Survey/reviewSurveyPost/ReviewSurveyPostScreen';
import SurveyConductScreen from './screens/Survey/surveyConduct/SurveyConductScreen';
import { UpdateProfile } from './types/screens/UpdateProfile';
import { UpdateNormalPost } from './types/UpdateNormalPost';
import { SurveyPostRequest } from './types/request/SurveyPostRequest';
import SurveyResultScreen from './screens/Survey/surveyResult/SurveyResultScreen';

export type RootStackParamList = {
  CONVERSATION_SCREEN: undefined;
  BUSINESS_DASHBOARD_SCREEN: undefined;
  FACULTY_DASHBOARD_SCREEN: undefined;
  STUDENT_DISCUSSION_DASHBOARD_SCREEN: undefined;
  NOTIFICATION_SCREEN: undefined;
  FOLLOWING_SCREEN: undefined;
  MESSENGER_SCREEN: undefined;
  SEARCH_SCREEN: undefined;
  ACTIVE_CONVERSATION_TAB: undefined;
  ALL_CONVERSATION_TAB: undefined;
  LOGIN_SCREEN: undefined;
  STUDENT_REGISTER_SCREEN: undefined;
  BUSINESS_REGISTER_SCREEN: undefined;
  TOP_TAB_NAVIGATOR: undefined;
  DRAWER_TAB_NAVIGATOR: undefined;
  CREATE_RECRUITMENT_SCREEN: { groupId: number };
  SPLASH_SCREEN: undefined;
  IMAGE_VIEW_SCREEN: undefined;
  LIST_FOLLOW_SCREEN: undefined;
  REVIEW_SURVEY_POST_SCREEN: undefined;
  ADD_QUESTION_SCREEN: undefined;
  CREATE_NORMAL_POST_SCREEN: { group?: number; updateNormalPost?: UpdateNormalPost };
  SURVEY_CONDUCT_SCREEN: { surveyPostId: number };
  RECRUITMENT_DETAIL_SCREEN: { postId: number };
  JOB_APPLY_SCREEN:
  | { recruitmentPostId?: number; profileId?: number; cvUrl?: string }
  | undefined;
  DETAIL_JOB_APPLY: { cvId: number } | undefined;
  PROFILE_SCREEN: { userId: number; group: string } | undefined;
  LIST_POST_SAVED_SCREEN: undefined;
  OPTION_SCREEN: UpdateProfile;
  SURVEY_RESULT_SCREEN: { surveyPostId: number };
  APPLICATION_OPTION_SCREEN: undefined;
  INTERMEDIATELY_SCREEN: undefined;
  CREATE_SURVEY_SCREEN: { surveyPostId?: number; groupId: number; surveyPostRequest?: SurveyPostRequest }
  | undefined;
  LIST_JOB_APPLY_SCREEN: { postId: number };
  FORGOTTEN_PASSWORD_SCREEN: undefined;
  ACCEPT_SCREEN: undefined;
  DETAIL_POST_SCREEN: { post: any; notificationType: string } | undefined;
  UPDATE_PROFILE: UpdateProfile;
  SAVED_POST_SCREEN: undefined;
};

const TopTab = createMaterialTopTabNavigator();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

interface DrawerLabel {
  color: string;
  focused: boolean;
  label: string;
}

interface DrawIcon {
  focused: boolean;
  icon: string;
}

const customDrawerLabel = (props: DrawerLabel) => {
  <Text
    style={{
      fontSize: 14,
      color: props.focused ? '#0088ff' : '#000',
      fontWeight: props.focused ? 'bold' : 'normal',
    }}>
    {props.label}
  </Text>;
};

const customDrawIcon = (props: DrawIcon) => {
  <Icon
    style={{ marginStart: 5 }}
    color={props.focused ? '#0088ff' : '#757575'}
    name={props.icon}
    size={16}
  />;
};

export function DrawerNavigator(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        header: () => null,
      }}>
      <Drawer.Screen
        name="TodoApp"
        options={{
          title: 'Todo App',
          drawerType: 'back',
          drawerItemStyle: { display: 'none' },
        }}
        component={StackNavigator}
      />
    </Drawer.Navigator>
  );
}

export function StackNavigator(): JSX.Element {
  const t = useTranslation();
  return (
    <RootStack.Navigator
      initialRouteName={INITIAL_SCREEN}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#0088ff',
        },
      }}>
      <RootStack.Screen
        name={RECRUITMENT_DETAIL_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress title={t('ToolbarTitle.detailPost')} />
          ),
        }}
        component={RecruitmentDetailScreen}
      />

      <RootStack.Screen
        name={TOP_TAB_NAVIGATOR}
        options={{ header: () => <ToolBar /> }}
        component={TopTabNavigator}
      />
      <RootStack.Screen
        name={SEARCH_SCREEN}
        options={{ header: () => false }}
        component={SearchScreen}
      />
      <RootStack.Screen
        name={CONVERSATION_SCREEN}
        options={{ header: () => false }}
        component={ConversationScreen}
      />
      <RootStack.Screen
        name={MESSENGER_SCREEN}
        options={{ header: () => false }}
        component={MessengerScreen}
      />

      <RootStack.Screen
        name={LOGIN_SCREEN}
        options={{ header: () => null }}
        component={LoginScreen}
      />

      <RootStack.Screen
        name={STUDENT_REGISTER_SCREEN}
        options={{ header: () => null }}
        component={StudentRegistrationScreen}
      />
      <RootStack.Screen
        name={BUSINESS_REGISTER_SCREEN}
        options={{ header: () => null }}
        component={BusinessRegistrationScreen}
      />
      <RootStack.Screen
        name={INTERMEDIATELY_SCREEN}
        options={{ header: () => null }}
        component={IntermediationScreen}
      />
      <RootStack.Screen
        name={CREATE_RECRUITMENT_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress title={t('ToolbarTitle.detailPost')} />
          )
        }}
        component={CreateRecruitmentScreen}
      />
      <RootStack.Screen
        name={CREATE_SURVEY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.createSurveyScreen')} /> }}
        component={CreateSurveyPostScreen}
      />
      <RootStack.Screen
        name={IMAGE_VIEW_SCREEN}
        options={{ header: () => null }}
        component={ImageViewScreen}
      />

      <RootStack.Screen
        name={ADD_QUESTION_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.addQuestionScreen')} /> }}
        component={AddQuestionScreen}
      />

      <RootStack.Screen
        name={REVIEW_SURVEY_POST_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.reviewSurveyPostScreen')} /> }}
        component={ReviewSurveyPostScreen}
      />

      <RootStack.Screen
        name={SURVEY_CONDUCT_SCREEN}
        options={{ header: () => false }}
        component={SurveyConductScreen}
      />

      <RootStack.Screen
        name={JOB_APPLY_SCREEN}
        options={{ header: () => false }}
        component={JobApplyScreen}
      />

      <RootStack.Screen
        name={SAVED_POST_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress title={t('ToolbarTitle.detailPost')} />
          ),
        }}
        component={SavedPostScreen}
      />

      <RootStack.Screen
        name={CREATE_NORMAL_POST_SCREEN}
        options={{ header: () => null }}
        component={CreateNormalPostScreen}
      />

      <RootStack.Screen
        name={LIST_JOB_APPLY_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress
              title={t('ToolbarTitle.listJobApplyScreen')}
            />
          ),
        }}
        component={ListJobApplyScreen}
      />

      <RootStack.Screen
        name={LIST_FOLLOW_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress title={t('ToolbarTitle.listFollowScreen')} />
          ),
        }}
        component={ListFollowScreen}
      />

      <RootStack.Screen
        name={PROFILE_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress title={t('ToolbarTitle.profileScreen')} />
          ),
        }}
        component={ProfileScreen}
      />

      <RootStack.Screen
        name={DETAIL_JOB_APPLY}
        options={{
          header: () => (
            <ToolbarWithBackPress title={t('ToolbarTitle.detailJobApply')} />
          ),
        }}
        component={DetailJobApplyScreen}
      />

      <RootStack.Screen
        name={OPTION_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress
              title={t('ToolbarTitle.applicationOptionScreen')}
            />
          ),
        }}
        component={OptionScreen}
      />

      <RootStack.Screen
        name={SPLASH_SCREEN}
        options={{ header: () => null }}
        component={SplashScreen}
      />

      <RootStack.Screen
        name={SURVEY_RESULT_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress
              title={t('ToolbarTitle.surveyResultScreen')}
            />
          ),
        }}
        component={SurveyResultScreen}
      />

      <RootStack.Screen
        name={APPLICATION_OPTION_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress
              title={t('ToolbarTitle.applicationOptionScreen')}
            />
          ),
        }}
        component={ApplicationOptionScreen}
      />

      <RootStack.Screen
        name={FORGOTTEN_PASSWORD_SCREEN}
        options={{
          title: t('ToolbarTitle.forgottenPasswordScreen'),
          header: () => null,
        }}
        component={ForgottenPasswordScreen}
      />
      <RootStack.Screen
        name={ACCEPT_SCREEN}
        options={{
          title: t('ToolbarTitle.acceptForgottenPasswordScreen'),
          header: () => null,
        }}
        component={AcceptScreen}
      />
      <RootStack.Screen
        name={DETAIL_POST_SCREEN}
        options={{
          header: () => (
            <ToolbarWithBackPress title={t('ToolbarTitle.detailPost')} />
          ),
        }}
        component={DetailPost}
      />
      <RootStack.Screen
        name={UPDATE_PROFILE}
        options={{
          header: () => (
            <ToolbarWithBackPress
              title={t('ToolbarTitle.createUpdateProfile')}
            />
          ),
        }}
        component={UpdateProfileScreen}
      />
    </RootStack.Navigator>
  );
}

function TopTabNavigator(): JSX.Element {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = '';
          let size = focused ? 20 : 19;
          if (route.name === BUSINESS_DASHBOARD_SCREEN) {
            iconName = 'house';
          } else if (route.name === STUDENT_DISCUSSION_DASHBOARD_SCREEN) {
            iconName = 'graduation-cap';
          } else if (route.name === FACULTY_DASHBOARD_SCREEN) {
            iconName = 'school';
          } else if (route.name === NOTIFICATION_SCREEN) {
            iconName = 'bell';
          } else if (route.name === MY_PROFILE_SCREEN) {
            iconName = 'user';
          }
          return (
            <Icon name={iconName} size={size} color={color} solid={focused} />
          );
        },
        tabBarActiveTintColor: '#0065FF',
        tabBarInactiveTintColor: '#808080',
        tabBarShowLabel: false,
      })}>
      <TopTab.Screen
        name={BUSINESS_DASHBOARD_SCREEN}
        component={BusinessDashboardScreen}
      />
      <TopTab.Screen
        name={FACULTY_DASHBOARD_SCREEN}
        component={FacultyDashboardScreen}
      />
      <TopTab.Screen
        name={STUDENT_DISCUSSION_DASHBOARD_SCREEN}
        component={StudentDiscussionDashboardScreen}
      />
      <TopTab.Screen
        name={NOTIFICATION_SCREEN}
        component={NotificationScreen}
      />
      <TopTab.Screen name={MY_PROFILE_SCREEN} component={MyProfileScreen} />
    </TopTab.Navigator>
  );
}

const App = () => {
  const internetState: NetInfoState = useNetInfo();
  useEffect(() => {
    if (internetState.isConnected === false) {
      Alert.alert(
        'No Internet! ❌',
        'Sorry, we need an Internet connection for MY_APP to run correctly.',
        [{ text: 'Okay' }],
      );
    }
  }, [internetState.isConnected]);
  return (
    <GestureHandlerRootView>
      <StatusBar
        animated={true}
        backgroundColor={Colors.WHITE}
        barStyle="dark-content"
      />
      <MenuProvider>
        <Provider store={store}>
          <PaperProvider>
            <NavigationContainer>
              <ModalLike>
                <BottomSheetModalWrapper>
                  <DrawerNavigator />
                </BottomSheetModalWrapper>
              </ModalLike>
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
};

export default App;
