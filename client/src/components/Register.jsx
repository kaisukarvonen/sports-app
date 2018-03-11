import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Form, Button, Header, Message } from 'semantic-ui-react';


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
    console.log(nextProps);
    if (nextProps.message && nextProps.message.error) {
      toast.error(nextProps.message.value);
    } else if (nextProps.registerSuccess) {
      this.props.history.push('/login');
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
          </Message>
        </Grid>
      </div>
    );
  }
}

export default Register;
