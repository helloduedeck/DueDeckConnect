import {api} from './api-client';

export const noticeApi = api.injectEndpoints({
  endpoints: builder => ({
    pendingNotices: builder.mutation({
      query: (data: any) => ({
        url: 'pendingNotices',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    completedNotices: builder.mutation({
      query: data => ({
        url: 'completedNotice',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    cancelledNotices: builder.mutation({
      query: data => ({
        url: 'cancelledNotices',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    inprogressdNotices: builder.mutation({
      query: data => ({
        url: 'inprogressNotices',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    getSingleNotice: builder.mutation({
      query: (id: any) => ({
        url: `singleNotice/${id}`,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  usePendingNoticesMutation,
  useCompletedNoticesMutation,
  useCancelledNoticesMutation,
  useInprogressdNoticesMutation,
  useGetSingleNoticeMutation,
} = noticeApi;
