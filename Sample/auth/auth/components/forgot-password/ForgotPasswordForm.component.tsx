import { useAppSelector } from '@/app/hooks';
import { Box } from '@mui/material';
import { StyledTextField } from '@/components/ui/StyledTextField';
import EmailIcon from '@/assets/radioEmailIcon.svg';
import SmsIcon from '@/assets/radioSmsIcon.svg';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgetPasswordFooter, ForgotPasswordContent } from '@/features/auth/components/forgot-password';
import { useForgotPassword } from '@/features/auth/hooks/forgot-password';
import { createForgotPasswordSchema, ForgotPasswordFormType } from '@/features/auth/schemas';

const defaultValues: ForgotPasswordFormType = {
    sms: '',
    email: ''
};

export function ForgotPasswordForm() {
    const otpType = useAppSelector((state) => state.auth.otpType);
    const mode: 'sms' | 'email' = otpType === 'sms' ? 'sms' : 'email';
    const resetType = mode === 'sms' ? 'mobile number' : 'email';

    const methods = useForm<ForgotPasswordFormType>({ resolver: zodResolver(createForgotPasswordSchema(mode)), defaultValues });
    const {
        formState: { isSubmitting }
    } = methods;
    const { submit } = useForgotPassword();

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                id={'forgetPassword'}
                onSubmit={methods.handleSubmit((data) => submit(data, mode))}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '32px',
                    width: {
                        xs: '275px',
                        md: 'auto'
                    }
                }}
            >
                <ForgotPasswordContent resetType={resetType} />
                {mode === 'sms' ? (
                    <StyledTextField name="sms" title="Mobile" hint="Enter your mobile" imgSrc={SmsIcon} type="text" />
                ) : (
                    <StyledTextField name="email" title="Email" hint="Enter your email" imgSrc={EmailIcon} type="email" />
                )}
                <ForgetPasswordFooter isLoading={isSubmitting} />
            </Box>
        </FormProvider>
    );
}
