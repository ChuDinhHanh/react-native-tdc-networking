import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';
import {Student} from '../types/Student';
import {Faculty} from '../types/Faculty';
import {Business} from '../types/Business';
import {ModalComments} from '../types/ModalComments ';
import {ModalLike} from '../types/ModalLike';

export interface TDCSocialNetworkState {
  userLogin: User | null;
  openBottomSheet: boolean;
  modalCommentData: ModalComments | null;
  modalLikeData: ModalLike | null;
  openModalLike: boolean;
}

const initialState: TDCSocialNetworkState = {
  userLogin: null,
  openBottomSheet: false,
  modalCommentData: null,
  modalLikeData: null,
  openModalLike: false,
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
} = TDCSocialNetworkSlice.actions;
export default TDCSocialNetworkSlice.reducer;
