import { Turnstile } from '@marsidev/react-turnstile';
import { Box, Typography } from '@mui/material';

interface TurnstileWidgetProps {
    onVerify: (token: string) => void;
    error?: string
}

export function TurnstileWidget ({onVerify, error}: TurnstileWidgetProps){

    return (
        <Box>
            <Turnstile
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={onVerify}
            />
            {error && (
              <Typography color="error" variant="caption">{error}</Typography>
            )}
          </Box>
    )
}