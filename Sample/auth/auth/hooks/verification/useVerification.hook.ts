import { useAppDispatch } from '@/app/hooks';
import { useOtpVerificationMutation, useVerifyOtpForgotPasswordMutation } from '@/features/auth/api/authApi.api';
import { VerificationFormType } from '@/features/auth/schemas';
import { setStep, setStyledAlert, setTokenExpiry } from '@/features/auth/store/auth/authSlice.slice';
import type { OtpType } from '@/features/auth/store/auth/authSlice.type';
import { IVerifyOtpForgotPasswordPayload } from '@/features/auth/types/authTypes.type';
import { getResponseMessage } from '@/features/auth/utils/apiErrorGuards.util';
import { useAfterLogin } from '../after-login/useAfterLogin.hook';
import { setTokenExpiryCookie } from '../../utils';

type UseVerificationProps = {
    codeType: OtpType;
    turnstileToken?: string;
};

export function useVerification({ codeType, turnstileToken = '' }: UseVerificationProps) {
    const dispatch = useAppDispatch();
    const [otp, { isLoading: isLoginOtpLoading }] = useOtpVerificationMutation();
    const [otpForgotPassword, { isLoading: isForgotOtpLoading }] = useVerifyOtpForgotPasswordMutation();

    const afterlogin = useAfterLogin();

    async function handleUser(data: VerificationFormType) {
        try {
            const response = await otp({ OTP: data.otp, CFTOKEN: turnstileToken }).unwrap();

            switch (response.responseData.mode.toLowerCase()) {
                case 'first login password change': {
                    if (codeType === 'sms_forgot' || codeType === 'email_forgot') {
                        dispatch(setStep('reset'));
                    }
                    dispatch(setStep('new'));
                    break;
                }
                case 'allowed': {
                    dispatch(setTokenExpiry(response.responseData.tokenExpiry));
                    setTokenExpiryCookie(response.responseData.tokenExpiry);
                    afterlogin.handleAllowed();
                    break;
                }
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        } catch (error) {
            switch (getResponseMessage(error)) {
                case 'incorrect otp':
                    dispatch(setStyledAlert('incorrectOtp'));
                    break;
                case 'otp no longer valid':
                    dispatch(setStyledAlert('otpExpired'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        }
    }

    async function handleResetPassword(data: VerificationFormType) {
        try {
            const payload: IVerifyOtpForgotPasswordPayload = {
                transaction: 'ForgotPassword',
                otp: data.otp,
                cfToken: turnstileToken
            };

            const response = await otpForgotPassword(payload).unwrap();

            switch (response.status.message.toLowerCase()) {
                case 'allowed to change password!':
                    dispatch(setStep('reset'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        } catch (error) {
            switch (getResponseMessage(error)) {
                case 'otp no longer valid':
                    dispatch(setStyledAlert('otpExpired'));
                    break;
                case 'incorrect otp':
                    dispatch(setStyledAlert('incorrectOtp'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        }
    }

    const submit = async (data: VerificationFormType) => {
        dispatch(setStyledAlert(null));

        if (codeType === 'email' || codeType === 'sms') {
            await handleUser(data);
        } else {
            await handleResetPassword(data);
        }
    };

    return { submit, isLoading: isLoginOtpLoading || isForgotOtpLoading || afterlogin.isLoading };
}
