import { Box } from '@mui/material';

interface LoginCointainerProps {
    children?: React.ReactNode;
}

export function LoginContainer({ children }: LoginCointainerProps) {
    return (
        <>
            <Box
                sx={(theme) => ({
                    padding: '40px',
                    borderRadius: '5px',
                    border: '1px solid',
                    borderColor: theme.palette.border.main,
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: '0px 8px 25px 0px rgba(0, 0, 0, 0.05)',
                    minWidth: {
                        xs: '300px',
                        md: '475px'
                    }
                })}
            >
                {children}
            </Box>
        </>
    );
}
