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
  }),
});

export const { useCreateBookMutation } = bookingApi;
