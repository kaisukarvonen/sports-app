import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Grid, Form, Button, Input } from 'semantic-ui-react';
import SportsTable from './SportsTable';
import { fetchSports, deleteSport, addSport } from '../actions/sports';
import '../css/styles.css';

const propTypes = {
  sports: PropTypes.array,
  fetchSports: PropTypes.func.isRequired,
};

const defaultProps = {
  sports: [],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      date: moment(),
      duration: '',
      details: '',
    };
  }

  componentDidMount() {
    this.props.fetchSports();
  }

  handleDeleteRow = (sport) => {
    this.props.deleteSport(sport);
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleFormSubmit = () => {
    const sport = {
      activityName: this.state.activityName,
      date: new Date(this.state.date),
      duration: this.state.duration,
      details: this.state.details,
    };
    this.props.addSport(sport);
  }

  render() {
    return (
      <div className="main-container">
        <Grid>
          <Grid.Column width={9}>
            {this.props.sports.length > 0 &&
              <SportsTable
                sports={this.props.sports}
                deleteRow={this.handleDeleteRow}
              />
            }
          </Grid.Column>
          <Grid.Column width={6}>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Input
                label="Sport activity"
                placeholder="Activity name"
                name="activityName"
                value={this.state.activityName}
                onChange={this.handleOnChange}
              />
              <Form.Group widths="equal">
                <Form.Input
                  label="Date"
                  icon="calendar"
                  name="date"
                  value={this.state.date.format('DD.MM.YYYY')}
                  onChange={this.handleOnChange}
                />
                <Form.Input
                  label="Duration (hrs)"
                  placeholder="Duration"
                  type="number"
                  min={0}
                  step="0.25"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.handleOnChange}
                />
              </Form.Group>
              <Form.TextArea
                label="Details"
                placeholder="Details"
                name="details"
                value={this.state.details}
                onChange={this.handleOnChange}
              />
              <Button type="submit" color="teal">Save</Button>
            </Form>
          </Grid.Column>
        </Grid>
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
    addSport(sport) {
      dispatch(addSport(sport));
    },
  }),
)(App);

App.propTypes = propTypes;
App.defaultProps = defaultProps;
