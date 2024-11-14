import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEDN_URL } from "../../configs/constanst";
import {
  ContentBodyRequest,
  GetContentResponse,
  UpdateContentResponse,
} from "../../types/apis/content";

export const PostApiSlice = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEDN_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token && token !== "") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getPosts: builder.query<GetContentResponse[], string>({
        query: (post_type) => `/posts/?post_type=${post_type}`,
      }),
      patchPost: builder.mutation<UpdateContentResponse, ContentBodyRequest>({
        query: ({ id, data }) => ({
          url: "/posts/",
          params: { id: id },
          method: "PATCH",
          body: data,
        }),
      }),
      deletePost: builder.mutation<void, number>({
        query: (id) => ({
          url: "/posts/",
          params: { id: id },
          method: "Delete",
        }),
      }),
      postPost: builder.mutation<UpdateContentResponse, ContentBodyRequest>({
        query: ({ data }) => ({
          url: "/posts",
          method: "POST",
          body: data,
        }),
      }),
    };
  },
});

export const {
  usePostPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  usePatchPostMutation,
} = PostApiSlice;
