import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '30px',
  },
  grid: {
    paddingBottom: '30px'
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const classes = useStyles();

  async function handleLogOut() {
    setError("");
    try {
      await logout();
      history.push("/login");
      console.log(currentUser);
    } catch {
      setError("Issue with Logging Out");
    }
  }

  return (
    <>
      <Container maxWidth="md" className={classes.root}>

          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <h2>Profile</h2>
                  {error && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  )}
                  <strong>Email: </strong> {currentUser.email}
                  <Button
                    to="/update-profile"
                    component={Link}
                    variant="outlined"
                    fullWidth
                  >
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogOut}
            fullWidth
          >
            Log Out
          </Button>
      </Container>
    </>
  );
}
