import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Icon } from 'semantic-ui-react';

const propTypes = {
  sport: PropTypes.object.isRequired,
  deleteRow: PropTypes.func.isRequired,
  formatDuration: PropTypes.func.isRequired,
};

const defaultProps = {
};

class MobileSportsList extends React.Component {
  state = {
  };


  handleDeleteRow = () => {
    this.props.deleteRow(this.props.sport);
  }

  render() {
    const { sport } = this.props;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {sport.name}
            <Icon
              circular
              name="remove"
              size="small"
              color="red"
              onClick={this.handleDeleteRow}
              style={{ float: 'right', cursor: 'pointer' }}
            />
          </Card.Header>
          <Card.Description>
            Date: {moment(sport.date).format('DD.MM.YYYY')}<br />
            Duration: {this.props.formatDuration(sport.duration)}<br />
            {sport.comments}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}


MobileSportsList.propTypes = propTypes;
MobileSportsList.defaultProps = defaultProps;
export default MobileSportsList;
