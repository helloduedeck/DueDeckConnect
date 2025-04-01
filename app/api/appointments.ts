import {api} from './api-client';

export const appointmentApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    pendingAppointments: builder.mutation({
      query: (data: any) => ({
        url: 'pendingAppointments',
        method: 'POST',
        body: {
          sortstatus: 'ASC',
          ...data,
        },
      }),
    }),
    rejectedAppointments: builder.mutation({
      query: data => ({
        url: 'rejectedAppointments',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    closedAppointments: builder.mutation({
      query: data => ({
        url: 'closedAppointments',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    sheduledAppointment: builder.mutation({
      query: () => ({
        url: 'scheduledAppointments',
        method: 'GET',
      }),
    }),
    getBranches: builder.mutation({
      query: data => ({
        url: 'getBranches',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    branchEmployees: builder.mutation({
      query: data => ({
        url: 'branchEmployees',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    rescheduleAppointment: builder.mutation({
      query: data => ({
        url: 'rescheduleAppointment',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    acceptAppointment: builder.mutation({
      query: data => ({
        url: 'acceptAppointment',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    rejectAppointment: builder.mutation({
      query: data => ({
        url: 'rejectAppointment',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    createAppointment: builder.mutation({
      query: data => ({
        url: 'createAppointment',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSheduledAppointmentMutation,
  usePendingAppointmentsMutation,
  useRejectedAppointmentsMutation,
  useClosedAppointmentsMutation,
  useCreateAppointmentMutation,
  useRejectAppointmentMutation,
  useAcceptAppointmentMutation,
  useRescheduleAppointmentMutation,
  useBranchEmployeesMutation,
  useGetBranchesMutation,
} = appointmentApi;
