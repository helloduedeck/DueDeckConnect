import {api} from './api-client';

export const paymentApi = api.injectEndpoints({
  endpoints: builder => ({
    pendingInvoices: builder.mutation({
      query: (data: any) => ({
        url: 'pendingInvoices',
        method: 'POST',
        body: {
          sortstatus: 'ASC',
          ...data,
        },
      }),
    }),
    getReceipts: builder.mutation({
      query: data => ({
        url: 'getReceipts',
        method: 'POST',
        body: {
          sortstatus: 'ASC',
          ...data,
        },
      }),
    }),
    getDebitNote: builder.mutation({
      query: data => ({
        url: 'getDebitNote',
        method: 'POST',
        body: {
          sortstatus: 'ASC',
          ...data,
        },
      }),
    }),
    getCreditNote: builder.mutation({
      query: data => ({
        url: 'getCreditNote',
        method: 'POST',
        body: {
          sortstatus: 'ASC',
          ...data,
        },
      }),
    }),
    getPaymentDetails: builder.mutation({
      query: data => ({
        url: 'getOverdueOutstandingAmount',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    getRemainingInvoice: builder.mutation({
      query: data => ({
        url: 'selectInvoiceForPayment',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    createInvoiceDebitPayment: builder.mutation({
      query: data => ({
        url: 'invoiceDebitPayment',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    createReceipt: builder.mutation({
      query: data => ({
        url: 'createReceipt',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    getLedgerPdf: builder.mutation({
      query: ({clientId, billingFirmId, fyId}) => ({
        url: `getLedgerPDF/${clientId}/${billingFirmId}/${fyId}`,
        method: 'GET',
        responseHandler: 'content-type',
      }),
    }),
    downloadLedgerPdf: builder.mutation({
      query: ({clientId, billingFirmId, fyId}) => ({
        url: `downloadLedgerPdf/${clientId}/${billingFirmId}/${fyId}`,
        method: 'GET',
      }),
    }),
    getInvoicePdf: builder.mutation({
      query: ({id}) => ({
        url: 'getInvoicebase64',
        method: 'POST',
        body: {
          invoice_id: id,
        },
        responseHandler: 'content-type',
      }),
    }),
    getReceiptPdf: builder.mutation({
      query: ({id}) => ({
        url: 'getReceiptbase64',
        method: 'POST',
        body: {
          receipt_id: id,
        },
        responseHandler: 'content-type',
      }),
    }),
    getDebitnotePdf: builder.mutation({
      query: ({id}) => ({
        url: 'getDebitbase64',
        method: 'POST',
        body: {
          debitid: id,
        },
        responseHandler: 'content-type',
      }),
    }),
    getCreditnotePdf: builder.mutation({
      query: ({id}) => ({
        url: 'getCreditbase64',
        method: 'POST',
        body: {
          creditid: id,
        },
        responseHandler: 'content-type',
      }),
    }),
    getProformaPdf: builder.mutation({
      query: ({id}) => ({
        url: `getURLCredit/${id}`,
        method: 'GET',
        responseHandler: 'content-type',
      }),
    }),
    getInvoiceDebitnote: builder.mutation({
      query: id => ({
        url: 'invoiceDebitNote',
        method: 'POST',
        body: {
          invoice_id: id,
        },
      }),
    }),
    getInvoiceCreditnote: builder.mutation({
      query: id => ({
        url: 'invoiceCreditNote',
        method: 'POST',
        body: {
          invoice_id: id,
        },
      }),
    }),
    getInvoiceReceipt: builder.mutation({
      query: id => ({
        url: 'invoiceReceipts',
        method: 'POST',
        body: {
          invoice_id: id,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  usePendingInvoicesMutation,
  useGetReceiptsMutation,
  useGetDebitNoteMutation,
  useGetCreditNoteMutation,
  useGetLedgerPdfMutation,
  useGetDebitnotePdfMutation,
  useGetCreditnotePdfMutation,
  useGetInvoicePdfMutation,
  useGetProformaPdfMutation,
  useGetReceiptPdfMutation,
  useCreateInvoiceDebitPaymentMutation,
  useCreateReceiptMutation,
  useGetRemainingInvoiceMutation,
} = paymentApi;
