import { Line } from 'react-chartjs-2';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { Header, Icon, Responsive } from 'semantic-ui-react';

const propTypes = {
  sports: PropTypes.array.isRequired,
};

const defaultProps = {
};

class Statistics extends React.Component {
  state = {
    start: moment().startOf('month').subtract(5, 'months'),
    end: moment().endOf('month'),
    lastMonth: moment(),
    showMonths: 6,
  };

  componentWillMount() {
    // console.log(this.state.start);
    this.props.fetchSports(this.state.start.toDate(), this.state.end.toDate());
  }

  createLabels = (date) => {
    const labels = [];
    for (let i = 0; i < this.state.showMonths; i++) {
      labels.push(moment(date).subtract(i, 'months').format('MMMM'));
    }
    return _.reverse(labels);
  }

  createData = (sports) => {
    const data = new Array(this.state.showMonths).fill(0);
    const months = [];
    for (let i=0; i < this.state.showMonths; i++) {
      months.push(moment(this.state.lastMonth).subtract(i, 'months').month());
    }
    months.reverse();
    sports.forEach((sport) => {
      const index = months.indexOf(moment(sport.date).month());
      // console.log(months.indexOf(moment(sport.date).month()));
      data[index] += sport.duration;
    });
    return data;
  }


  render() {
    const { sports } = this.props;
    this.createData(sports);
    return (
      <div>
        <Header as="h4" className="custom" style={{ float: 'left'}}>Your activity in the past 6 months</Header>
        <Responsive
          maxWidth={790}
          as={Icon}
          name="chevron left"
          className="back"
          circular
          onClick={this.props.backToActivities}
        />
        <Line data={{
          labels: this.createLabels(this.state.lastMonth),
          datasets: [
            {
              label: 'Activities by hours',
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.createData(this.props.sports),
            },
          ],
        }}
        />
      </div>
    );
  }
}


Statistics.propTypes = propTypes;
Statistics.defaultProps = defaultProps;
export default Statistics;
