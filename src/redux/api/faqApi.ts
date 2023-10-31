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
    createfaq: build.mutation({
      query: (faqData) => ({
        url: `${FAQ_URL}`,
        method: "POST",
        data: faqData,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    deletefaq: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    faqById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),
    updateFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useFaqsQuery,
  useCreatefaqMutation,
  useDeletefaqMutation,
  useFaqByIdQuery,
  useUpdateFaqMutation,
} = faqApi;
