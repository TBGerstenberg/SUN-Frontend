import i18next from "i18next";
import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class ConfirmModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
        size="small"
      >
        <Modal.Header />
        <Modal.Content>
          <p
            style={{
              fontFamily: "bold",
              fontSize: "14pt"
            }}
          >
            {this.props.content}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content={i18next.t("confirmModal-accept-button-text")}
            onClick={this.props.onClose}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ConfirmModal;
