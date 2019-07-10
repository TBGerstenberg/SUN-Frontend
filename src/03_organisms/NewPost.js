import i18next from "i18next";
import moment from "moment";
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
import DateInput from "../03_organisms/DateInput";

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      type: 0,
      hoursPerWeek: "",
      open: false,
      selectedType: 0,
      startDate: "",
      endDate: ""
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
                <Grid.Row style={{ margin: "20px" }}>
                  {this.state.selectedType === 1 &&
                    this.renderHoursPerWeekInput()}

                  {this.state.selectedType === 3 && this.renderDateInputs()}
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
                  newPost.startDate = moment(
                    this.state.startDate,
                    "DD.MM.YYYY"
                  ).format();
                  newPost.endDate = moment(
                    this.state.endDate,
                    "DD.MM.YYYY"
                  ).format();
                }

                this.props.onNewPost(newPost);

                this.setState({
                  title: "",
                  content: "",
                  value: "",
                  hoursPerWeek: "",
                  startDate: "",
                  endDate: ""
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

  renderDateInputs() {
    return (
      <>
        <Grid.Column width={8}>
          <DateInput
            name="startDate"
            placeholder={i18next.t("new-event-modal-startdate-placeholder")}
            value={this.state.startDate}
            iconPosition="left"
            onChange={(e, { value }) => {
              this.setState({ startDate: value });
            }}
            label={i18next.t("new-event-modal-startdate-label")}
            dateTimeFormat={"DD.MM.YYYY"}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <DateInput
            name="endDate"
            placeholder={i18next.t("new-event-modal-enddate-placeholder")}
            value={this.state.endDate}
            iconPosition="left"
            onChange={(e, { value }) => {
              this.setState({ endDate: value });
            }}
            label={i18next.t("new-event-modal-enddate-label")}
            dateTimeFormat={"DD.MM.YYYY"}
          />
        </Grid.Column>
      </>
    );
  }

  renderHoursPerWeekInput() {
    return (
      <Grid.Column width={16}>
        <Input
          value={this.state.hoursPerWeek}
          onChange={(e, { value }) => {
            this.setState({
              hoursPerWeek: value
            });
          }}
          style={{ marginLeft: "20px", marginBottom: "20px" }}
          placeholder={i18next.t(
            "new-post-modal-hoursPerWeekInput-placeholder"
          )}
        >
          <input type="number" />
          <Label basic>
            {i18next.t("new-post-modal-hoursPerWeekInput-metric-label")}
          </Label>
        </Input>
      </Grid.Column>
    );
  }
}

export default NewPostModal;
