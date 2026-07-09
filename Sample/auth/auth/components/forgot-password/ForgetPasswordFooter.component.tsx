import { useAppDispatch } from '@/app/hooks';
import { Section } from '@/components/ui/Section';
import { StyledButton } from '@/components/ui/StyledButton';
import { setStep } from '@/features/auth/store/auth/authSlice.slice';
import { Link } from '@mui/material';

interface ForgetPasswordFooterProps {
    isLoading?: boolean;
}

export function ForgetPasswordFooter({ isLoading = false }: ForgetPasswordFooterProps) {
    const dispatch = useAppDispatch();

    return (
        <Section sx={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '100%' }}>
            <StyledButton formName={'forgetPassword'} label="Send Request" isLoading={isLoading} />
            <Link
                underline="none"
                onClick={() => dispatch(setStep('login'))}
                sx={(theme) => ({
                    color: theme.palette.primary[500],
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '22px',
                    cursor: 'pointer'
                })}
            >
                ← Back to Login
            </Link>
        </Section>
    );
}
