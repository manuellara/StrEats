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
import SearchBox from "react-searchbox-highlight";

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

let items = [
  { label: "Cindy Robles", value: { name: "obj1" } },
  { label: "Manuel Lara", value: { name: "obj2" } },
];

export default function Appbar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(items);

  const classes = useStyles();

  const handleDrawer = () => setOpen(true);

  async function handleLogOut() {
    try {
      await logout();
      history.push("/login");
      console.log("Logged out successfully");
    } catch {
      alert("Issue with Logging Out");
    }
  }

  function updateList(value) {
    value = value.toLowerCase();

    const updateItems = items.filter((item) => {
      return item.label.toLowerCase().includes(value);
    });

    setList(updateItems);
  }

  function handleClick(value) {
    console.log("Item " + value.name + " was clicked");
  }

  const itemList = [
    {
      text: "Account",
      icon: <AccountCircle />,
    },
    {
      text: "Settings",
      icon: <Cog />,
    },
    {
      text: "History",
      icon: <History />,
    },
  ];

  if (currentUser == null) {
    return <></>;
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

          <SearchBox
            items={list}
            onChange={(value) => updateList(value)}
            onItemClick={(value) => handleClick(value)}
          />
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

          {itemList.map((item, index) => {
            return (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
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
