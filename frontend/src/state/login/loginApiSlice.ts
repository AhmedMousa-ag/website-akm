import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEDN_URL } from "../../configs/constanst";
import { LoginApiBody, LoginResponse } from "../../types/apis/login";

export const loginApiSlice = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEDN_URL,
  }),
  endpoints: (builder) => {
    return {
      postLogin: builder.mutation<LoginResponse, LoginApiBody>({
        query: (body: LoginApiBody) => ({
          url: "/login",
          method: "POST",
          body: body,
        }),
      }),
    };
  },
});

export const { usePostLoginMutation } = loginApiSlice;
