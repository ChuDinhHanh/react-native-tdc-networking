import {configureStore} from '@reduxjs/toolkit';
import {TDCSocialNetworkSlice} from './Slice';
import {setupListeners} from '@reduxjs/toolkit/query';
import {TDCSocialNetworkAPI} from './Service';

export const store = configureStore({
  reducer: {
    TDCSocialNetworkReducer: TDCSocialNetworkSlice.reducer,
    [TDCSocialNetworkAPI.reducerPath]: TDCSocialNetworkAPI.reducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware(), dung de enable cac tinh nang nhu caching, polling, invalidation cua rtk-query.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      TDCSocialNetworkAPI.middleware,
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
