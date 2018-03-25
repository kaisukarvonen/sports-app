import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Grid, Input, Icon, Dropdown } from 'semantic-ui-react';
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
    let filtered;
    if (category === 'date') {
      filtered = _.orderBy(this.props.sports, s => s[category], ['desc']);
    } else {
      filtered = _.sortBy(this.props.sports, s => s[category].toLowerCase());
    }
    this.setState({ filteredData: filtered });
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Filter activities by name..."
          icon="search"
          value={this.state.filterValue}
          onChange={this.filterData}
          style={{ width: '50%', minWidth: '100px' }}
        />
        {this.state.filteredData.length > 0 &&
          <SportsTable
            sports={this.state.filteredData}
            deleteRow={this.handleDeleteRow}
            updateComments={this.handleUpdateComments}
            sortBy={this.sortBy}
          />
            }
      </div>
    );
  }
}


SportsList.propTypes = propTypes;
SportsList.defaultProps = defaultProps;
export default SportsList;
