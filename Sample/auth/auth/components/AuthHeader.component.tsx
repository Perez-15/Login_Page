import { Box } from '@mui/material';
import { Section } from '@/components/ui/Section';

type AuthHeaderProps = {
    imgSrc?: string;
    target: string;
};

export function AuthHeader({ imgSrc, target, ...other }: AuthHeaderProps) {
    return (
        <Section
            sx={{
                minWidth: '100%'
            }}
        >
            <Box
                component="a"
                href={target}
                sx={{
                    margin: '30px', // 1.5rem default!
                    display: 'inline-flex',
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    width: '125px',
                    aspectRatio: 1600 / 555
                }}
                {...other}
            ></Box>
        </Section>
    );
}
