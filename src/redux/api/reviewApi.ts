import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/review";
export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (reviewData) => ({
        url: `${REVIEW_URL}`,
        method: "POST",
        data: reviewData,
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;
