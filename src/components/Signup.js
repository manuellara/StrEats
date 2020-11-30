import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Button,
  LinearProgress,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  return (
    <>
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
              history.push("/")
            } catch {
              setError("Failed to create account");
            }
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            {isSubmitting && <LinearProgress />}
            <Card variant="outlined">
              <Typography variant="h5" align="center">
                Sign Up
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
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      type="password"
                      label="Confirm Password"
                      name="passwordConfirm"
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
                  Submit
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
      <Typography variant="h6" align="center">
        Already have an account? <Link to="/login">Sign In</Link>
      </Typography>
      <Typography variant="h6" align="center">
        Or Sign Up using provider
      </Typography>
    </>
  );
}
