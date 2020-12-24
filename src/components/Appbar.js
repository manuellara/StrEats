import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { Menu, Logout } from "mdi-material-ui";

export default function Appbar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogOut() {
    try {
      await logout();
      history.push("/login");
      console.log(currentUser);
    } catch {
      alert("Issue with Logging Out");
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            StrEats
          </Typography>
          <Button color="inherit" endIcon={<Logout />} onClick={handleLogOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
