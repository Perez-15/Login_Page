import { useAppDispatch } from '@/app/hooks';
import { useForgotPasswordMutation } from '@/features/auth/api/authApi.api';
import { ForgotPasswordFormType } from '@/features/auth/schemas';
import { setOtpType, setStep, setStyledAlert } from '@/features/auth/store/auth/authSlice.slice';
import { IForgotPasswordEmailPayload, IForgotPasswordMobilePayload } from '@/features/auth/types/authTypes.type';
import { getResponseMessage } from '@/features/auth/utils/apiErrorGuards.util';

type ForgotPasswordMode = 'sms' | 'email';

export function useForgotPassword() {
    const dispatch = useAppDispatch();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const submit = async (data: ForgotPasswordFormType, mode: ForgotPasswordMode) => {
        try {
            dispatch(setStyledAlert(null));

            const payload: IForgotPasswordMobilePayload | IForgotPasswordEmailPayload =
                mode === 'sms'
                    ? { contactType: 'Mobile', mobile: data.sms?.replace(/^0/, '+63') ?? '' }
                    : { contactType: 'Email', email: data.email ?? '' };

            const response = await forgotPassword(payload).unwrap();
            switch (response.status.message.toLowerCase()) {
                case 'otp sent via sms':
                    dispatch(setOtpType('sms_forgot'));
                    dispatch(setStep('verification'));
                    break;
                case 'otp sent via email':
                    dispatch(setOtpType('email_forgot'));
                    dispatch(setStep('verification'));
                    break;
                case 'incomplete payload':
                    dispatch(setStyledAlert('unknownError'));
                    break;
                case 'invalid mobile number':
                    dispatch(setStyledAlert('invalidMobileNumber'));
                    break;
                case 'invalid email':
                    dispatch(setStyledAlert('invalidEmail'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        } catch (error) {
            switch (getResponseMessage(error)) {
                case 'invalid mobile number':
                    dispatch(setStyledAlert('invalidMobileNumber'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        }
    };

    return { submit, isLoading };
}
