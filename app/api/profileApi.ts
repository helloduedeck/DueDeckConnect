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
    updateProfilePic: builder.mutation({
      query: data => {
        // console.log('Update Profile Pic Data:', data); // Log data
        return {
          url: 'updateProfile',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
   
    }),
    refreshUserProfile: builder.mutation({
      query: () => ({
        url: 'userprofile',
        method: 'GET',
      }),
    }),

    deleteProfilePic: builder.mutation({
      query: (data: any) => ({
        url: `deleteProfile`,
        method: 'POST',
        body: getFormBody(data),
      }),
    }),
    updateUserPermission: builder.mutation({
      query: data => ({
        url: 'updateUserPermission',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    }),
  }),
  overrideExisting: true,
});
const getFormBody = (body: string) =>
  Object.keys(body)
    .map(key => encodeURIComponent(key)
 + '=' + encodeURIComponent(body[key]))
    .join('&');

export const {useUpdateUserProfileMutation,
  useRefreshUserProfileMutation,
  useUpdateUserPermissionMutation,
  useUpdateProfilePicMutation,
  useDeleteProfilePicMutation,
} = profileApi;
