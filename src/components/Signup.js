import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Box from "@material-ui/core/Box";
import MuiTextField from "@material-ui/core/TextField";
import { fieldToTextField } from "formik-material-ui";

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

export default function Signup() {
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

          if (values.password < 8) {
            errors.password = "Password needs to be at lest 8 characters";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {/* actual form */}
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form>
            <Box margin={1}>
              <Field
                component={UpperCasingTextField}
                name="email"
                type="email"
                label="Email"
                helperText="Please Enter Email"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
              />
            </Box>
            <Box margin={1}>
              {isSubmitting && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
