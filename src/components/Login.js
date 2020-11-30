import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Button,
  LinearProgress,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import Google  from "mdi-material-ui/Google";
import Twitter from "mdi-material-ui/Twitter";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const { loginWithProvider } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

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
    <>
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
              setError("Failed to Sign In");
            }
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            {isSubmitting && <LinearProgress />}
            <Card variant="outlined">
              <Typography variant="h4" align="center">
                Login
              </Typography>
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="email"
                      type="email"
                      label="Email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Password"
                      name="password"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  fullWidth
                >
                  Log In
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
      <Typography variant="h6" align="center">
        <Link to="/forgot-password">Forgot password?</Link>
      </Typography>
      <Typography variant="h6" align="center">
        Need an account? <Link to="/signup">Sign Up</Link>
      </Typography>
      <Typography variant="h6" align="center">
        Or Log In with provider
      </Typography>
      <Button
        startIcon={<Google />}
        variant="outlined"
        onClick={() => providerLogin("google")}
        fullWidth
      >
        Google
      </Button>
      <Button
        startIcon={<Twitter />}
        variant="outlined"
        color="primary"
        onClick={() => providerLogin("twitter")}
        fullWidth
      >
        Twitter
      </Button>
    </>
  );
}
