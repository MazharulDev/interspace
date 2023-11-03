import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const PAYMENT_URL = "/payment";
export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation({
      query: (paymentData) => ({
        url: `${PAYMENT_URL}/init`,
        method: "POST",
        data: paymentData,
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    paymentByTrans: build.query({
      query: (transId: string | string[] | undefined | null) => ({
        url: `${PAYMENT_URL}/${transId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    userPayments: build.query({
      query: (email: string) => {
        return {
          url: `${PAYMENT_URL}/payments/${email}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  usePaymentByTransQuery,
  useUserPaymentsQuery,
} = paymentApi;
