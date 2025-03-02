import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../contexts/Auth.tsx";

const Navbar = () => {
  const auth = useAuth();

  const getAuthIcon = () => {
    if (auth.token !== "") {
      return (
        <IconButton onClick={auth.logout}>
          <LogoutIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton href="/login">
          <LoginIcon />
        </IconButton>
      );
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar style={{ justifyContent: "center" }}>
        <Button color="inherit" href="/">
          Problems
        </Button>
        <Button color="inherit" href="/tips">
          Tips
        </Button>
        {getAuthIcon()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
