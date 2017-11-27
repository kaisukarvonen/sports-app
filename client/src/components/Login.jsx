import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Form, Button, Input, Header, Card, Message } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.min.css';
import '../css/styles.css';
import { loginUser } from '../actions/users';

// const propTypes = {
//   sports: PropTypes.array,
//   fetchSports: PropTypes.func.isRequired,
//   deleteSport: PropTypes.func.isRequired,
//   addSport: PropTypes.func.isRequired,
//   updateSport: PropTypes.func.isRequired,
//   message: PropTypes.object,
// };
//
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
    console.log(nextProps);
    if (nextProps.message && nextProps.message !== this.props.message) {
      toast.error(nextProps.message.value);
    } else if (nextProps.loggedIn) {
      console.log('logged in');
      this.props.history.push('/');
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
      console.log(user);
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

export default withRouter(connect(
  state => ({
    message: state.sports.message,
    loggedIn: state.users.loggedIn,
  }),
  dispatch => ({
    loginUser(user) {
      dispatch(loginUser(user));
    },
  }),
)(Login));

Login.defaultProps = defaultProps;
