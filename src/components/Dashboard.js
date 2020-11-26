import React, { useState } from "react";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
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
