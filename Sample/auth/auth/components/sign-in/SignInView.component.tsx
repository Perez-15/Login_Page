import AsiaLinkLogo from '@assets/logo.png';
import FooterArt from '@assets/footer.png';
import { Box, Typography } from '@mui/material';
import '@fontsource/montserrat';

import { Section } from '@/components/ui/Section';
import { StyledAlert } from '@/components/ui/StyledAlert';
import { AuthFooter, AuthHeader, LoginContainer } from '@/features/auth/components';
import { useSignInView } from '@/features/auth/hooks/sign-in';
import { getLoginContainer } from '@/features/auth/utils';

export function SignInView() {
    const { alertType, currentStep } = useSignInView();
    const containerContent = getLoginContainer(currentStep);

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '100%',
                backgroundColor: theme.palette.background.default
            })}
        >
            <AuthHeader imgSrc={AsiaLinkLogo} target="/" />
            <Section sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                <Typography
                    variant="h4"
                    sx={{
                        bgcolor: 'transparent',
                        fontFamily: 'Montserrat',
                        color: 'var(--Grays-Black, #000)',
                        textShadow: '0 4px 4px rgba(12, 12, 13, 0.3)',
                        fontSize: {
                            xs: '28px',
                            md: '36px'
                        },
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '40px',
                        letterSpacing: '7.2px'
                    }}
                >
                    VELA
                </Typography>
                {alertType && <StyledAlert alertType={alertType} />}
                <LoginContainer>{containerContent}</LoginContainer>
            </Section>
            <AuthFooter imgSrc={FooterArt} footerHeight="120px" />
        </Box>
    );
}
