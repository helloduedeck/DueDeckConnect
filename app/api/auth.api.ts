import {api} from './api-client';

export const JSON_HEADER = {'Content-Type': 'application/json'};

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    token: builder.mutation({
      query: ({email, password}: {email: string; password: string}) => ({
        url: 'token',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    requestOtp: builder.mutation({
      query: ({email, contact_no}) => ({
        url: 'requestOtp',
        method: 'POST',
        body: {
          email,
          contact_no,
        },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({otp}) => ({
        url: 'verifyOtp',
        method: 'POST',
        body: {
          otp,
        },
      }),
    }),
    updateForgotPassword: builder.mutation({
      query: ({newpassword, confirmpassword, email, otp, contact_no}) => ({
        url: 'updateForgotPassword',
        method: 'POST',
        body: {
          newpassword,
          confirmpassword,
          email,
          otp,
          contact_no,
        },
        headers: JSON_HEADER,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({email, confirmpassword, newpassword, currentpassword}) => ({
        url: 'changePassword',
        method: 'POST',
        body: {
          email,
          confirmpassword,
          newpassword,
          currentpassword,
        },
        headers: JSON_HEADER,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useTokenMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useUpdateForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
