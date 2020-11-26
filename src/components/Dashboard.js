import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to Log Out");
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <h2>Profile</h2>
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          <strong>Email: </strong> {currentUser.email}
          <Link to="/update-profile" component={Button} fullWidth>
            Update Profile
          </Link>
        </CardContent>
        <CardActions></CardActions>
      </Card>

      <Button onClick={handleLogOut}>Log Out</Button>
    </>
  );
}
