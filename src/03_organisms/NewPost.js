import React, { Component } from "react";
import { Button, Icon, Modal, Form, TextArea, Radio } from "semantic-ui-react";
import postTypeEnum from "../models/enumerations/postTypeEnum";

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      type: 0,
      value: ""
    };

    this.updateInputTheme = this.updateInputTheme.bind(this);
    this.handleContentInputChange = this.handleContentInputChange.bind(this);
    this.handleRadioButtonsChecked = this.handleRadioButtonsChecked.bind(this);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Neuer Post</Modal.Header>
          <Modal.Description>
            <Form>
              <TextArea
                onChange={this.updateInputTheme}
                placeholder="Thema"
                style={{ minHeight: 40 }}
              />
              <TextArea
                placeholder="Beschreibung"
                style={{ minHeight: 400 }}
                onChange={this.handleContentInputChange}
              />

              <Form.Field>
                <Radio
                  id="job"
                  label="Jobausschreibung"
                  value="job"
                  checked={this.state.value === "job"}
                  onChange={(e, { value }) => {
                    this.setState({ value });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  id="thesis"
                  label="Abschlussarbeit"
                  value="thesis"
                  checked={this.state.value === "thesis"}
                  onChange={(e, { value }) => {
                    this.setState({ value });
                  }}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
          <Modal.Actions>
            <Button secondary onClick={this.props.onAbortButtonClick}>
              {" "}
              Abbrechen{" "}
            </Button>
            <Button
              onClick={() => {
                let type = 0;
                if (this.state.value === "job") {
                  type = 1;
                } else if (this.state.value === "thesis") {
                  type = 3;
                }

                const newPost = {
                  title: this.state.title,
                  content: this.state.content,
                  type: type
                };

                this.props.onNewPost(newPost);

                this.setState({
                  title: "",
                  content: "",
                  value: ""
                });
              }}
              color="teal"
              icon
            >
              Posten <Icon name="mail forward" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  handleRadioButtonsChecked(event, { value }) {
    this.setState({
      radioButtonValue: value
    });
  }

  updateInputTheme(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleContentInputChange(event) {
    this.setState({ content: event.target.value });
  }
}

export default NewPostModal;
