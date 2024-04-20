import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {SERVER_ADDRESS} from '../constants/SystemConstant';

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({baseUrl: SERVER_ADDRESS}),
  tagTypes: [''],
  endpoints: builder => ({}),
});

export const {} = TDCSocialNetworkAPI;
