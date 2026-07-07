import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials, expiresInMins: 30 },
      }),
    }),

    getMe: builder.query<LoginResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
