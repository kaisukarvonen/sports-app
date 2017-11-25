import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import SportsPage from './SportsPage';

const isLoggedIn = true;
//check if session exists and is valid

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => (
        !isLoggedIn ? (
          <Redirect to="/login" />
        ) :
          <SportsPage />
      )}
      />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default App;
