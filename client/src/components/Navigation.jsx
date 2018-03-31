import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Tab, Responsive, Segment } from 'semantic-ui-react';
import * as sportsActions from '../dux/sports';
import * as userActions from '../dux/users';
import AddForm from './AddForm';
import SportsList from './SportsList';

const propTypes = {
};

const defaultProps = {
};

class Navigation extends React.Component {
  logout = () => {
    delete window.sessionStorage.token;
    this.props.logout();
  }

  render() {
    return (
      <div className="main-container">
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
        />
        <Responsive
          minWidth={790}
          as={Tab}
          menu={{ secondary: true, pointing: true }}
          style={{ marginBottom: '22px' }}
          panes={
            [
              {
                menuItem: 'Activities',
                render: () =>
              (
                <Tab.Pane attached={false}>
                  <SportsList
                    sports={this.props.sports}
                    message={this.props.message}
                    fetchSports={this.props.fetchSports}
                    deleteSport={this.props.deleteSport}
                    addSport={this.props.addSport}
                    updateSport={this.props.updateSport}
                  />
                </Tab.Pane>
            ) },
              { menuItem: 'Statistics', render: () => <Tab.Pane attached={false}>Todo</Tab.Pane> },
            ]
          }
        />
        <Responsive
          maxWidth={790}
          as={Segment}
        >
          <SportsList
            sports={this.props.sports}
            message={this.props.message}
            fetchSports={this.props.fetchSports}
            deleteSport={this.props.deleteSport}
            addSport={this.props.addSport}
            updateSport={this.props.updateSport}
          />
        </Responsive>
        <Button
          content="Log out"
          color="teal"
          icon="sign out"
          size="mini"
          labelPosition="right"
          onClick={this.logout}
          style={{
            bottom: '12px', margin: '0 auto', position: 'fixed', right: '15px',
          }}
        />
      </div>
    );
  }
}


Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
export default withRouter(connect(
  state => ({
    message: state.sports.message,
    sports: state.sports.sports,
  }),
  dispatch => (bindActionCreators({
    ...sportsActions,
    ...userActions,
  }, dispatch)),
)(Navigation));
