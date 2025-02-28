import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent automatic reload on form submit

    // Validate username and password
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const apiUrl = `${backendUrl}/api/user/login`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      setError("Invalid username or password");
      return;
    }

    // Save the token in local storage
    const data = await response.json();
    localStorage.setItem("token", data.token);

    // Redirect to home page
    navigate("/");
  };

  return (
    <Box
      component="form"
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 1.5,
      }}
      onSubmit={(event) => handleLogin(event)}
    >
      <Typography variant="h6" align="center">
        Sign In
      </Typography>
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        variant="outlined"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        style={{ boxShadow: "none", textTransform: "none" }}
      >
        Sign In
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default Login;
