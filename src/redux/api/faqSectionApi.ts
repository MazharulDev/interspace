import { IMeta, ISectionFaq, IUserReview } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const FAQ_URL = "/faq-section";
export const faqSectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFaq: build.mutation({
      query: (userReviewData) => ({
        url: `${FAQ_URL}`,
        method: "POST",
        data: userReviewData,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    allSectionFaq: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${FAQ_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISectionFaq[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
  }),
});

export const { useCreateFaqMutation, useAllSectionFaqQuery } = faqSectionApi;
