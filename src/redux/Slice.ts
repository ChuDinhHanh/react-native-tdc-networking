import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';
import {Student} from '../types/Student';
import {Faculty} from '../types/Faculty';
import {Business} from '../types/Business';
import {ModalComments} from '../types/ModalComments ';
import {ModalLike} from '../types/ModalLike';
import {SurveyPostRequest} from '../types/request/SurveyPostRequest';
import {stat} from 'react-native-fs';
import {Question} from '../types/Question';

export interface TDCSocialNetworkState {
  userLogin: User | null;
  openBottomSheet: boolean;
  modalCommentData: ModalComments | null;
  modalLikeData: ModalLike | null;
  openModalLike: boolean;
  userIdOfProfileScreen: number;
  isNavigateToSame: {flag: boolean; result: boolean};
  timeoutId: any;
  surveyPostRequest: SurveyPostRequest | null;
}

const initialState: TDCSocialNetworkState = {
  userLogin: null,
  openBottomSheet: false,
  modalCommentData: null,
  modalLikeData: null,
  openModalLike: false,
  userIdOfProfileScreen: 0,
  timeoutId: null,
  isNavigateToSame: {
    flag: false,
    result: false,
  },
  surveyPostRequest: null,
};

export const TDCSocialNetworkSlice = createSlice({
  name: 'TDCSocialNetwork',
  initialState,
  reducers: {
    setUserLogin: (
      state,
      action: PayloadAction<Student | Faculty | Business>,
    ) => {
      state.userLogin = action.payload;
    },
    setUserLogout: state => {
      state.userLogin = null;
    },
    setShowBottomSheet: (state, action: PayloadAction<ModalComments>) => {
      state.openBottomSheet = true;
      state.modalCommentData = action.payload;
    },
    setHiddenBottomSheet: state => {
      state.modalCommentData = null;
      state.openBottomSheet = false;
    },
    setShowModalLike: (state, action: PayloadAction<ModalLike>) => {
      state.openModalLike = true;
      state.modalLikeData = action.payload;
    },
    setHiddenModalLike: state => {
      state.modalLikeData = null;
      state.openModalLike = false;
    },
    setUserIdOfProfileScreen: (state, action: PayloadAction<number>) => {
      state.userIdOfProfileScreen = action.payload;
    },
    setNavigateToProfileSameUser: (state, action: PayloadAction<number>) => {
      if (state.userIdOfProfileScreen === action.payload) {
        //Switch state of flag
        state.isNavigateToSame.flag = !state.isNavigateToSame.flag;
        state.isNavigateToSame.result = true;
      }
    },
    setSurveyPostRequest: (
      state,
      action: PayloadAction<SurveyPostRequest | null>,
    ) => {
      state.surveyPostRequest = action.payload;
    },
    updateSurveyTitle: (state, action: PayloadAction<string>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.title = action.payload;
      }
    },
    updateSurveyDescription: (state, action: PayloadAction<string>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.description = action.payload;
      }
    },
    updateQuestion: (
      state,
      action: PayloadAction<{index: number; question: Question}>,
    ) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions[action.payload.index] =
          action.payload.question;
      }
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions = [
          ...state.surveyPostRequest.questions,
          action.payload,
        ];
      }
    },
    deleteQuestion: (state, action: PayloadAction<number | undefined>) => {
      if (state.surveyPostRequest && action.payload !== undefined) {
        state.surveyPostRequest.questions.splice(action.payload, 1);
      }
    },
    setSurveyPostUpdated: (
      state,
      action: PayloadAction<SurveyPostRequest | null>,
    ) => {
      state.surveyPostRequest = action.payload;
    },
  },
  extraReducers: builder => {},
});
export const {
  setUserLogin,
  setUserLogout,
  setHiddenBottomSheet,
  setShowBottomSheet,
  setHiddenModalLike,
  setShowModalLike,
  setUserIdOfProfileScreen,
  setNavigateToProfileSameUser,
  setSurveyPostRequest,
  updateSurveyDescription,
  updateSurveyTitle,
  updateQuestion,
  addQuestion,
  deleteQuestion,
  setSurveyPostUpdated,
} = TDCSocialNetworkSlice.actions;
export default TDCSocialNetworkSlice.reducer;
