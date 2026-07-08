import { useMemo, useRef, useState } from 'react';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Turnstile } from '@marsidev/react-turnstile';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export type turnstileActionType = 'interactive' | 'non-interactive';

export function useTurnstile(actionTurnstile: turnstileActionType, isInvisible?: boolean) {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const turnstileRef = useRef<TurnstileInstance>(null);

    const action: turnstileActionType = actionTurnstile;

    const [turnstileToken, setTurnstileToken] = useState<string>('');
    const [turnstileError, setTurnstileError] = useState<string>('');

    const renderTurnstile = useMemo(
        () => (
            <Turnstile
                ref={turnstileRef}
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={setTurnstileToken}
                onError={setTurnstileError}
                options={{
                    size: isInvisible ? 'invisible' : isSmUp ? 'flexible' : 'flexible', // was compact but changed to flexible quick fix
                    action,
                    theme: 'auto'
                }}
            />
        ),
        [isInvisible, isSmUp, action]
    );

    // Function to manually reset/refetch Turnstile
    const resetTurnstile = () => {
        if (turnstileRef.current) {
            turnstileRef.current.reset();
            setTurnstileToken(''); // Clear the current token
            setTurnstileError(''); // Clear any error
        }
    };

    return { turnstileToken, turnstileError, renderTurnstile, resetTurnstile };
}
