import { useAppDispatch } from '@/app/hooks';
import { useNewPasswordMutation, useResetPasswordMutation } from '@/features/auth/api/authApi.api';
import { AUTH_RESPONSE_CODE } from '@/features/auth/constants/responseCodes.const';
import { SetPasswordFormType } from '@/features/auth/schemas';
import { setStep, setStyledAlert } from '@/features/auth/store/auth/authSlice.slice';
import { IResetPasswordPayload } from '@/features/auth/types/authTypes.type';

type UseSetPasswordProps = {
    passwordType: 'new' | 'reset';
};

export function useSetPassword({ passwordType }: UseSetPasswordProps) {
    const dispatch = useAppDispatch();
    const [newPassword, { isLoading: isNewLoading }] = useNewPasswordMutation();
    const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

    async function handleNewPassword(data: SetPasswordFormType) {
        try {
            const response = await newPassword({ password: data.password }).unwrap();

            switch (response.status.responseCode) {
                case AUTH_RESPONSE_CODE.SUCCESS_FIRST_LOGIN_PASSWORD_CHANGED:
                    dispatch(setStep('confirmed'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        } catch (_error) {
            dispatch(setStyledAlert('unknownError'));
        }
    }

    async function handleResetPassword(data: SetPasswordFormType) {
        try {
            const payload: IResetPasswordPayload = {
                password: data.password,
                transaction: 'ForgotPassword'
            };

            const response = await resetPassword(payload).unwrap();

            switch (response.status.message.toLowerCase()) {
                case 'password successfully changed!':
                    dispatch(setStep('confirmed'));
                    break;
                default:
                    dispatch(setStyledAlert('unknownError'));
                    break;
            }
        } catch (_error) {
            dispatch(setStyledAlert('unknownError'));
        }
    }

    const submit = async (data: SetPasswordFormType) => {
        dispatch(setStyledAlert(null));
        if (passwordType === 'new') {
            await handleNewPassword(data);
        } else {
            await handleResetPassword(data);
        }
    };

    return { submit, isLoading: isNewLoading || isResetLoading };
}
