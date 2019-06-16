import { Button, Modal } from "semantic-ui-react";
import React, { Component } from "react";

class AddEntityModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        onOpen={this.props.onOpen()}
        onClose={this.props.onClose()}
        size={this.props.size}
        trigger={<Button primary>{this.props.buttonContent}</Button>}
      >
        <Modal.Header />
        <Modal.Content>{this.props.modalContent}</Modal.Content>
      </Modal>
    );
  }
}

export default AddEntityModal;
