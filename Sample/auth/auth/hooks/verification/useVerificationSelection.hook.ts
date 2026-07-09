import { useAppDispatch } from '@/app/hooks';
import { useVerificationSelectionMutation } from '@/features/auth/api/authApi.api';
import { VerificationSelectionFormType } from '@/features/auth/schemas';
import { setOtpType, setStep, setStyledAlert } from '@/features/auth/store/auth/authSlice.slice';
import { getResponseMessage } from '@/features/auth/utils/apiErrorGuards.util';

const OTP_METHOD_CODE: Record<'sms' | 'email', number> = {
    email: 0,
    sms: 1
};

export function useVerificationSelection() {
    const dispatch = useAppDispatch();
    const [verificationSelection, { isLoading }] = useVerificationSelectionMutation();

    const submit = async (data: VerificationSelectionFormType) => {
        const otpCode = OTP_METHOD_CODE[data.otpType as 'sms' | 'email'];
        dispatch(setStyledAlert(null));

        try {
            const response = await verificationSelection({ method: otpCode }).unwrap();
            switch (response.status.message.toLowerCase()) {
                case 'email failed. otp sent via sms.':
                    dispatch(setStyledAlert('emailOtpFailed'));
                    dispatch(setOtpType('sms'));
                    dispatch(setStep('verification'));
                    break;
                case 'sms failed. otp sent via email.':
                    dispatch(setStyledAlert('smsOtpFailed'));
                    dispatch(setOtpType('email'));
                    dispatch(setStep('verification'));
                    break;
                case 'otp sent via sms':
                    dispatch(setOtpType('sms'));
                    dispatch(setStep('verification'));
                    break;
                case 'otp sent via email':
                    dispatch(setOtpType('email'));
                    dispatch(setStep('verification'));
                    break;
            }
        } catch (error) {
            switch (getResponseMessage(error)) {
                case 'otp still valid please try again after 5 minutes':
                    dispatch(setStep('verification'));
                    dispatch(setStyledAlert('otpNotExpired'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        }
    };

    return { submit, isLoading };
}
