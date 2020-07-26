import React from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Layoutt from './components/layout/layout';
import LoginPage from './components/login/login';
import { ProtectedRoute } from "./protected.route";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage}></Route>
        <ProtectedRoute path="/" component={Layoutt} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
