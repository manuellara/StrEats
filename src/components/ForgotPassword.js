import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Button,
  LinearProgress,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../contexts/AuthContext";

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

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState();

  const classes = useStyles();

  return (
    <Container className="main" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          initialValues={{
            email: "",
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
                setMessage("");
                await resetPassword(values.email);
                setMessage("Check your inbox for password reset email");
              } catch {
                setError("Could not match email with an associated account");
              }
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={classes.form}>
              {isSubmitting && <LinearProgress />}
              <Typography component="h1" variant="h5" align="center">
                Reset Password
              </Typography>
              {message && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  {message}
                </Alert>
              )}
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
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                className={classes.submit}
                fullWidth
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
        <Grid container>
          <Grid item xs variant="body2">
            <Link to="/login">Back to Login</Link>
          </Grid>
          <Grid item variant="body2">
            <Link to="/signup">Need an account? Sign Up</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
