import React from "react"
import { Grid, Container } from "@material-ui/core"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Privateroute from "./components/PrivateRoute"

// app routes
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
              <Privateroute exact path="/" component={Dashboard} />
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
