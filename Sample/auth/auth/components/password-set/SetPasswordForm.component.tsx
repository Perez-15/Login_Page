import { Box, Typography } from '@mui/material';
import { Section } from '@/components/ui/Section';
import { PasswordTextField } from '@/components/ui/PasswordTextField';
import { StyledButton } from '@/components/ui/StyledButton';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordRequirementList } from '@/features/auth';
import { useSetPassword } from '@/features/auth/hooks/password-set';
import { SetPasswordFormType, SetPasswordSchema } from '@/features/auth/schemas';

const formName = 'setPasswordForm';
type PasswordType = 'reset' | 'new';

interface SetPasswordFormProps {
    passwordType: PasswordType;
}

const FORM_TITLE: Record<PasswordType, string> = {
    new: 'Set New Password',
    reset: 'Reset Password'
};

const TITLE_MESSAGE: Record<PasswordType, string> = {
    new: 'You are required to set a new password before signing in.',
    reset: 'Enter your new password to regain access to your account.'
};

const defaultValues: SetPasswordFormType = {
    password: '',
    confirmPassword: ''
};

export function SetPasswordForm({ passwordType }: SetPasswordFormProps) {
    const title = FORM_TITLE[passwordType];
    const message = TITLE_MESSAGE[passwordType];

    const methods = useForm<SetPasswordFormType>({ resolver: zodResolver(SetPasswordSchema), defaultValues });
    const password = methods.watch('password');
    const {
        formState: { isSubmitting }
    } = methods;
    const { submit } = useSetPassword({ passwordType });

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                id={formName}
                onSubmit={methods.handleSubmit(submit)}
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
                <Section
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        alignItems: 'center'
                    }}
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
                        {title}
                    </Typography>
                    <Typography
                        sx={(theme) => ({
                            color: theme.palette.secondary[700],
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '22px'
                        })}
                    >
                        {message}
                    </Typography>
                </Section>
                <PasswordTextField title="Password" hint="Enter your password" name="password" />
                <PasswordRequirementList password={password} />
                <PasswordTextField title="Confirm Password" hint="Confirm your password" name="confirmPassword" />
                <StyledButton label="Update Password" formName={formName} isLoading={isSubmitting} />
            </Box>
        </FormProvider>
    );
}
