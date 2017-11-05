import React from 'react';
import { Table } from 'semantic-ui-react';
import SportRow from './SportRow';

const SportsTable = (props) => {
  const rows = props.sports.map(sport => (
    <SportRow
      key={sport._id}
      sport={sport}
      deleteRow={props.deleteRow}
      updateComments={props.updateComments}
    />
  ));

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Sport activity</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
          <Table.HeaderCell>Comments</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  );
};

export default SportsTable;
