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
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState();

  return (
    <>
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
          <Form>
            {isSubmitting && <LinearProgress />}
            <Card variant="outlined">
              <Typography variant="h5" align="center">
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
                  Reset Password
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
      <Typography variant="h6" align="center">
        Back to <Link to="/login">Login</Link>
      </Typography>
      <Typography variant="h6" align="center">
        Need an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </>
  );
}
