import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MuiTextField from "@material-ui/core/TextField";
import { fieldToTextField } from "formik-material-ui";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function UpperCasingTextField(props) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;
  const onChange = React.useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value ? value.toUpperCase() : "");
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");

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
            // alert(JSON.stringify(values, null, 2));
            try {
              await login(values.email, values.password);
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
                      component={UpperCasingTextField}
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
        Need an account? <Link to="/signup">Sign Up</Link>
      </Typography>
      <Typography variant="h6" align="center">
        Or Log In with provider
      </Typography>
    </>
  );
}
