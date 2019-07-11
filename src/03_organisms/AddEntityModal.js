import React, { Component } from "react";
import { Modal } from "semantic-ui-react";

/**
 * Wrapper around Semantic-UIs Modal-Component allowing to add custom props to the modal.
 * Component that renders a modal that has an externally controlled "open"-state and callbacks onOpen and onClose.
 * @param {*} props
 */
class AddEntityModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
        size={this.props.size}
      >
        <Modal.Content>{this.props.modalContent}</Modal.Content>
      </Modal>
    );
  }
}

export default AddEntityModal;
