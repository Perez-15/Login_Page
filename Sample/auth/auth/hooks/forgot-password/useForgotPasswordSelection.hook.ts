import { useAppDispatch } from '@/app/hooks';
import { VerificationSelectionFormType } from '@/features/auth/schemas';
import { setOtpType, setStep, setStyledAlert } from '@/features/auth/store/auth/authSlice.slice';

export function useForgotPasswordSelection() {
    const dispatch = useAppDispatch();

    const submit = async (data: VerificationSelectionFormType) => {
        dispatch(setStyledAlert(null));
        dispatch(setOtpType(data.otpType as 'sms' | 'email'));
        dispatch(setStep('forgotPassword'));
    };

    return { submit };
}
