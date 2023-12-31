import { IMeta, ISectionFaq, IService } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/service";
export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all services
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${SERVICE_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    allServices: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${SERVICE_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    serviceSearch: build.query({
      query: (data: string | string[] | undefined) => ({
        url: `${SERVICE_URL}?searchTerm=${data}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    createService: build.mutation({
      query: (serviceData) => ({
        url: `${SERVICE_URL}`,
        method: "POST",
        data: serviceData,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    serviceById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service, tagTypes.review],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useServicesQuery,
  useCreateServiceMutation,
  useServiceByIdQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useServiceSearchQuery,
  useAllServicesQuery,
} = serviceApi;
