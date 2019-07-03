import i18next from "i18next";
import React, { Component } from "react";
import { Button, Form, Icon, Modal, TextArea } from "semantic-ui-react";

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      type: 0,

      open: false,
      selectedType: 0
    };

    this.updateInputTheme = this.updateInputTheme.bind(this);
    this.handleContentInputChange = this.handleContentInputChange.bind(this);
    this.handleRadioButtonsChecked = this.handleRadioButtonsChecked.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open != prevState.open) {
      return {
        jobChecked: false,
        thesisChecked: true,
        open: nextProps.open
      };
    } else {
      return prevState;
    }
  }

  render() {
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

              <Form.Field style={{ margin: "20px" }}>
                <Form.Select
                  defaultValue={0}
                  label={"Art des Beitrags"}
                  name={"PostTypeSelector"}
                  onBlur={(e, { value }) => {}}
                  onChange={(e, { value }) => {
                    this.setState({ selectedType: value });
                  }}
                  options={[
                    {
                      key: 0,
                      text: i18next.t("posttype-dropdown-default-option-text"),
                      value: 0
                    },
                    {
                      key: 1,
                      text: i18next.t("posttype-dropdown-jobOffer-option-text"),
                      value: 1
                    },
                    {
                      key: 3,
                      text: i18next.t("posttype-dropdown-thesis-option-text"),
                      value: 3
                    }
                  ]}
                  placeholder={"Beitragsart wählen"}
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
                const newPost = {
                  title: this.state.title,
                  content: this.state.content,
                  type: this.state.selectedType
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
