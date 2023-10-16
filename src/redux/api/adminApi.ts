import { IMeta, IUsers } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admin";
export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all admin
    admins: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${ADMIN_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUsers[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data.email}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    updateAdminById: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/update/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    admin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAdminsQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminByIdMutation,
  useAdminQuery,
} = adminApi;
