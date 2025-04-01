import {api} from './api-client';

export const dashboardApi = api.injectEndpoints({
  endpoints: builder => ({
    dashboard: builder.mutation({
      query: () => ({
        url: 'getDashboarddata',
        method: 'GET',
      }),
    }),
    subHeader: builder.mutation({
      query: data => ({
        url: 'subHeader',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    saveSubHeader: builder.mutation({
      query: data => ({
        url: 'saveSubHeader',
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
  useDashboardMutation,
  useSubHeaderMutation,
  useSaveSubHeaderMutation,
} = dashboardApi;
