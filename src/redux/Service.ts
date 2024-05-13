import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SERVER_ADDRESS} from '../constants/SystemConstant';
import {Data} from '../types/Data';
import {Post} from '../types/Post';
import {SavePostRequest} from '../types/request/SavePostRequest';
import {StudentRequest} from '../types/request/StudentRequest';
import {MessageResponseData} from '../types/response/MessageResponseData ';
import {NotificationModel} from '../types/response/NotificationModel ';

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({baseUrl: SERVER_ADDRESS, timeout: 10000}),
  tagTypes: [''],
  endpoints: builder => ({
    addStudent: builder.mutation<MessageResponseData, StudentRequest>({
      query: data => ({
        url: 'api/student/register',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    changeUserToInactiveState: builder.mutation<
      MessageResponseData,
      {id: number}
    >({
      query: data => ({
        url: 'api/users/status/inactive',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getBusinessPost: builder.query<Data<Post[]>, {id: number}>({
      query: data => ({
        url: `api/posts/search?group=group_connect_business&userLogin=${data.id}`,
        method: 'GET',
      }),
    }),
    getFacultyPost: builder.query<Data<Post[]>, {faculty: string; id: number}>({
      query: data => ({
        url: `api/posts/search?faculty=${data.faculty}&userLogin=${data.id}&group=none`,
        method: 'GET',
      }),
    }),
    getStudentPost: builder.query<Data<Post[]>, {id: number}>({
      query: data => ({
        url: `api/posts/search?group=group_tdc&userLogin=${data.id}`,
        method: 'GET',
      }),
    }),
    getNotificationsUser: builder.query<
      Data<NotificationModel[]>,
      {id: number}
    >({
      query: data => ({
        url: 'api/notifications/user',
        method: 'POST',
        body: data,
      }),
    }),
    getPostsById: builder.query<
      Data<any>,
      {userId: number; groupCode: string; userLogin: number}
    >({
      query: data => ({
        url: `api/posts/group/user/detail`,
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deletePost: builder.mutation<Data<any>, number>({
      query: postId => ({
        url: `api/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
    saveOrUnSavePost: builder.mutation<Data<any>, SavePostRequest>({
      query: data => ({
        url: `api/posts/user/save`,
        method: 'POST',
        body: data,
      }),
    }),
    markAsReadNotifications: builder.mutation<Data<any>, {userId: number}>({
      query: data => ({
        url: `api/notifications/changeStatus/all`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteNotification: builder.mutation<
      Data<any>,
      {id: number; userId: number}
    >({
      query: data => ({
        url: `api/notifications/`,
        method: 'DELETE',
        body: data,
      }),
    }),
    changeStatusNotification: builder.mutation<
      Data<any>,
      {id: number; userId: number}
    >({
      query: data => ({
        url: 'api/notifications/changeStatus',
        method: 'PUT',
        body: data,
      }),
    }),
    changeStatusNotificationMakeNotSee: builder.mutation<
      Data<any>,
      {id: number; userId: number}
    >({
      query: data => ({
        url: 'api/notifications/changeStatus/makeNotSeen',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useChangeUserToInactiveStateMutation,
  useGetBusinessPostQuery,
  useGetFacultyPostQuery,
  useGetStudentPostQuery,
  useGetNotificationsUserQuery,
  useGetPostsByIdQuery,
  useDeletePostMutation,
  useSaveOrUnSavePostMutation,
  useMarkAsReadNotificationsMutation,
  useDeleteNotificationMutation,
  useChangeStatusNotificationMutation,
  useChangeStatusNotificationMakeNotSeeMutation,
} = TDCSocialNetworkAPI;
