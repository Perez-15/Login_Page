import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTurnstile } from '@/hooks/useTurnstile.hook';
import { useSignIn } from '@/features/auth/hooks/sign-in';
import { LoginFormSchema, LoginFormType } from '@/features/auth/schemas';
import { ActionForm, LoginForm } from '@/features/auth/components/sign-in';

const defaultValues: LoginFormType = {
    username: '',
    password: ''
};

export function SignInForm() {
    const { renderTurnstile, turnstileToken } = useTurnstile('interactive', false);
    const methods = useForm<LoginFormType>({ resolver: zodResolver(LoginFormSchema), defaultValues });
    const {
        formState: { isSubmitting }
    } = methods;
    const { submit } = useSignIn({ turnstileToken });

    return (
        <FormProvider {...methods}>
            <form
                id="login-form"
                onSubmit={methods.handleSubmit(submit)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}
            >
                <Typography
                    sx={(theme) => ({
                        color: theme.palette.dark.main,
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        lineHeight: '30px'
                    })}
                >
                    Sign in to your account
                </Typography>
                <LoginForm />
                <ActionForm renderTurnstile={renderTurnstile} isLoading={isSubmitting} />
            </form>
        </FormProvider>
    );
}
