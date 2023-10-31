import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const FAQ_URL = "/section-faq";
export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    faqs: build.query({
      query: () => {
        return {
          url: `${FAQ_URL}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.faq],
    }),
  }),
});

export const { useFaqsQuery } = faqApi;
