import { LoginForm } from "../auth/auth/components/forms/loginForm";
import { Paper, Box, Typography } from "@mui/material";

function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 4, width: 500}}>
        
        <Typography variant="h5">Login</Typography>
        <LoginForm/>
      </Paper>
    </Box>
  );
}

export default LoginPage


