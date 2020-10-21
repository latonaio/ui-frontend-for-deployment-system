import React from 'react'
import {Table} from 'semantic-ui-react'
import VeryBasicTableRow from './VeryBasicTableRow';

export default class VeryBasicTable extends React.Component {
  render() {
    const headerCells = [];
    for (let i = 0; i < this.props.columns.length; i++) {
      headerCells.push(
        <Table.HeaderCell textAlign={this.props.columns[i].headerTextAlign}
                          width={this.props.columns[i].width}>
          {this.props.columns[i].name}
        </Table.HeaderCell>
      );
    }

    const header = (
      <Table.Row>
        {headerCells}
      </Table.Row>
    );

    const rows = [];
    for (let i = 0; i < this.props.rows.length; i++) {
      rows.push(
        <Table.Row>
          <VeryBasicTableRow columns={this.props.columns} row={this.props.rows[i]}/>
        </Table.Row>
      );
    }
    if (this.props.additionalRow) {
      rows.push(this.props.additionalRow);
    }

    return (
      <Table basic={"very"}>
        <Table.Header>
          {header}
        </Table.Header>
        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    );
  }
}