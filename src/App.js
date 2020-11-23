import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";


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
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </Container>
      </Grid>
    </AuthProvider>
  );
}

export default App;
