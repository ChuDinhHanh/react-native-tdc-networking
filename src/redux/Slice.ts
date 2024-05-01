import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types/User';
import {Student} from '../types/Student';
import {Faculty} from '../types/Faculty';
import {Business} from '../types/Business';
import {ModalComments} from '../types/ModalComments ';

export interface TDCSocialNetworkState {
  userLogin: User | null;
  openBottomSheet: boolean;
  modalCommentData: ModalComments | null;
}

const initialState: TDCSocialNetworkState = {
  userLogin: null,
  openBottomSheet: false,
  modalCommentData: null,
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
  },
  extraReducers: builder => {},
});
export const {
  setUserLogin,
  setUserLogout,
  setHiddenBottomSheet,
  setShowBottomSheet,
} = TDCSocialNetworkSlice.actions;
export default TDCSocialNetworkSlice.reducer;
