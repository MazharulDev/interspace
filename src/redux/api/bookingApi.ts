import { IBooking, IMeta } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/booking";
export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBook: build.mutation({
      query: (bookData) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data: bookData,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    bookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BOOKING_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    bookingByEmail: build.query({
      query: (userId: string | string[] | undefined) => ({
        url: `${BOOKING_URL}/?email=${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    singleBookingByEmail: build.query({
      query: (userId: string | undefined) => ({
        url: `${BOOKING_URL}/single/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useBookingByEmailQuery,
  useSingleBookingByEmailQuery,
} = bookingApi;
