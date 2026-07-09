import { VerificationForm } from '@/features/auth/components/verification/VerificationForm.component';
import {
    ConfirmationScreen,
    ForgotPasswordForm,
    ForgotPasswordSelectionForm,
    SetPasswordForm,
    SignInForm,
    VerificationSelectionForm
} from '@features/auth/components';

export const getLoginContainer = (currentStep: string) => {
    switch (currentStep) {
        case 'verification':
            return <VerificationForm />;
        case 'choose':
            return <VerificationSelectionForm />;
        case 'new':
            return <SetPasswordForm passwordType="new" />;
        case 'reset':
            return <SetPasswordForm passwordType="reset" />;
        case 'login':
            return <SignInForm />;
        case 'forgotSelection':
            return <ForgotPasswordSelectionForm />;
        case 'forgotPassword':
            return <ForgotPasswordForm />;
        case 'confirmed':
            return <ConfirmationScreen />;
        default:
            return <SignInForm />;
    }
};
