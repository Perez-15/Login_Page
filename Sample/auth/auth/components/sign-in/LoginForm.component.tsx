import { Box } from '@mui/material';
import { StyledTextField } from '@/components/ui/StyledTextField';
import { PasswordTextField } from '@/components/ui/PasswordTextField';

export function LoginForm() {
    return (
        <>
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.secondary.main,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    minWidth: '100%'
                })}
            >
                <StyledTextField name="username" type="text" title="Username" hint="Enter your username" />
                <PasswordTextField name="password" title="Password" hint="Enter your password" />
            </Box>
        </>
    );
}
