import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";


const useStyles = makeStyles({
  root: null,
});

export default function Signup() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
          <CardContent>
              <h2>Sign Up</h2>
          </CardContent>
      </Card>

      <div>
          Already have an account? Login
      </div>
    </>
  );
}
