import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import SportRow from './SportRow';

const SportsTable = (props) => {
  const rows = props.sports.map(sport => (
    <SportRow
      key={sport._id}
      sport={sport}
      deleteRow={props.deleteRow}
      updateComments={props.updateComments}
      formatDuration={props.formatDuration}

    />
  ));


  return (
    <Table basic="very" compact="very" className="activity-list" style={{ paddingTop: '15px'}}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Sport activity <Icon link name="sort" onClick={() => props.sortBy('name')} /></Table.HeaderCell>
          <Table.HeaderCell>Date <Icon link name="sort" onClick={() => props.sortBy('date')} /></Table.HeaderCell>
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
