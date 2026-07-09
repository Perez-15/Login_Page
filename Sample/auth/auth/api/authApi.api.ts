import { apiSlice } from '@/app/api/apiSlice';
import { AUTH_ENDPOINTS } from './authEndpoints.const';
import {
    IAfterLoginResponse,
    IFirstLoginResponse,
    IForgotPasswordResponse,
    ILoginResponse,
    IMFACheckResponse,
    IResetPasswordResponse,
    IVerificationSelectionResponse,
    IVerifyOtpForgotPasswordResponse
} from '@/features/auth/types/authTypes.type';
import {
    IFirstLoginPayload,
    IForgotPasswordEmailPayload,
    IForgotPasswordMobilePayload,
    ILoginPayload,
    IMFACheckPayload,
    IResetPasswordPayload,
    IVerificationSelectionPayload,
    IVerifyOtpForgotPasswordPayload
} from '@/features/auth/types/authTypes.type';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginPayload>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.login,
                method: 'POST',
                body
            })
        }),
        verificationSelection: builder.mutation<IVerificationSelectionResponse, IVerificationSelectionPayload>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.verificationSelection,
                method: 'POST',
                body
            })
        }),
        otpVerification: builder.mutation<IMFACheckResponse, IMFACheckPayload>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.otpVerification,
                method: 'POST',
                body
            })
        }),
        newPassword: builder.mutation<IFirstLoginResponse, IFirstLoginPayload>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.firstLogin,
                method: 'POST',
                body
            })
        }),
        forgotPassword: builder.mutation<IForgotPasswordResponse, IForgotPasswordMobilePayload | IForgotPasswordEmailPayload | null>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.forgotPassword,
                method: 'POST',
                body
            })
        }),
        verifyOtpForgotPassword: builder.mutation<IVerifyOtpForgotPasswordResponse, IVerifyOtpForgotPasswordPayload>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.verifyOtpForgotPassword,
                method: 'POST',
                body
            })
        }),
        resetPassword: builder.mutation<IResetPasswordResponse, IResetPasswordPayload>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.changePassword,
                method: 'POST',
                body
            })
        }),
        afterLogin: builder.query<IAfterLoginResponse, void>({
            query: () => ({
                url: AUTH_ENDPOINTS.afterLogin,
                method: 'GET'
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: AUTH_ENDPOINTS.logout,
                method: 'POST'
            })
        })
    })
});

export const {
    useLoginMutation,
    useVerificationSelectionMutation,
    useOtpVerificationMutation,
    useNewPasswordMutation,
    useForgotPasswordMutation,
    useVerifyOtpForgotPasswordMutation,
    useResetPasswordMutation,
    useLogoutMutation,
    useAfterLoginQuery,
    useLazyAfterLoginQuery
} = authApiSlice;
