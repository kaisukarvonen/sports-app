import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Form, Button, Input, Header, Card, Message } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.min.css';
import '../css/styles.css';

// const propTypes = {
//   sports: PropTypes.array,
//   fetchSports: PropTypes.func.isRequired,
//   deleteSport: PropTypes.func.isRequired,
//   addSport: PropTypes.func.isRequired,
//   updateSport: PropTypes.func.isRequired,
//   message: PropTypes.object,
// };
//
// const defaultProps = {
//   sports: [],
//   message: {},
// };

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.sports);
    return (
      <div className="login-frame">
        <Grid centered textAlign="center">
          <Message className="login-card">
            <Header as="h2" style={{ padding: '12px' }}>Sports App</Header>
            <Form style={{ padding: '7px' }}>
              <Form.Input
                placeholder="Username"
                icon="user"
                name="username"
                iconPosition="left"
                // value={}
                // onChange={this.handleOnChange}
              />
              <Form.Input
                placeholder="Password"
                icon="lock"
                name="username"
                iconPosition="left"
                type="password"
                // value={}
                // onChange={this.handleOnChange}
              />
              <Button fluid type="submit" color="teal">Login</Button>
            </Form>
          </Message>
        </Grid>
      </div>
    );
  }
}

// App.propTypes = propTypes;
// App.defaultProps = defaultProps;
export default Login;
