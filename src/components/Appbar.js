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
import { Menu, AccountCircle, Logout, Cog, History } from "mdi-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    height: "70px",
    width: "70px",
  },
  bottomPush: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    padding: 10,
    width: 250,
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
            StrEats - Mobile Ordering
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt={currentUser.displayName}
                src={currentUser.photoURL}
              />
            </ListItemAvatar>
          </ListItem>

          <ListItem>
          
            <ListItemText
              primary={currentUser.displayName}
              secondary="Wilmington, CA"
            />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Cog />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>


        </List>

        <div className={classes.bottomPush}>
          <Button
            color={"secondary"}
            fullWidth
            variant={"outlined"}
            endIcon={<Logout />}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
