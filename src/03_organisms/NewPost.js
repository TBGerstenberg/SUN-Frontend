import i18next from "i18next";
import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Modal,
  TextArea
} from "semantic-ui-react";

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      type: 0,
      hoursPerWeek: "",
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
          <Modal.Header>{i18next.t("new-post-modal-headline")}</Modal.Header>
          <Modal.Description>
            <Form>
              <TextArea
                onChange={this.updateInputTheme}
                placeholder={i18next.t(
                  "new-post-modal-topic-textArea-placeholder"
                )}
                style={{ minHeight: 40 }}
              />
              <TextArea
                placeholder={i18next.t(
                  "new-post-modal-content-textArea-placeholder"
                )}
                style={{ minHeight: 400 }}
                onChange={this.handleContentInputChange}
              />

              <Grid>
                <Grid.Row>
                  <Grid.Column width={16}>
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
                            text: i18next.t(
                              "posttype-dropdown-default-option-text"
                            ),
                            value: 0
                          },
                          {
                            key: 1,
                            text: i18next.t(
                              "posttype-dropdown-jobOffer-option-text"
                            ),
                            value: 1
                          },
                          {
                            key: 3,
                            text: i18next.t(
                              "posttype-dropdown-thesis-option-text"
                            ),
                            value: 3
                          }
                        ]}
                        placeholder={i18next.t(
                          "new-post-modal-postType-dropdown-placeholder"
                        )}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    {this.state.selectedType === 1 &&
                      this.renderHoursPerWeekInput()}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Modal.Description>
          <Modal.Actions>
            <Button secondary onClick={this.props.onAbortButtonClick}>
              {i18next.t("new-post-modal-abort-button-label")}
            </Button>
            <Button
              onClick={() => {
                const newPost = {
                  title: this.state.title,
                  content: this.state.content,
                  type: this.state.selectedType
                };

                // This post is a joboffer, include type specific fields
                if (this.state.selectedType === 1) {
                  newPost.address = {};
                  newPost.hoursPerWeek = this.state.hoursPerWeek;
                  // This post is a thesis-anouncement, include type specific fields in the post
                } else if (this.state.selectedType === 3) {
                }

                this.props.onNewPost(newPost);

                this.setState({
                  title: "",
                  content: "",
                  value: "",
                  hoursPerWeek: ""
                });
              }}
              color="teal"
              icon
            >
              {i18next.t("new-post-modal-post-button-label")}
              <Icon name="mail forward" />
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

  renderHoursPerWeekInput() {
    return (
      <Input
        value={this.state.hoursPerWeek}
        onChange={(e, { value }) => {
          console.log(e);
          console.log(value);
          this.setState({
            hoursPerWeek: value
          });
        }}
        style={{ marginLeft: "20px", marginBottom: "20px" }}
        placeholder={i18next.t("new-post-modal-hoursPerWeekInput-placeholder")}
      >
        <input type="number" />
        <Label basic>
          {i18next.t("new-post-modal-hoursPerWeekInput-metric-label")}
        </Label>
      </Input>
    );
  }
}

export default NewPostModal;
