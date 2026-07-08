import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_ENDPOINTS } from "./authEndpoints";
import type { LoginResponse, LoginRequest } from "./types/authTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DEVELOPMENT_BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: AUTH_ENDPOINTS.login,
        method: "POST",
        body: { ...credentials, expiresInMins: 30 },
      }),
    }),

    getMe: builder.query<LoginResponse, void>({
      query: () => AUTH_ENDPOINTS.afterLogin,
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
