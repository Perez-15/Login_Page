import { Box, type SxProps, type Theme } from '@mui/material';

interface AuthFooterProps {
    imgSrc: string;
    footerHeight: string | number;
    sx?: SxProps<Theme>;
}

export function AuthFooter({ imgSrc, footerHeight, sx, ...others }: AuthFooterProps) {
    return (
        <>
            <Box
                component="img"
                src={imgSrc}
                sx={{
                    bgcolor: 'transparent',
                    height: footerHeight,
                    objectFit: 'fill',
                    width: '100%',
                    ...sx
                }}
                {...others}
            ></Box>
        </>
    );
}
