import React, { Component } from "react";
import {
  Button,
  Icon,
  Modal,
  Form,
  TextArea,
  Checkbox
} from "semantic-ui-react";

class NewPostConfirmedModal extends Component {
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
        trigger={
          <Button onClick={this.props.onNewPostButtonClicked} color="teal" icon>
            Posten <Icon name="mail forward" />
          </Button>
        }
      >
        <Modal.Header />
        <Modal.Content>
          <p
            style={{
              fontFamily: "bold",
              fontSize: "14pt"
            }}
          >
            Der Beitrag wurde geposted
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

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      content: ""
    };

    this.updateInputTheme = this.updateInputTheme.bind(this);
    this.updateInputContent = this.updateInputContent.bind(this);
  }

  render() {
    return (
      <div>
        <Modal trigger={<Button color="teal">Neuer Post</Button>}>
          <Modal.Header>Neuer Post</Modal.Header>
          <Modal.Description>
            <Form>
              <TextArea
                onChange={this.updateInputTheme}
                placeholder="Job- oder Gründungsthema"
                style={{ minHeight: 40 }}
              />
              <TextArea
                onChange={this.updateInputContent}
                placeholder="Beschreibung"
                style={{ minHeight: 300 }}
              />
            </Form>

            <Checkbox label="Job" />
            <Checkbox label="Normal" />
            <Checkbox label="Gründungsidee" />
          </Modal.Description>
          <Modal.Actions>
            <NewPostConfirmedModal
              onNewPostButtonClicked={() => {
                this.props.onNewPost(this.state.subject);
              }}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  updateInputTheme(event) {
    this.setState({
      subject: event.target.value
    });
  }

  updateInputContent(event) {
    this.setState({
      content: event.target.value
    });
  }
}

export default NewPostModal;
