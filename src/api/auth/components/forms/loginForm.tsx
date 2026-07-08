import { useLoginForm } from "../../hooks/useLoginForm";
import { TurnstileWidget } from "../TurnstileWidget";
import { Alert, Button, TextField, Stack } from "@mui/material";

export function LoginForm() {
  const {
    form,
    updateField,
    apiError,
    errors,
    setTurnstileToken,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Username"
          value={form.username}
          onChange={(e) => updateField("username", e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />

        <TextField
          label="Password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={!!errors.password}
          helperText={errors.passowrd}
        />
      </Stack>

      <Stack sx={{display:'center', p: 2}}>
        <TurnstileWidget
          onVerify={setTurnstileToken}
          error={errors.turnstileToken}
        />  
      </Stack>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
