import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SportsTable from './SportsTable';
import { fetchSports, deleteSport } from '../actions/sports';
import '../css/styles.css';

const propTypes = {
  sports: PropTypes.array,
  fetchSports: PropTypes.func.isRequired,
};

const defaultProps = {
  sports: [],
};

class App extends React.Component {
  componentDidMount() {
    this.props.fetchSports();
  }

  handleDeleteRow = (sport) => {
    this.props.deleteSport(sport);
  }

  render() {
    return (
      <div className="main-container">
        {this.props.sports.length > 0 &&
          <SportsTable
            sports={this.props.sports}
            deleteRow={this.handleDeleteRow}
          />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    sports: state.sports.sports,
    error: state.sports.error,
  }),
  dispatch => ({
    fetchSports() {
      dispatch(fetchSports());
    },
    deleteSport(sport) {
      dispatch(deleteSport(sport));
    },
  }),
)(App);

App.propTypes = propTypes;
App.defaultProps = defaultProps;
