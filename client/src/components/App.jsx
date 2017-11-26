import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import SportsPage from './SportsPage';


const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route
          exact path="/"
          render={() => (
            !props.loggedIn ? (
              <Redirect to="/login" />
            ) :
              <SportsPage />
          )}
        />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

//user logs out on page refresh (due to state being initialized)

export default connect(
  state => ({
    loggedIn: state.users.loggedIn,
  })
)(App);
