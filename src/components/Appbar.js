import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  makeStyles,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { Menu, Logout } from "mdi-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Appbar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleDrawer = () => {
    setOpen(true);
  };

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
          <IconButton
            onClick={handleDrawer}
            color="inherit"
            edge="start"
            aria-label="menu"
          >
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

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        
        <List className={classes.root}>

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={currentUser.displayName}
                src={currentUser.photoURL}
              />
            </ListItemAvatar>
          </ListItem>

          <Divider component="li" />

          <ListItem button>
            <ListItemIcon>
              <Menu />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>

        </List>
      </Drawer>
    </div>
  );
}
