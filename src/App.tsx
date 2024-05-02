import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Provider} from 'react-redux';
import BottomSheetModalWrapper from './components/bottomSheet/BottomSheetModalWrapper';
import DrawerContent from './components/drawer/DrawerContent';
import ToolBar from './components/toolbars/ToolBar';
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
  FACULTY_DASHBOARD_SCREEN,
  FORGOTTEN_PASSWORD_SCREEN,
  IMAGE_VIEW_SCREEN,
  INTERMEDIATELY_SCREEN,
  JOB_APPLY_SCREEN,
  LIST_FOLLOW_SCREEN,
  LIST_JOB_APPLY_SCREEN,
  LIST_POST_SAVED_SCREEN,
  LOGIN_SCREEN,
  MESSENGER_SCREEN,
  MY_PROFILE_SCREEN,
  NOTIFICATION_SCREEN,
  OPTION_SCREEN,
  PROFILE_SCREEN,
  RECRUITMENT_DETAIL_SCREEN,
  REVIEW_SURVEY_POST_SCREEN,
  SEARCH_SCREEN,
  SPLASH_SCREEN,
  STUDENT_DISCUSSION_DASHBOARD_SCREEN,
  STUDENT_REGISTER_SCREEN,
  SURVEY_CONDUCT_SCREEN,
  SURVEY_RESULT_SCREEN,
  TOP_TAB_NAVIGATOR,
} from './constants/Screen';
import {INITIAL_SCREEN} from './constants/SystemConstant';
import {store} from './redux/Store';
import AcceptScreen from './screens/Censorship/AcceptScreen';
import ConversationScreen from './screens/Converstation/ConversationScreen';
import DetailJobApplyScreen from './screens/Details/Post/Job/DetailJobApplyScreen';
import RecruitmentDetailScreen from './screens/Details/Post/Recruitment/RecruitmentDetailScreen';
import ListFollowScreen from './screens/Follow/ListFollowScreen';
import ForgottenPasswordScreen from './screens/ForgotPass/ForgottenPasswordScreen';
import ImageViewScreen from './screens/Image/ImageViewScreen';
import IntermediationScreen from './screens/Intermediate/IntermediationScreen';
import SplashScreen from './screens/Intro/SplashScreen';
import JobApplyScreen from './screens/JobApply/JobApplyScreen';
import ListJobApplyScreen from './screens/JobApply/ListJobApplyScreen';
import LoginScreen from './screens/Login/LoginScreen';
import MessengerScreen from './screens/Messager/MessengerScreen';
import NotificationScreen from './screens/Notification/NotificationScreen';
import ApplicationOptionScreen from './screens/Options/ApplicationOptionScreen';
import OptionScreen from './screens/Options/OptionScreen';
import BusinessDashboardScreen from './screens/Post/Bussiness/BusinessDashboardScreen';
import CreateNormalPostScreen from './screens/Post/CreatePost/Normal/CreateNormalPostScreen';
import CreateRecruitmentScreen from './screens/Post/CreatePost/Recruitment/CreateRecruitmentScreen';
import CreateSurveyPostScreen from './screens/Post/CreatePost/Survey/CreateSurveyPostScreen';
import FacultyDashboardScreen from './screens/Post/Faculty/FacultyDashboardScreen';
import ListPostSavedScreen from './screens/Post/SavePost/ListPostSavedScreen';
import StudentDiscussionDashboardScreen from './screens/Post/StudentAndFaculty/StudentDiscussionDashboardScreen';
import MyProfileScreen from './screens/Profile/session/myProfile/MyProfileScreen';
import SearchScreen from './screens/Search/SearchScreen';
import BusinessRegistrationScreen from './screens/SignUp/Business/BusinessRegistrationScreen';
import StudentRegistrationScreen from './screens/SignUp/Student/StudentRegistrationScreen';
import AddQuestionScreen from './screens/Survey/AddQuestionScreen';
import ReviewSurveyPostScreen from './screens/Survey/ReviewSurveyPostScreen';
import SurveyConductScreen from './screens/Survey/SurveyConductScreen';
import SurveyResultScreen from './screens/Survey/SurveyResultScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProfileScreen from './screens/Profile/session/otherProfile/ProfileScreen';

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
  CREATE_RECRUITMENT_SCREEN: undefined;
  SPLASH_SCREEN: undefined;
  IMAGE_VIEW_SCREEN: undefined;
  LIST_FOLLOW_SCREEN: undefined;
  REVIEW_SURVEY_POST_SCREEN: undefined;
  ADD_QUESTION_SCREEN: undefined;
  CREATE_NORMAL_POST_SCREEN: undefined;
  SURVEY_CONDUCT_SCREEN: {surveyPostId: number};
  RECRUITMENT_DETAIL_SCREEN: {postId: number};
  JOB_APPLY_SCREEN: undefined;
  DETAIL_JOB_APPLY: undefined;
  PROFILE_SCREEN: undefined;
  LIST_POST_SAVED_SCREEN: undefined;
  OPTION_SCREEN: undefined;
  SURVEY_RESULT_SCREEN: undefined;
  APPLICATION_OPTION_SCREEN: undefined;
  INTERMEDIATELY_SCREEN: undefined;
  CREATE_SURVEY_SCREEN: undefined;
  LIST_JOB_APPLY_SCREEN: undefined;
  FORGOTTEN_PASSWORD_SCREEN: undefined;
  ACCEPT_SCREEN: undefined;
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
    style={{marginStart: 5}}
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
          drawerItemStyle: {display: 'none'},
        }}
        component={StackNavigator}
      />
    </Drawer.Navigator>
  );
}

export function StackNavigator(): JSX.Element {
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
        options={{header: () => false}}
        component={RecruitmentDetailScreen}
      />

      <RootStack.Screen
        name={TOP_TAB_NAVIGATOR}
        options={{header: () => <ToolBar />}}
        component={TopTabNavigator}
      />
      <RootStack.Screen
        name={SEARCH_SCREEN}
        options={{header: () => false}}
        component={SearchScreen}
      />
      <RootStack.Screen
        name={CONVERSATION_SCREEN}
        options={{header: () => false}}
        component={ConversationScreen}
      />
      <RootStack.Screen
        name={MESSENGER_SCREEN}
        options={{header: () => false}}
        component={MessengerScreen}
      />

      <RootStack.Screen
        name={LOGIN_SCREEN}
        options={{header: () => null}}
        component={LoginScreen}
      />

      <RootStack.Screen
        name={STUDENT_REGISTER_SCREEN}
        options={{header: () => null}}
        component={StudentRegistrationScreen}
      />
      <RootStack.Screen
        name={BUSINESS_REGISTER_SCREEN}
        options={{header: () => null}}
        component={BusinessRegistrationScreen}
      />
      <RootStack.Screen
        name={INTERMEDIATELY_SCREEN}
        options={{header: () => null}}
        component={IntermediationScreen}
      />
      <RootStack.Screen
        name={CREATE_RECRUITMENT_SCREEN}
        options={{header: () => false}}
        component={CreateRecruitmentScreen}
      />
      <RootStack.Screen
        name={CREATE_SURVEY_SCREEN}
        options={{header: () => false}}
        component={CreateSurveyPostScreen}
      />
      <RootStack.Screen
        name={IMAGE_VIEW_SCREEN}
        options={{header: () => null}}
        component={ImageViewScreen}
      />

      <RootStack.Screen
        name={ADD_QUESTION_SCREEN}
        options={{header: () => false}}
        component={AddQuestionScreen}
      />

      <RootStack.Screen
        name={REVIEW_SURVEY_POST_SCREEN}
        options={{header: () => false}}
        component={ReviewSurveyPostScreen}
      />

      <RootStack.Screen
        name={SURVEY_CONDUCT_SCREEN}
        options={{header: () => false}}
        component={SurveyConductScreen}
      />

      <RootStack.Screen
        name={JOB_APPLY_SCREEN}
        options={{header: () => false}}
        component={JobApplyScreen}
      />

      <RootStack.Screen
        name={LIST_POST_SAVED_SCREEN}
        options={{header: () => false}}
        component={ListPostSavedScreen}
      />

      <RootStack.Screen
        name={CREATE_NORMAL_POST_SCREEN}
        options={{header: () => null}}
        component={CreateNormalPostScreen}
      />

      <RootStack.Screen
        name={LIST_JOB_APPLY_SCREEN}
        options={{header: () => false}}
        component={ListJobApplyScreen}
      />

      <RootStack.Screen
        name={LIST_FOLLOW_SCREEN}
        options={{header: () => false}}
        component={ListFollowScreen}
      />

      <RootStack.Screen
        name={PROFILE_SCREEN}
        options={{header: () => false}}
        component={ProfileScreen}
      />

      <RootStack.Screen
        name={DETAIL_JOB_APPLY}
        options={{header: () => false}}
        component={DetailJobApplyScreen}
      />

      <RootStack.Screen
        name={OPTION_SCREEN}
        options={{header: () => false}}
        component={OptionScreen}
      />

      <RootStack.Screen
        name={SPLASH_SCREEN}
        options={{header: () => null}}
        component={SplashScreen}
      />

      <RootStack.Screen
        name={SURVEY_RESULT_SCREEN}
        options={{header: () => false}}
        component={SurveyResultScreen}
      />

      <RootStack.Screen
        name={APPLICATION_OPTION_SCREEN}
        options={{header: () => false}}
        component={ApplicationOptionScreen}
      />

      <RootStack.Screen
        name={FORGOTTEN_PASSWORD_SCREEN}
        options={{header: () => false}}
        component={ForgottenPasswordScreen}
      />
      <RootStack.Screen
        name={ACCEPT_SCREEN}
        options={{header: () => false}}
        component={AcceptScreen}
      />
    </RootStack.Navigator>
  );
}

function TopTabNavigator(): JSX.Element {
  return (
    <TopTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
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
  return (
    <GestureHandlerRootView>
      <MenuProvider>
        <Provider store={store}>
          <BottomSheetModalWrapper>
            <PaperProvider>
              <NavigationContainer>
                <DrawerNavigator />
              </NavigationContainer>
            </PaperProvider>
          </BottomSheetModalWrapper>
        </Provider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
};

export default App;
