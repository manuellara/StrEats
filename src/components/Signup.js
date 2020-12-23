import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Button,
  LinearProgress,
  Typography,
  makeStyles,
  Container,
  Box,
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
  // global background color is in the login page
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const { signup } = useAuth();
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
      setError("Failed to Sign Up");
    }
  }

  return (
    <Container className="main" component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
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

            if (values.password.length < 8) {
              errors.password = "Password needs to be at lest 8 characters";
            }

            if (values.passwordConfirm !== values.password) {
              errors.passwordConfirm = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setError("");
            setTimeout(async () => {
              setSubmitting(false);
              try {
                await signup(values.email, values.password);
                history.push("/");
              } catch {
                setError("Failed to create account");
              }
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={classes.form}>
              {isSubmitting && <LinearProgress />}

              <Typography component="h1" variant="h5" align="center">
                Sign Up
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
              <Field
                component={TextField}
                variant="outlined"
                type="password"
                label="Confirm Password"
                name="passwordConfirm"
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
                Submit
              </Button>

              <Grid container>
                <Grid item xs align="center">
                  <Link to="/login" variant="body2">
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                align="center"
                className={classes.submit}
              >
                Or Sign Up with provider
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
