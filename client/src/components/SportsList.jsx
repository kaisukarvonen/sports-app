import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Form, Button, Input, Message, Header, Dropdown, Tab } from 'semantic-ui-react';
import SportsTable from './SportsTable';

const propTypes = {
  sports: PropTypes.array,
  fetchSports: PropTypes.func.isRequired,
  deleteSport: PropTypes.func.isRequired,
  updateSport: PropTypes.func.isRequired,
  message: PropTypes.object,
};

const defaultProps = {
  sports: [],
  message: {},
};

class SportsList extends React.Component {
  state = {
    filteredData: [],
    filterValue: '',
    sortValue: 'date',
  };

  componentDidMount() {
    this.props.fetchSports();
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
    // if (nextProps.loggedOut) {
    //   this.props.history.push('/login');
    // }
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

  logout = () => {
    this.props.logout();
  }

  sortData = (e, { value }) => {
    this.setState({ sortValue: value, filteredData: _.sortBy(this.props.sports, s => s[value]) });
  }

  render() {
    // console.log(this.props.sports);
    return (
      <div>
        <Grid>
          <Grid.Column width={13}>
            <Input
              placeholder="Filter activities by name..."
              icon="search"
              value={this.state.filterValue}
              onChange={this.filterData}
              fluid
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Dropdown
              button
              className="icon"
              labeled
              options={[{ key: 'date', text: 'Date', value: 'date' }, { key: 'name', text: 'Name', value: 'name' }]}
              icon="sort"
              text={_.startCase(_.camelCase(this.state.sortValue))}
              value={this.state.sortValue}
              onChange={this.sortData}
            />
          </Grid.Column>
        </Grid>
        {this.state.filteredData.length > 0 &&
          <SportsTable
            sports={this.state.filteredData}
            deleteRow={this.handleDeleteRow}
            updateComments={this.handleUpdateComments}
          />
            }
      </div>
    );
  }
}


SportsList.propTypes = propTypes;
SportsList.defaultProps = defaultProps;
export default SportsList;
