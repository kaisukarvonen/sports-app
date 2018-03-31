import React from 'react';
import { Table, Icon, TextArea, Form } from 'semantic-ui-react';

import moment from 'moment';

class SportRow extends React.Component {
  state = {
    commentsValue: this.props.sport.comments,
    editMode: false,
  };

  handleDeleteRow = () => {
    this.props.deleteRow(this.props.sport);
  }

  handleOnChange = (e) => {
    this.setState({ commentsValue: e.target.value });
  }

  handleUndo = () => {
    this.setState({ commentsValue: this.props.sport.comments });
    this.changeEditMode();
  }

  changeEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  saveCommentsChange = () => {
    const updatedSport = { ...this.props.sport, comments: this.state.commentsValue };
    this.props.updateComments(updatedSport);
    this.changeEditMode();
  }

  render() {
    const { sport } = this.props;

    return (
      <Table.Row>
        <Table.Cell width={3}>{sport.name}</Table.Cell>
        <Table.Cell width={3}>{moment(sport.date).format('DD.MM.YYYY')}</Table.Cell>
        <Table.Cell width={2}>{this.props.formatDuration(sport.duration)}</Table.Cell>
        { !this.state.editMode ?
          <Table.Cell width={8}>
            {sport.comments}
            <Icon
              circular
              name="remove"
              size="small"
              color="red"
              onClick={this.handleDeleteRow}
              style={{ float: 'right', cursor: 'pointer' }}
            />
            <Icon
              size="small"
              circular
              name="edit"
              style={{ cursor: 'pointer', float: 'right' }}
              onClick={this.changeEditMode}
            />
          </Table.Cell>
          :
          <Table.Cell width={8}>
            <Form>
              <TextArea
                value={this.state.commentsValue}
                onChange={this.handleOnChange}
                rows={1}
                autoHeight
                style={{ width: '80%' }}
              />
              <Icon
                circular
                name="check"
                size="small"
                color="green"
                onClick={this.saveCommentsChange}
                style={{ float: 'right', cursor: 'pointer', marginTop: '2px' }}
              />
              <Icon
                size="small"
                circular
                name="undo"
                onClick={this.handleUndo}
                style={{ float: 'right', cursor: 'pointer', marginTop: '2px' }}
              />
            </Form>
          </Table.Cell>
        }

      </Table.Row>
    );
  }
}

export default SportRow;
