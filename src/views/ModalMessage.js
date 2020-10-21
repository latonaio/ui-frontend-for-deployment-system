import React from 'react'
import {Modal} from "semantic-ui-react";

class ModalMessage extends React.Component {
  componentDidMount() {
    this.props.unsetMessage();
  }

  componentWillUnmount() {
    this.props.unsetMessage();
  }

  render() {
    return (
      <Modal
        open={this.props.message !== null}
        onClose={this.props.unsetMessage}
        closeIcon>
        <Modal.Content content={this.props.message}/>
      </Modal>
    );
  }
}


export default ModalMessage;
