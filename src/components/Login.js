import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Button,
  LinearProgress,
  Container,
  Typography,
  Box,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import Google from "mdi-material-ui/Google";
import Twitter from "mdi-material-ui/Twitter";

import { useAuth } from "../contexts/AuthContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://streats.app/">
        StrEats
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "25px"
  },
  form: {
    width: "100%",
    padding: 10
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const { login } = useAuth();
  const { loginWithProvider } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  const classes = useStyles();

  async function providerLogin(provider) {
    try {
      setError("");
      await loginWithProvider(provider);
      history.push("/");
    } catch {
      setError("Failed to Sign In");
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper variant="outlined" className={classes.paper}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setError("");
            setTimeout(async () => {
              setSubmitting(false);
              try {
                await login(values.email, values.password);
                history.push("/");
              } catch {
                setError("Failed to Log In");
              }
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={classes.form}>
              {isSubmitting && <LinearProgress />}

              <Typography component="h1" variant="h5" align="center">
                Login
              </Typography>

              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}

              <Field
                component={TextField}
                variant="outlined"
                name="email"
                type="email"
                label="Email Address"
                margin="normal"
                fullWidth
              />

              <Field
                component={TextField}
                variant="outlined"
                type="password"
                label="Password"
                name="password"
                margin="normal"
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                fullWidth
                className={classes.submit}
              >
                Log In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    Need an account? Sign Up
                  </Link>
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                align="center"
                className={classes.submit}
              >
                Or Log In with provider
              </Typography>

              <Button
                startIcon={<Google />}
                variant="outlined"
                color="primary"
                onClick={() => providerLogin("google")}
                fullWidth
                className={classes.submit}
              >
                Google
              </Button>

              <Button
                startIcon={<Twitter />}
                variant="outlined"
                color="secondary"
                onClick={() => providerLogin("twitter")}
                fullWidth
                className={classes.submit}
              >
                Twitter
              </Button>
            </Form>
          )}
        </Formik>
        
        <Box mt={8}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
}
