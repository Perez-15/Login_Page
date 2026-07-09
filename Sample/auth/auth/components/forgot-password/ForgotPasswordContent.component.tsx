import { Section } from '@/components/ui/Section';
import { Typography } from '@mui/material';

type ForgetPasswordContentProps = {
    resetType: string;
};

export function ForgotPasswordContent({ resetType }: ForgetPasswordContentProps) {
    return (
        <Section // this works, but a content wrapper could also be cleaner...?
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
                Forgot Password
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
                Enter your registered {resetType} to reset your password.
            </Typography>
        </Section>
    );
}
