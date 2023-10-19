import { IMeta, IUserReview } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const USER_REVIEW_URL = "/user-review";
export const userReviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUserReview: build.mutation({
      query: (userReviewData) => ({
        url: `${USER_REVIEW_URL}`,
        method: "POST",
        data: userReviewData,
      }),
      invalidatesTags: [tagTypes.userReview],
    }),
    allUserReview: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${USER_REVIEW_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUserReview[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.userReview],
    }),
    updateUserReview: build.mutation({
      query: (data) => ({
        url: `${USER_REVIEW_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.userReview],
    }),
    userReviewById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_REVIEW_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service, tagTypes.userReview],
    }),
    publishReview: build.query({
      query: () => ({
        url: `${USER_REVIEW_URL}/publish`,
        method: "GET",
      }),
      providesTags: [tagTypes.service, tagTypes.userReview],
    }),
  }),
});

export const {
  useCreateUserReviewMutation,
  useAllUserReviewQuery,
  useUpdateUserReviewMutation,
  useUserReviewByIdQuery,
  usePublishReviewQuery,
} = userReviewApi;
