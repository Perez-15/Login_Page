import { useAppSelector } from '@/app/hooks';
import { Typography } from '@mui/material';
import { Section } from '@/components/ui/Section';
import { StyledButton } from '@/components/ui/StyledButton';
import EmailImage from '@/assets/radioEmailIcon.svg';
import SmsImage from '@/assets/radioSmsIcon.svg';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OtpSelection } from '@/components/ui/OtpSelection';
import { useVerificationSelection } from '@/features/auth/hooks/verification';
import { VerificationSelectionFormSchema, VerificationSelectionFormType } from '@/features/auth/schemas';

type Option = {
    value: 'email' | 'sms';
    label: string;
    detail: string;
    image: string;
};

const defaultValues: VerificationSelectionFormType = {
    otpType: ''
};

export function VerificationSelectionForm() {
    const email = useAppSelector((state) => state.auth.verificationContact.email);
    const mobileNumber = useAppSelector((state) => state.auth.verificationContact.mobileNumber);

    const methods = useForm<VerificationSelectionFormType>({
        resolver: zodResolver(VerificationSelectionFormSchema),
        defaultValues
    });
    const {
        formState: { isSubmitting }
    } = methods;
    const { submit } = useVerificationSelection();

    const options: Option[] = [
        { value: 'email', label: 'Email', detail: email, image: EmailImage },
        { value: 'sms', label: 'SMS', detail: mobileNumber, image: SmsImage }
    ];

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(submit)}
                id={'verificationSelectionForm'}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '32px'
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
                        Verify Your Identity
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
                        Choose where you'd like to receive your one-time passcode (OTP).
                    </Typography>
                </Section>
                <OtpSelection options={options} control={methods.control} />
                <StyledButton label="Send Request" formName={'verificationSelectionForm'} isLoading={isSubmitting} />
            </form>
        </FormProvider>
    );
}
