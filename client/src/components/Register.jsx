import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Form, Button, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from '../dux/users';

const propTypes = {
  registerUser: PropTypes.func.isRequired,
  message: PropTypes.object,
  registerSuccess: PropTypes.bool.isRequired,
};

const defaultProps = {
  message: {},
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message.error) {
      toast.error(nextProps.message.value);
    } else if (nextProps.registerSuccess) {
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
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    };
    if (user.username === '' || user.password === '') {
      toast.error('Please fill out all mandatory fields!');
    } else {
      this.props.registerUser(user);
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
            <Header as="h2" style={{ padding: '12px' }}>Register</Header>
            <Form onSubmit={this.handleFormSubmit} style={{ padding: '7px' }}>
              <Form.Input
                placeholder="Username *"
                name="username"
                value={this.state.username}
                onChange={this.handleOnChange}
              />
              <Form.Input
                placeholder="Firstname"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleOnChange}
              />
              <Form.Input
                placeholder="Lastname"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleOnChange}
              />
              <Form.Input
                placeholder="Password *"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleOnChange}
              />
              <Button fluid type="submit" color="teal">Register</Button>
            </Form>
            <Link to="/">Back to login</Link>
          </Message>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
export default withRouter(connect(
  state => ({
    message: state.sports.message,
    registerSuccess: state.users.registerSuccess,
  }),
  dispatch => (bindActionCreators({
    ...userActions,
  }, dispatch)),
)(Register));
