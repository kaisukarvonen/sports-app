import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Sticky, Tab } from 'semantic-ui-react';
import * as sportsActions from '../dux/sports';
import * as userActions from '../dux/users';
import AddForm from './AddForm';
import SportsList from './SportsList';

const propTypes = {
};

const defaultProps = {
};

const Navigation = props => (
  <div className="main-container">
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
    />

    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={
          [
            { menuItem: 'Activities', render: () => <Tab.Pane attached={false}><SportsList {...props} /></Tab.Pane> },
            { menuItem: 'Add new', render: () => <Tab.Pane attached={false}><AddForm {...props} /></Tab.Pane> },
            { menuItem: 'Statistics', render: () => <Tab.Pane attached={false}>Todo</Tab.Pane> },
          ]
        }
    />
    <Button
      content="Log out"
      color="teal"
      icon="sign out"
      size="mini"
      labelPosition="right"
      onClick={props.logout}
      style={{ bottom: '20px', margin: '0 auto', position: 'absolute', right: '30px' }}
    />
  </div>
);


Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
export default connect(
  state => ({
    message: state.sports.message,
    sports: state.sports.sports,
  }),
  dispatch => (bindActionCreators({
    ...sportsActions,
    ...userActions,
  }, dispatch)),
)(Navigation);
