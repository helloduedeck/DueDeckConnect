import {api} from './api-client';

export const servicesApi = api.injectEndpoints({
  endpoints: builder => ({
    newTaskRequest: builder.mutation({
      query: data => ({
        url: 'createTaskRequest',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    getAssignedServices: builder.mutation({
      query: () => ({
        url: 'getAssigned',
        method: 'GET',
      }),
    }),
    getInProgressServices: builder.mutation({
      query: () => ({
        url: 'getInProgress',
        method: 'GET',
      }),
    }),
    getOnHoldServices: builder.mutation({
      query: () => ({
        url: 'getOnHold',
        method: 'GET',
      }),
    }),
    getCompletedServices: builder.mutation({
      query: () => ({
        url: 'getCompleted',
        method: 'GET',
      }),
    }),
    getSingleTask: builder.mutation({
      query: ({id}) => ({
        url: `singleTask/${id}`, //203196  //${id}
        method: 'POST',
      }),
    }),
    sendMessage: builder.mutation({
      query: data => ({
        url: 'sendMessage',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    addDocument: builder.mutation({
      query: data => ({
        url: 'addMore',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    getComments: builder.mutation({
      query: data => ({
        url: `getComments`,
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useNewTaskRequestMutation,
  useGetAssignedServicesMutation,
  useGetInProgressServicesMutation,
  useGetCompletedServicesMutation,
  useGetOnHoldServicesMutation,
  useGetSingleTaskMutation,
  useSendMessageMutation,
  useGetCommentsMutation,
} = servicesApi;
