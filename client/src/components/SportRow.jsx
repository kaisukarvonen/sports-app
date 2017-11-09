import React from 'react';
import { Table, Icon, TextArea, Form } from 'semantic-ui-react';

import moment from 'moment';

class SportRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsValue: this.props.sport.comments,
      editMode: false,
    };
  }

  handleDeleteRow = () => {
    this.props.deleteRow(this.props.sport);
  }

  handleOnChange = (e) => {
    this.setState({ commentsValue: e.target.value });
  }

  changeEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  saveCommentsChange = () => {
    const updatedSport = Object.assign({}, this.props.sport,
      { comments: this.state.commentsValue });
    this.props.updateComments(updatedSport);
    this.changeEditMode();
  }

  render() {
    const { sport } = this.props;

    return (
      <Table.Row>
        <Table.Cell>{sport.name}</Table.Cell>
        <Table.Cell>{moment(sport.date).format('DD.MM.YYYY')}</Table.Cell>
        <Table.Cell>{`${sport.duration} hours`}</Table.Cell>
        { !this.state.editMode ?
          <Table.Cell>
            {sport.comments}
            <Icon
              name="edit"
              style={{ cursor: 'pointer', paddingLeft: '9px' }}
              onClick={this.changeEditMode}
            />
            <Icon
              circular
              name="remove"
              color="red"
              onClick={this.handleDeleteRow}
              style={{ float: 'right', cursor: 'pointer' }}
            />
          </Table.Cell>
          :
          <Table.Cell>
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
                color="green"
                onClick={this.saveCommentsChange}
                style={{ float: 'right', cursor: 'pointer', marginTop: '6px' }}
              />
              <Icon
                circular
                name="undo"
                onClick={this.changeEditMode}
                style={{ float: 'right', cursor: 'pointer', marginTop: '6px' }}
              />
            </Form>
          </Table.Cell>
        }

      </Table.Row>
    );
  }
}

export default SportRow;
