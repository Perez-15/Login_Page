import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';
import { loginSchema } from '../schemas/loginSchema'
import { useLoginMutation } from '../features/auth/authApi';

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({ username: '', password: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    const result = loginSchema.safeParse({ ...form, turnstileToken });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    try {
      await login({ username: form.username, password: form.password }).unwrap();
      navigate('/dashboard');
    } catch {
      setApiError('Invalid username or password');
    }
  };

  return (
   <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  }}
>
      <Paper sx={{ p: 4, width: 360 }} elevation={3}>
        <Typography variant="h5" sx={{mb:2}}>Sign in</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Box sx={{my:2}}>
            <Turnstile
              siteKey="1x00000000000000000000AA"
              onSuccess={(token) => setTurnstileToken(token)}
            />
            {errors.turnstileToken && (
              <Typography color="error" variant="caption">{errors.turnstileToken}</Typography>
            )}
          </Box>
          {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
          <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}