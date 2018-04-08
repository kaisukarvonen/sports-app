import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import _ from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-day-picker/lib/style.css';
import { Input, Button, Modal, Icon, Form, Responsive, Header, Dropdown, Grid } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate } from 'react-day-picker/moment';
import Statistics from './Statistics';
import SportsTable from './SportsTable';
import MobileSportsList from './MobileSportsList';

const propTypes = {
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

class SportsList extends React.Component {
  state = {
    filteredData: [],
    filterValue: '',
    modalOpen: false,
    start: moment().subtract(1, 'month').startOf('month'),
    end: moment().endOf('month'),
    active: 'Activities',
    showMonths: 2,
  };

  componentDidMount() {
    this.props.fetchSports(this.state.start.toDate(), this.state.end.toDate());
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (this.props.sports !== nextProps.sports) {
      this.setState({ filteredData: nextProps.sports });
    }
    if (nextProps.message && nextProps.message !== this.props.message) {
      if (nextProps.message.error) {
        toast.error(nextProps.message.value);
      } else {
        toast.success(nextProps.message.value);
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.showMonths !== this.state.showMonths) {
      this.props.fetchSports(nextState.start.toDate(), nextState.end.toDate());
    }
  }

  onDateChange = (date) => {
    this.setState({ date });
  }

  onDropdownChange = (e, { value }) => {
    if (value !== this.state.showMonths) {
      const start = moment().subtract(value - 1, 'month').startOf('month');
      const end = moment().endOf('month');
      this.setState({ showMonths: value, start, end });
    }
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleFormSubmit = () => {
    const sport = {
      activityName: this.state.activityName,
      date: this.state.date,
      duration: this.state.duration,
      comments: this.state.comments,
    };
    if (sport.activityName === '') {
      // does not work in modal
      // toast.error('Please fill out all mandatory fields!');
    } else {
      this.props.addSport(sport);
      this.toggleModal();
    }
  }

  handleDeleteRow = (sport) => {
    this.props.deleteSport(sport);
  }

  handleUpdateComments = (sport) => {
    this.props.updateSport(sport);
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

  sortBy = (category) => {
    let filtered = _.orderBy(this.props.sports, s => s[category].toLowerCase(), ['desc']);
    if (_.isEqual(filtered, this.state.filteredData)) {
      filtered = _.orderBy(this.props.sports, s => s[category].toLowerCase(), ['asc']);
    }
    this.setState({ filteredData: filtered });
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen, activityName: '', date: new Date(), duration: 1, comments: '',
    });
  }


  formatDuration = (d) => {
    let value;
    let minutes = '';
    const minuteValues = { 25: '15', 5: '30', 75: '45' };
    const parts = (`${d}`).split('.');
    if (d % 1 !== 0) {
      minutes = `${minuteValues[parts[1]]} min`;
    }
    if (d >= 1) {
      value = `${parts[0]} h ${minutes}`;
    } else {
      value = `${minutes}`;
    }
    return value;
  }

  render() {
    const start = `${this.state.start.month() + 1}/${this.state.start.year()}`;
    const end = `${this.state.end.month() + 1}/${this.state.end.year()}`;
    return (
      <div>
        { this.state.active === 'Activities' ?
          <div>
            <Header as="h4">Activities in {`${start} - ${end}`}</Header>
            <Grid columns={2} stackable className="compact">
              <Grid.Column width={9}>
                <Dropdown
                  floating
                  options={[
                    {
                      key: 2, text: '2 months', value: 2, selected: this.state.showMonths === 2,
                    },
                    {
                      key: 4, text: '4 months', value: 4, selected: this.state.showMonths === 4,
                    },
                    {
                      key: 6, text: '6 months', value: 6, selected: this.state.showMonths === 6,
                    },
                  ]}
                  text={`Show: ${this.state.showMonths} months`}
                  value={this.state.showMonths}
                  onChange={this.onDropdownChange}
                  style={{ marginRight: '8px', paddingTop: '3px' }}
                />
                <Input
                  placeholder="Filter activities by name..."
                  icon="search"
                  value={this.state.filterValue}
                  onChange={this.filterData}
                  style={{ width: '40%', minWidth: '250px', marginBottom: '5px' }}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <div className="statistics">
                  <Button
                    icon="bar chart"
                    content="Statistics"
                    color="teal"
                    size="tiny"
                    labelPosition="right"
                    onClick={() => this.setState({ active: 'Statistics' })}
                  />
                </div>
                <Modal
                  size="small"
                  dimmer="blurring"
                  open={this.state.modalOpen}
                  onClose={this.toggleModal}
                  trigger={
                    <Button
                      content="Add new"
                      color="teal"
                      icon="add"
                      size="tiny"
                      labelPosition="right"
                      onClick={this.toggleModal}
                      className="add"
                    />
                      }
                >
                  <Modal.Header>Add new activity
                    <Icon name="close" link onClick={this.toggleModal} style={{ float: 'right' }} />
                  </Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={this.handleFormSubmit}>
                      <Form.Input
                        label="Sport activity *"
                        placeholder="Activity name"
                        name="activityName"
                        value={this.state.activityName}
                        onChange={this.handleOnChange}
                      />
                      <Form.Group widths="equal">
                        <div style={{ marginLeft: '6px' }}>
                          <p style={{ fontSize: '0.92em', fontWeight: '600', marginBottom: 0 }} >Date *</p>
                          <DayPickerInput
                            formatDate={formatDate}
                            onDayChange={this.onDateChange}
                            value={this.state.date}
                            format="DD.MM.YYYY"
                            inputProps={{
                                    readOnly: true,
                                  }}
                            dayPickerProps={{
                                    selectedDays: this.state.date,
                                    disabledDays: { after: new Date() },
                                    firstDayOfWeek: 1,
                                  }}
                          />
                        </div>
                        <Form.Input
                          label="Duration (hrs) *"
                          placeholder="Duration"
                          type="number"
                          min={0.25}
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
                        rows={2}
                        autoHeight
                        value={this.state.comments}
                        onChange={this.handleOnChange}
                      />
                      <Button type="submit" color="teal">Save</Button>
                    </Form>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            </Grid>
            <Responsive
              minWidth={790}
            >
              {this.state.filteredData.length > 0 &&
              <SportsTable
                sports={this.state.filteredData}
                deleteRow={this.handleDeleteRow}
                updateComments={this.handleUpdateComments}
                sortBy={this.sortBy}
                formatDuration={this.formatDuration}
              />
            }
            </Responsive>
            <Responsive
              maxWidth={790}
            >
              {this.state.filteredData.map(sport =>
            (<MobileSportsList
              key={sport._id}
              sport={sport}
              deleteRow={this.handleDeleteRow}
              formatDuration={this.formatDuration}

            />
              ))
          }
            </Responsive>
          </div>
          :
          <Statistics
            showMonths={4}
            fetchSports={this.props.fetchSports}
            sports={this.props.sports}
            backToActivities={() => this.setState({ active: 'Activities' })}
          />
      }
      </div>
    );
  }
}


SportsList.propTypes = propTypes;
SportsList.defaultProps = defaultProps;
export default SportsList;
