import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Signup from "./components/Signup";

function App() {
  return (
    <AuthProvider>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Container maxWidth="sm">
          <Router>
            <Signup />
          </Router>
        </Container>
      </Grid>
    </AuthProvider>
  );
}

export default App;
