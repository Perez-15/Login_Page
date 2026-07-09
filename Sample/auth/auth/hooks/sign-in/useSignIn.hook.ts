import { useAppDispatch } from '@/app/hooks';
import { useLoginMutation } from '@/features/auth/api/authApi.api';
import { AUTH_RESPONSE_CODE } from '@/features/auth/constants/responseCodes.const';
import { LoginFormType } from '@/features/auth/schemas';
import { setEmail, setMobileNumber, setOtpType, setStep, setStyledAlert } from '@/features/auth/store/auth/authSlice.slice';
import { getResponseCode } from '@/features/auth/utils/apiErrorGuards.util';

type UseSignInProps = {
    turnstileToken: string;
};

export function useSignIn({ turnstileToken }: UseSignInProps) {
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const submit = async (data: LoginFormType) => {
        try {
            dispatch(setStyledAlert(null));

            const response = await login({ ...data, cfToken: turnstileToken }).unwrap();

            switch (response.status.responseCode) {
                case AUTH_RESPONSE_CODE.SUCCESS_NEEDS_MFA_SELECTION:
                    dispatch(setEmail(response.responseData.email));
                    dispatch(setMobileNumber(response.responseData.mobileNumber));
                    dispatch(setStep('choose'));
                    break;
                case AUTH_RESPONSE_CODE.INVALID_USERNAME:
                    dispatch(setStyledAlert('wrongUsername'));
                    break;
                case AUTH_RESPONSE_CODE.SYSTEM_ERROR:
                    dispatch(setStyledAlert('error'));
                    break;
                case AUTH_RESPONSE_CODE.SUCCESS_MFA_PENDING:
                    dispatch(setOtpType('neutral'));
                    dispatch(setStep('verification'));
                    dispatch(setStyledAlert('otpNotExpiredFromSignIn'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        } catch (error) {
            switch (getResponseCode(error)) {
                case AUTH_RESPONSE_CODE.WRONG_PASSWORD:
                    dispatch(setStyledAlert('wrongPassword'));
                    break;
                case AUTH_RESPONSE_CODE.SYSTEM_ERROR:
                    dispatch(setStyledAlert('error'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        }
    };

    return { submit, isLoading };
}
