import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Button, Tab, Responsive, Segment } from 'semantic-ui-react';
import * as sportsActions from '../dux/sports';
import * as userActions from '../dux/users';
import SportsList from './SportsList';
import Statistics from './Statistics';

const propTypes = {
  logout: PropTypes.func.isRequired,
  sports: PropTypes.array.isRequired,
  fetchSports: PropTypes.func.isRequired,
  deleteSport: PropTypes.func.isRequired,
  addSport: PropTypes.func.isRequired,
  updateSport: PropTypes.func.isRequired,
  message: PropTypes.object,
};

const defaultProps = {
  message: {},
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
            ),
},
              {
                menuItem: 'Statistics',
                render: () =>
                (
                  <Tab.Pane attached={false}>
                    <Statistics
                      showMonths={6}
                      sports={this.props.sports}
                      fetchSports={this.props.fetchSports}
                    />
                  </Tab.Pane>
              ),
},
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
