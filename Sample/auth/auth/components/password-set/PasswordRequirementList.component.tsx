import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Typography } from '@mui/material';

interface PasswordRequirementListProps {
    password?: string;
}

const passwordRules = (password?: string) => {
    const value = password ?? '';

    return {
        length: value.length >= 8 && value.length <= 16,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        allowedChars: /^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*$/.test(value)
    };
};

export function PasswordRequirementList({ password }: PasswordRequirementListProps) {
    // Is there a better way to do this...? There has to be, right...?
    // TODO: yes. there is always a better way. find that better way.

    const rules = passwordRules(password);

    const lengthyStringColor = rules.length ? '#054D3C' : `#ff0000`;
    const uppercaseStringColor = rules.uppercase ? '#054D3C' : `#ff0000`;
    const lowercaseStringColor = rules.lowercase ? '#054D3C' : `#ff0000`;
    const numberStringColor = rules.number ? '#054D3C' : `#ff0000`;
    const allowedCharsStringColor = rules.allowedChars ? '#054D3C' : `#ff0000`;
    const lengthyIcon = rules.length ? (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#054D3C' }} />
    ) : (
        <RadioButtonUncheckedIcon fontSize="small" sx={{ color: '#ff0000' }} />
    );
    const uppercaseIcon = rules.uppercase ? (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#054D3C' }} />
    ) : (
        <RadioButtonUncheckedIcon fontSize="small" sx={{ color: '#ff0000' }} />
    );
    const lowercaseIcon = rules.lowercase ? (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#054D3C' }} />
    ) : (
        <RadioButtonUncheckedIcon fontSize="small" sx={{ color: '#ff0000' }} />
    );
    const numberIcon = rules.number ? (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#054D3C' }} />
    ) : (
        <RadioButtonUncheckedIcon fontSize="small" sx={{ color: '#ff0000' }} />
    );
    const allowedCharsIcon = rules.allowedChars ? (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#054D3C' }} />
    ) : (
        <RadioButtonUncheckedIcon fontSize="small" sx={{ color: '#ff0000' }} />
    );

    return (
        <>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    padding: '16px',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '12px',
                    alignSelf: 'stretch',
                    borderRadius: '5px',
                    backgroundColor: theme.palette.bg.subcontainer
                })}
            >
                <Typography
                    sx={(theme) => ({
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '20px',
                        color: theme.palette.secondary[800]
                    })}
                >
                    Password must contain:
                </Typography>
                <List
                    disablePadding
                    sx={{
                        p: 0,
                        '& .MuiListItem-root': {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            p: '4px 0px',
                            minHeight: 'auto',
                            alignItems: 'center'
                        },
                        '& .MuiListItemIcon-root': {
                            minWidth: 24,
                            justifyContent: 'center',
                            mt: '2px'
                        },
                        '& .MuiListItemText-root': {
                            m: 0
                        },
                        '& .MuiListItemText-primary': {
                            paddingX: '12px',
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            fontSize: '12px',
                            fontWeight: 400,
                            lineHeight: '16px'
                        }
                    }}
                >
                    <ListItem>
                        <ListItemIcon>{lengthyIcon}</ListItemIcon>
                        <ListItemText primary="8–16 characters" sx={{ color: lengthyStringColor }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>{uppercaseIcon}</ListItemIcon>
                        <ListItemText primary="At least 1 uppercase (A–Z)" sx={{ color: uppercaseStringColor }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>{lowercaseIcon}</ListItemIcon>
                        <ListItemText primary="At least 1 lowercase (a–z)" sx={{ color: lowercaseStringColor }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>{numberIcon}</ListItemIcon>
                        <ListItemText primary="At least 1 number (0–9)" sx={{ color: numberStringColor }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>{allowedCharsIcon}</ListItemIcon>
                        <ListItemText primary="Letters, numbers, and common punctuation only" sx={{ color: allowedCharsStringColor }} />
                    </ListItem>
                </List>
            </Box>
        </>
    );
}
