import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Privateroute from "./components/PrivateRoute";

// page routes
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Container>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Privateroute exact path="/" component={Dashboard} />
            <Privateroute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
      </AuthProvider>
    </Container>
  );
}

export default App;
