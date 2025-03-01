import { AppBar, Toolbar, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar style={{ justifyContent: "center" }}>
        <Button color="inherit" href="/">
          Problems
        </Button>
        <Button color="inherit" href="/tips">
          Tips
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
