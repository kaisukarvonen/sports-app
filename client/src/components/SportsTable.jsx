import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import SportRow from './SportRow';

const SportsTable = (props) => {
  const rows = props.sports.map(sport => (
    <SportRow
      key={sport._id}
      sport={sport}
      deleteRow={props.deleteRow}
    />
  ));

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Activity</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
          <Table.HeaderCell>Additional info</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  );
};

export default SportsTable;
