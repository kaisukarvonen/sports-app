import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from './Login';
import Navigation from './Navigation';
import * as userActions from '../dux/users';
import Register from './Register';
import '../css/styles.css';


class App extends React.Component {
  componentWillMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <Router>
        <Switch>
          { this.props.isAuthenticated !== undefined &&
            <Route
              exact
              path="/"
              component={
            !this.props.isAuthenticated ?
              Login : Navigation
            }
            />}
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.users.isAuthenticated,
  }),
  dispatch => (bindActionCreators({
    ...userActions,
  }, dispatch)),
)(App);
