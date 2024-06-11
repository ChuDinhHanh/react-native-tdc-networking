import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SERVER_ADDRESS} from '../constants/SystemConstant';
import {Data} from '../types/Data';
import {Post} from '../types/Post';
import {SavePostRequest} from '../types/request/SavePostRequest';
import {StudentRequest} from '../types/request/StudentRequest';
import {MessageResponseData} from '../types/response/MessageResponseData ';
import {NotificationModel} from '../types/response/NotificationModel ';
import {JobApplyRequest} from '../types/request/JobApplyRequest';
import {JobApplyUpdateRequest} from '../types/request/JobApplyUpdateRequest';
import {JobUpdateStatus} from '../types/request/JobUpdateStatus';
import {FollowRequest} from '../types/request/FollowRequest';
import {LikeActionRequest} from '../types/request/LikeActionRequest';
import {DetailRecruitmentRequest} from '../types/request/DetailRecruitmentRequest';
import {ChangeStatusNotificationRequest} from '../types/request/ChangeStatusNotificationRequest';
import {DeleteNotificationRequest} from '../types/request/DeleteNotificationRequest';
import {DeletePostRequest} from '../types/request/DeletePostRequest';
import {GetPostRequest} from '../types/request/GetPostRequest';
import {GetNotificationsUserRequest} from '../types/request/GetNotificationsUserRequest';
import {GetStudentPostRequest} from '../types/request/GetStudentPostRequest';
import {GetFacultyPostRequest} from '../types/request/GetFacultyPostRequest';
import {GetBusinessPostRequest} from '../types/request/GetBusinessPostRequest';
import {ChangeUserToInactiveStateRequest} from '../types/request/ChangeUserToInactiveStateRequest';

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
      ChangeUserToInactiveStateRequest
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
    getBusinessPost: builder.query<Data<Post[]>, GetBusinessPostRequest>({
      query: data => ({
        url: `api/posts/search?group=group_connect_business&userLogin=${data.id}`,
        method: 'GET',
      }),
    }),
    getFacultyPost: builder.query<Data<Post[]>, GetFacultyPostRequest>({
      query: data => ({
        url: `api/posts/search?faculty=${data.faculty}&userLogin=${data.id}&group=none`,
        method: 'GET',
      }),
    }),
    getStudentPost: builder.query<Data<Post[]>, GetStudentPostRequest>({
      query: data => ({
        url: `api/posts/search?group=group_tdc&userLogin=${data.id}`,
        method: 'GET',
      }),
    }),
    getNotificationsUser: builder.query<
      Data<NotificationModel[]>,
      GetNotificationsUserRequest
    >({
      query: data => ({
        url: 'api/notifications/user',
        method: 'POST',
        body: data,
      }),
    }),
    getPostsById: builder.query<Data<any>, GetPostRequest>({
      query: data => ({
        url: `api/posts/group/user/detail`,
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deletePost: builder.mutation<Data<any>, DeletePostRequest>({
      query: data => ({
        url: `api/posts/${data.postId}`,
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
    deleteNotification: builder.mutation<Data<any>, DeleteNotificationRequest>({
      query: data => ({
        url: `api/notifications/`,
        method: 'DELETE',
        body: data,
      }),
    }),
    changeStatusNotification: builder.mutation<
      Data<any>,
      ChangeStatusNotificationRequest
    >({
      query: data => ({
        url: 'api/notifications/changeStatus',
        method: 'PUT',
        body: data,
      }),
    }),
    changeStatusNotificationMakeNotSee: builder.mutation<
      Data<any>,
      ChangeStatusNotificationRequest
    >({
      query: data => ({
        url: 'api/notifications/changeStatus/makeNotSeen',
        method: 'PUT',
        body: data,
      }),
    }),
    getDetailRecruitment: builder.query<Data<any>, DetailRecruitmentRequest>({
      query: data => ({
        url: `api/posts/recruitment?postId=${data.postId}&&userLogin=${data.userLogin}`,
        method: 'GET',
      }),
    }),
    jobApply: builder.mutation<MessageResponseData, JobApplyRequest>({
      query: data => ({
        url: 'api/job/apply',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    jobApplyUpdate: builder.mutation<
      MessageResponseData,
      JobApplyUpdateRequest | JobUpdateStatus
    >({
      query: data => ({
        url: 'api/job/update',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    like: builder.mutation<Data<any>, LikeActionRequest>({
      query: data => ({
        url: 'api/posts/like',
        method: 'POST',
        body: data,
      }),
    }),
    follow: builder.mutation<Data<any>, FollowRequest>({
      query: data => ({
        url: 'api/users/follow',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getFaculty: builder.query<Data<any>, void>({
      query: () => ({
        url: `api/faculty`,
        method: 'GET',
      }),
    }),
    uploadImageBackground: builder.mutation<Data<any>, {data: any}>({
      query: data => ({
        url: 'api/users/change/image',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
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
  useGetDetailRecruitmentQuery,
  useJobApplyMutation,
  useJobApplyUpdateMutation,
  useLikeMutation,
  useFollowMutation,
  useGetFacultyQuery,
  useUploadImageBackgroundMutation,
} = TDCSocialNetworkAPI;
