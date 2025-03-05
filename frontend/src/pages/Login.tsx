import { useState, FormEvent } from "react";
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAuth } from "../contexts/Auth.tsx";
import { loginUser } from "../services/auth.ts";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent automatic reload on form submit
    try {
      const token = await loginUser(username, password);
      auth.login(token);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Stack
        component="form"
        spacing={2}
        onSubmit={(event) => handleLogin(event)}
        sx={{ minWidth: 0.25 }}
      >
        <Typography variant="h6" align="center">
          Sign In
        </Typography>
        <TextField
          label="Username"
          value={username}
          variant="outlined"
          onChange={(event) => setUsername(event.target.value)}
          required
          autoFocus
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          style={{ boxShadow: "none", textTransform: "none" }}
        >
          Sign In
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Container>
  );
};

export default Login;
