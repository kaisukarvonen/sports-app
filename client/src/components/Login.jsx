import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Form, Button, Input, Header, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../dux/users';


const defaultProps = {
  message: {},
  loggedIn: false,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message !== this.props.message) {
      toast.error(nextProps.message.value);
    }
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleFormSubmit = () => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    if (user.username === '' || user.password === '') {
      toast.error('Please fill out both fields!');
    } else {
      this.props.loginUser(user);
    }
  }

  render() {
    // kaisuk: password
    return (
      <div className="login-frame">
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
        />
        <Grid centered textAlign="center">
          <Message className="login-card">
            <Header as="h2" style={{ padding: '12px' }}>Sports App</Header>
            <Form onSubmit={this.handleFormSubmit} style={{ padding: '7px' }}>
              <Form.Input
                placeholder="Username"
                icon="user"
                name="username"
                iconPosition="left"
                value={this.state.username}
                onChange={this.handleOnChange}
              />
              <Form.Input
                placeholder="Password"
                icon="lock"
                name="password"
                iconPosition="left"
                type="password"
                value={this.state.password}
                onChange={this.handleOnChange}
              />
              <Button fluid type="submit" color="teal">Login</Button>
            </Form>
            <p style={{ padding: '6px' }}>
              <Link to="/register">Create new user account</Link>
            </p>
          </Message>
        </Grid>
      </div>
    );
  }
}
Login.defaultProps = defaultProps;

export default withRouter(connect(
  state => ({
    message: state.sports.message,
    loggedIn: state.users.loggedIn,
  }),
  dispatch => (bindActionCreators({
    ...userActions,
  }, dispatch)),
)(Login));
