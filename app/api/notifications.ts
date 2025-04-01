import {api} from './api-client';

export const notificationsApi = api.injectEndpoints({
  endpoints: builder => ({
    notifications: builder.mutation({
      query: () => ({
        url: 'getNotifications',
        method: 'GET',
      }),
    }),
    subscribeNotification: builder.mutation({
      query: data => ({
        url: 'subscribeNotification',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export const {useNotificationsMutation, useSubscribeNotificationMutation} =
  notificationsApi;
