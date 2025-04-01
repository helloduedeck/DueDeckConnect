import {api} from './api-client';

export const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    updateUserProfile: builder.mutation({
      query: data => ({
        url: 'updateProfile',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useUpdateUserProfileMutation} = profileApi;
