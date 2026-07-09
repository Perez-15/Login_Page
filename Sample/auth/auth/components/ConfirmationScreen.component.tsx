import { useAppDispatch } from '@/app/hooks';
import { Box, Link, Typography } from '@mui/material';
import { Section } from '@/components/ui/Section';
import { useTimer } from '@/hooks/useResendTImer.hook';
import checkCircle from '@assets/checkCircleBold.svg';
import { setStep, setStyledAlert } from '@/features/auth/store/auth/authSlice.slice';

export function ConfirmationScreen() {
    const dispatch = useAppDispatch();
    const { seconds } = useTimer(5);

    if (seconds == 0) {
        dispatch(setStyledAlert(null));
        dispatch(setStep('login'));
    }

    return (
        <Section
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px'
                }}
            >
                <Section
                    sx={{
                        display: 'flex',
                        width: '80px',
                        height: '80px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: '1/1',
                        borderRadius: '100px',
                        backgroundColor: 'rgba(50, 186, 124, 0.16)'
                    }}
                >
                    <img
                        src={checkCircle}
                        style={{
                            width: '64px',
                            height: '64px',
                            flexShrink: '0',
                            aspectRatio: '1/1'
                        }}
                    />
                </Section>
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
                        Password Updated
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
                        You can now sign in with your new password.
                    </Typography>
                </Section>
            </Section>
            <Section
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    minWidth: '100%'
                }}
            >
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.palette.bg.subcontainer,
                        borderRadius: '5px',
                        display: 'flex',
                        padding: '16px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        alignSelf: 'stretch'
                    })}
                >
                    <Typography
                        sx={(theme) => ({
                            color: theme.palette.secondary[700],
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '20px'
                        })}
                    >
                        Redirecting to login page in {seconds} seconds...
                    </Typography>
                </Box>
                <Link
                    underline="none"
                    onClick={() => {
                        dispatch(setStep('login'));
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
                    Go to Login Now
                </Link>
            </Section>
        </Section>
    );
}
