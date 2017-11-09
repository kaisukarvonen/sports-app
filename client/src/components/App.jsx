import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import { Grid, Form, Button, Input } from 'semantic-ui-react';
import SportsTable from './SportsTable';
import { fetchSports, deleteSport, addSport, updateSport } from '../actions/sports';
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
      comments: '',
      filteredData: [],
      filterValue: '',
    };
  }

  componentDidMount() {
    this.props.fetchSports();
  }

  componentWillReceiveProps(nextProps) {
    this.props.sports !== nextProps.sports &&
      this.setState({ filteredData: nextProps.sports });
  }

  handleDeleteRow = (sport) => {
    this.props.deleteSport(sport);
  }

  handleUpdateComments = (sport) => {
    this.props.updateSport(sport);
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleFormSubmit = () => {
    const sport = {
      activityName: this.state.activityName,
      date: new Date(this.state.date),
      duration: this.state.duration,
      comments: this.state.comments,
    };
    this.props.addSport(sport);
  }

  filterData = (e) => {
    this.setState({ filterValue: e.target.value });
    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 20,
      minMatchCharLength: 1,
      keys: [
        'name',
      ],
    };
    const fuse = new Fuse(this.state.filteredData, options);
    let result = fuse.search(e.target.value);
    if (result.length < 1) {
      result = this.props.sports;
    }
    this.setState({ filteredData: result });
}

  render() {
    return (
      <div className="main-container">
        <Grid>
          <Grid.Column width={10}>
            <Input
              placeholder="Filter activities by name..."
              icon="search"
              value={this.state.filterValue}
              onChange={this.filterData}
              fluid
            />
            {this.state.filteredData.length > 0 &&
              <SportsTable
                sports={this.state.filteredData}
                deleteRow={this.handleDeleteRow}
                updateComments={this.handleUpdateComments}
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
                label="Comments"
                placeholder="Comments"
                name="comments"
                value={this.state.comments}
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
    updateSport(sport) {
      dispatch(updateSport(sport));
    },
  }),
)(App);

App.propTypes = propTypes;
App.defaultProps = defaultProps;
