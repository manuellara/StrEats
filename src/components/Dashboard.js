import React from "react";
import Appbar from "./Appbar";
import {
  Card,
  CardContent,
  Button,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "30px",
  },
  grid: {
    paddingBottom: "30px",
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function Dashboard() {
  const { currentUser } = useAuth();

  const classes = useStyles();

  return (
    <>
      <Appbar />
      <Container maxWidth="md" className={classes.root}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <h2>Profile</h2>
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
      </Container>
    </>
  );
}
