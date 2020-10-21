import React from 'react'
import {Table} from 'semantic-ui-react'

export default class VeryBasicTableRow extends React.Component {
  render() {
    const cells = [];
    for (let i = 0; i < this.props.columns.length; i++) {
      let style = {};
      if (this.props.columns[i].style) {
        style = this.props.columns[i].style;
      }
      cells.push(
        <Table.Cell style={style} textAlign={this.props.columns[i].rowTextAlign}>
          {this.props.row[this.props.columns[i].key]}
        </Table.Cell>
      );
    }
    return cells;
  }
}