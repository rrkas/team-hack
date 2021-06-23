import React from "react";
//import ReactDOM from 'react-dom';
import Login from "./components/LoginPage/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/WelcomePage/Welcome";
import Compiler from "./components/Compiler/Compiler";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Welcome">
          <Welcome />
        </Route>
        <Route path="/Compiler">
          <Compiler />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
