import { useAppDispatch } from '@/app/hooks';
import { Box, Divider, Link, Typography, useTheme } from '@mui/material';
import { SignInButton } from '@/components/ui/SignInButton';
import { setStep } from '@/features/auth/store/auth/authSlice.slice';
import { JSX } from 'react';
import { LucideTextButtonV2 } from '@/components/ui/buttons/LucideTextButtonV2';
import { socialsStyles } from '@/features/auth/styles';
import GoogleIcon from '@assets/images/icons/google.svg';
import OutlookIcon from '@assets/images/icons/outlook.png';

interface ActionFormProps {
    renderTurnstile: JSX.Element;
    isLoading: boolean;
}

export function ActionForm({ renderTurnstile, isLoading }: ActionFormProps) {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    return (
        <Box
            sx={{
                bgcolor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',

                minWidth: '100%'
            }}
        >
            {renderTurnstile}
            <SignInButton isLoading={isLoading} />
            <Link
                underline="none"
                onClick={() => {
                    dispatch(setStep('forgotSelection'));
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
                Forgot password?
            </Link>
            <Divider sx={{ borderColor: theme.palette.border.main }}>
                <Typography sx={{ color: theme.palette.textColor.title, fontSize: 14, fontWeight: 400, lineHeight: '20px' }}>
                    Sign In with
                </Typography>
            </Divider>
            <Box sx={{ display: 'flex', gap: '12px' }}>
                <LucideTextButtonV2
                    icon={<Box component="img" src={GoogleIcon} sx={{ width: '18px', height: '18px' }} />}
                    text={'Gmail'}
                    sx={socialsStyles(theme)}
                />
                <LucideTextButtonV2
                    icon={<Box component="img" src={OutlookIcon} sx={{ width: '18px', height: '18px' }} />}
                    text={'Outlook'}
                    sx={socialsStyles(theme)}
                />
            </Box>
        </Box>
    );
}
