import {configureStore} from '@reduxjs/toolkit';
import {TDCSocialNetworkSlice} from './Slice';
import {TDCSocialNetworkAPI} from './Service';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    TDCSocialNetworkReducer: TDCSocialNetworkSlice.reducer,
    [TDCSocialNetworkAPI.reducerPath]: TDCSocialNetworkAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
