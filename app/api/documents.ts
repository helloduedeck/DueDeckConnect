// import ReactNativeBlobUtil from 'react-native-blob-util';

import {api} from './api-client';
const DOC_URL = 'https://duedeck.eligo.co.in/public/storage/';

const URL_ENCODED_HEADER = {
  'content-type': 'application/x-www-form-urlencoded',
};

const UPLOAD_HEADER = {'Content-Type': 'multipart/form-data'};

export const appointmentApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    getPendingDocuments: builder.mutation({
      query: () => ({
        url: 'pendingDocuments',
        method: 'GET',
      }),
    }),
    //rename from getStored to storeDocuments for better understanding
    storeDocuments: builder.mutation({
      query: () => ({
        url: 'storeDocuments',
        method: 'GET',
      }),
    }),
    getOutwardDocuments: builder.mutation({
      query: () => ({
        url: 'outwordDocuments',
        method: 'GET',
      }),
    }),
    getDocumentDetails: builder.mutation({
      query: (data: any) => ({
        url: 'documentNameList',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    getAttachmentList: builder.mutation({
      query: (data: any) =>
        showAttachmentList({
          url: 'getBranches',
          method: 'POST',
          body: getFormBody(data),
          headers: URL_ENCODED_HEADER,
        }),
    }),
    addDocumentName: builder.mutation({
      query: (data: any) => ({
        url: 'addMore',
        method: 'POST',
        body: getFormBody(data),
        headers: URL_ENCODED_HEADER,
      }),
    }),
    sendMessage: builder.mutation({
      query: (data: any) => ({
        url: 'sendMessage',
        method: 'POST',
        body: getFormBody(data),
        headers: URL_ENCODED_HEADER,
      }),
    }),
    uploadDocument: builder.mutation({
      query: (data: any) => ({
        url: 'uploadDocument',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    removeDocument: builder.mutation({
      query: (data: any) => ({
        url: `removeAttachment/${data.doc_id}`,
        method: 'POST',
        body: getFormBody(data),
      }),
    }),
  }),
  overrideExisting: true,
});

const getFormBody = (body: string) =>
  Object.keys(body)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&');

// const getDownloadConfig = (path: string) => {
//   const docType = path.split('.')[path.split('.').length - 1];

//   return {
//     config: {
//       path: `${
//         ReactNativeBlobUtil.fs.dirs
//       }/Duedeck/${new Date().toISOString()}.${docType}`,
//     },
//     url: `${DOC_URL}${encodeURIComponent(path)}`,
//   };
// };

export const {
  useGetPendingDocumentsMutation,
  useStoreDocumentsMutation,
  useGetOutwardDocumentsMutation,
  useGetDocumentDetailsMutation,
  useGetAttachmentListMutation,
  useAddDocumentNameMutation,
  useSendMessageMutation,
  useUploadDocumentMutation,
  useRemoveDocumentMutation,
} = appointmentApi;
