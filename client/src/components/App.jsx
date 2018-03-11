import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from './Login';
import Navigation from './Navigation';
import * as userActions from '../dux/users';
import Register from './Register';
import '../css/styles.css';


const App = props => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
              // !props.loggedIn ? (
              //   <Redirect to="/login" />
              // ) :
          <Navigation />
            )}
      />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);

// user logs out on page refresh (due to state being initialized)


export default connect(
  state => ({
    loggedIn: state.users.loggedIn,
  }),
  dispatch => (bindActionCreators({
    ...userActions,
  }, dispatch)),
)(App);
// export default connect(
//   state => ({
//     loggedIn: state.users.loggedIn,
//   })
// )(App);
