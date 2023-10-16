import { IMeta, IUsers } from "@/types";
import { tagTypes } from "../tagTypes/tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all admin
    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${USER_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUsers[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    user: build.query({
      query: (email: string | string[] | undefined) => ({
        url: `/all-users/${email}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.admin],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.email}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUserById: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/update/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateSuperAdmin: build.mutation({
      query: (data) => ({
        url: `/all-users/${data.email}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  useUpdateUserMutation,
  useUpdateSuperAdminMutation,
  useUpdateUserByIdMutation,
  useDeleteUserMutation,
} = userApi;
