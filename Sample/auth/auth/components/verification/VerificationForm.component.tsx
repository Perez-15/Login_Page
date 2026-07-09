import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Box, Link, Typography } from '@mui/material';
import { Section } from '@/components/ui/Section';
import { StyledButton } from '@/components/ui/StyledButton';
import OtpInput from '@/components/ui/OtpInput';
import { useTimer } from '@/hooks/useResendTImer.hook';
import { setStep, setStyledAlert } from '@/features/auth/store/auth/authSlice.slice';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getVerificationHeaderText } from '@/features/auth/utils/verification';
import { useVerification } from '@/features/auth/hooks/verification';
import { VerificationFormSchema, VerificationFormType } from '@/features/auth/schemas';

const defaultValues: VerificationFormType = {
    otp: ''
};

export function VerificationForm() {
    const codeType = useAppSelector((state) => state.auth.otpType);
    const dispatch = useAppDispatch();

    const { subtitle, message } = getVerificationHeaderText({ codeType });
    const turnstileToken = 'XXXX.DUMMY.TOKEN.XXXX';
    const { minutes, seconds, secondsLeft, setSecondsLeft } = useTimer(60);
    const methods = useForm<VerificationFormType>({ resolver: zodResolver(VerificationFormSchema), defaultValues });
    const {
        formState: { isSubmitting }
    } = methods;
    const { submit } = useVerification({ codeType, turnstileToken });

    const isExpired: boolean = secondsLeft === 0;

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                id={'verificationForm'}
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
                        Enter Verification Code
                    </Typography>
                    <Typography
                        sx={(theme) => ({
                            color: theme.palette.secondary[700],
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '22px',
                            width: '350px'
                        })}
                    >
                        {subtitle}
                    </Typography>
                </Section>
                <Section
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        alignSelf: 'stretch'
                    }}
                >
                    <Typography textAlign="center">{message}</Typography>
                    <OtpInput />
                </Section>
                <StyledButton label="Verify" formName={'verificationForm'} isLoading={isSubmitting} />
                <Section
                    sx={{
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Link
                        underline="none"
                        onClick={() => {
                            dispatch(setStep(codeType === 'sms_forgot' || codeType === 'email_forgot' ? 'forgotSelection' : 'choose'));
                            dispatch(setStyledAlert(null));
                        }}
                        sx={(theme) => ({
                            color: theme.palette.primary[500],
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '22px',
                            cursor: 'pointer'
                        })}
                    >
                        Change method
                    </Link>
                    <Link
                        underline="none"
                        onClick={isExpired ? () => setSecondsLeft(60) : undefined}
                        sx={(theme) => ({
                            cursor: isExpired ? 'pointer' : 'default',
                            pointerEvents: isExpired ? 'auto' : 'none',
                            color: theme.palette.textColor.subtext,
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '24px'
                        })}
                    >
                        {isExpired ? 'Resend code' : `Resend code in ${minutes}:${seconds.toString().padStart(2, '0')}`}
                    </Link>
                </Section>
            </Box>
        </FormProvider>
    );
}
