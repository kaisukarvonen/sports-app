import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import moment from 'moment';

class SportRow extends React.Component {
  handleDeleteRow = () => {
    this.props.deleteRow(this.props.sport);
  }

  render() {
    const { sport } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{sport.name}</Table.Cell>
        <Table.Cell>{moment(sport.date).format('DD.MM.YYYY')}</Table.Cell>
        <Table.Cell>{`${sport.duration} hours`}</Table.Cell>
        <Table.Cell>
          {sport.comments}
          <Icon
            circular
            name="remove"
            color="red"
            onClick={this.handleDeleteRow}
            style={{ float: 'right', cursor: 'pointer' }}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default SportRow;
