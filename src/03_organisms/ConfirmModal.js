import { Button, Header, Icon, Modal } from "semantic-ui-react";
import React, { Component } from "react";

class ConfirmModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={<Button primary>Abonnieren</Button>}
      >
        <Modal.Header />
        <Modal.Content>
          <p
            style={{
              fontFamily: "bold",
              fontSize: "14pt"
            }}
          >
            Erfolgreich Abonniert!
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Alles klar"
            onClick={this.close}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ConfirmModal;
