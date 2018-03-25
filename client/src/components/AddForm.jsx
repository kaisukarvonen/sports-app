import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Form, Button, Header, Container, Popup } from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


const propTypes = {
  addSport: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

const defaultProps = {
};

class AddForm extends React.Component {
  state = {
    activityName: '',
    date: moment(),
    duration: 1,
    comments: '',
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message !== this.props.message) {
      if (nextProps.message.error) {
        toast.error(nextProps.message.value);
      } else {
        toast.success(nextProps.message.value);
      }
    }
  }

  onDateChange = (date) => {
    this.setState({ date: moment(date), open: !this.state.open });
  }
  handleOnChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  toggleDatePicker = () => {
    this.setState({ open: !this.state.open });
  }


  handleFormSubmit = () => {
    const sport = {
      activityName: this.state.activityName,
      date: new Date(this.state.date),
      duration: this.state.duration,
      comments: this.state.comments,
    };
    if (sport.activityName === '' || sport.duration == 0) {
      toast.error('Please fill out all mandatory fields!');
    } else {
      this.props.addSport(sport);
      this.setState({ activityName: '', comments: '' });
    }
  }

  render() {
    // console.log(this.props.sports);
    return (
      <Container style={{ width: '550px' }}>
        <Header as="h3">Add new sports activity</Header>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input
            label="Sport activity *"
            placeholder="Activity name"
            name="activityName"
            value={this.state.activityName}
            onChange={this.handleOnChange}
          />
          <Form.Group widths="equal" style={{ maxWidth: '500px' }}>
            <Popup
              on="click"
              position="top left"
              open={this.state.open}
              onClose={this.toggleDatePicker}
              onOpen={this.toggleDatePicker}
              trigger={
                <Form.Input
                  label="Date *"
                  icon="calendar"
                  name="date"
                  value={this.state.date.format('DD.MM.YYYY')}
                  onChange={this.handleOnChange}
                />
             }
              content={
                <DayPicker
                  onDayClick={this.onDateChange}
                  value={this.state.date.toDate()}
                  selectedDays={this.state.date.toDate()}
                  disabledDays={{ after: new Date() }}
                />
             }
            />
            <Form.Input
              label="Duration (hrs) *"
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
            rows={2}
            autoHeight
            value={this.state.comments}
            onChange={this.handleOnChange}
          />
          <Button type="submit" color="teal">Save</Button>
        </Form>
      </Container>
    );
  }
}


AddForm.propTypes = propTypes;
AddForm.defaultProps = defaultProps;
export default AddForm;
