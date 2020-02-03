import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch,Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import ChiefRegistraionReuqest from './components/chief-registration-reqeuest/chief-registration-request';
import RiderRegistrationRequest from './components/rider-registration-reqeuest/rider-registration-request';
import Chiefs from './components/chiefs/chiefs';
import Rider from './components/riders/riders';
import Customers from './components/customers/customers';
import Orders from './components/orders/orders';
import Accounts from './components/accounts/accounts';
import Disputes from './components/disputes/disputes';
import Support from './components/support/support';
import Layoutt from './components/layout/layout';

function App() {
  return (
    <Router>
      <Layoutt/>
      <Route exact path="/dashboard" component={Dashboard}>Dashboard</Route>
      <Route exact path="/chief-registration-reqeuests" component={ChiefRegistraionReuqest}>ChiefRegistraionReuqest</Route>
      <Route exact path="/rider-registration-reqeuests" component={RiderRegistrationRequest}>RiderRegistrationRequest</Route>
      <Route exact path="/chiefs" component={Chiefs}>Chiefs</Route>
      <Route exact path="/riders" component={Rider}>Riders</Route>
      <Route exact path="/customers" component={Customers}>Customers</Route>
      <Route exact path="/orders" component={Orders}>Orders</Route>
      <Route exact path="/accounts" component={Accounts}>Accounts</Route>
      <Route exact path="/disputes" component={Disputes}>Disputes</Route>
      <Route exact path="/support" component={Support}>Support</Route> 
    </Router>
  
  
  
  );
}

export default App;
