import i18next from "i18next";
import moment from "moment";
import React, { Component } from "react";
import { Button, Form, Grid, Icon, Modal, TextArea } from "semantic-ui-react";
import DateTimeInput from "../03_organisms/DateTimeInput";
import postTypeEnum from "../models/enumerations/postTypeEnum";

class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      type: 2,
      startDate: "",
      endDate: ""
    };

    this.updateInputTheme = this.updateInputTheme.bind(this);
    this.handleContentInputChange = this.handleContentInputChange.bind(this);
    this.handleCheckedJob = this.handleCheckedJob.bind(this);
    this.handleCheckedEvent = this.handleCheckedEvent.bind(this);
    this.handleCheckedOther = this.handleCheckedOther.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>{i18next.t("new-event-modal-headline")}</Modal.Header>
          <Modal.Description>
            <Form>
              <Grid>
                <Grid.Row width={16}>
                  <Grid.Column width={16}>
                    <TextArea
                      onChange={this.updateInputTheme}
                      placeholder="Thema"
                      style={{ minHeight: 40 }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <TextArea
                      placeholder="Beschreibung"
                      style={{ minHeight: 400 }}
                      onChange={this.handleContentInputChange}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={8}>
                    <DateTimeInput
                      name="startDate"
                      placeholder={i18next.t(
                        "new-event-modal-startdate-placeholder"
                      )}
                      value={this.state.startDate}
                      iconPosition="left"
                      onChange={this.handleStartDateChange}
                      label={i18next.t("new-event-modal-startdate-label")}
                      dateTimeFormat={"DD.MM.YYYY HH:mm"}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <DateTimeInput
                      name="endDate"
                      placeholder={i18next.t(
                        "new-event-modal-enddate-placeholder"
                      )}
                      value={this.state.endDate}
                      iconPosition="left"
                      onChange={this.handleEndDateChange}
                      label={i18next.t("new-event-modal-enddate-label")}
                      dateTimeFormat={"DD.MM.YYYY HH:mm"}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Modal.Description>
          <Modal.Actions>
            <Button secondary onClick={this.props.onAbortButtonClick}>
              {i18next.t("new-event-modal-abort-button-label")}
            </Button>
            <Button
              onClick={() => {
                const newPost = {
                  title: this.state.title,
                  content: this.state.content,
                  type: 2, // PostTypeEnum value for "event"
                  startDate: moment(
                    this.state.startDate,
                    "DD.MM.YYYY HH:mm"
                  ).format(),
                  endDate: moment(
                    this.state.endDate,
                    "DD.MM.YYYY HH:mm"
                  ).format(),
                  address: {
                    name: "Event Adresse"
                  }
                };

                this.props.onNewPost(newPost);

                this.setState({
                  isCheckedJob: false,
                  isCheckedEvent: false,
                  isCheckedOther: false,
                  title: "",
                  content: "",
                  startDate: "",
                  endDate: ""
                });
              }}
              color="teal"
              icon
            >
              {i18next.t("new-event-modal-submit-button-label")}
              <Icon name="mail forward" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  handleStartDateChange(e, { value }) {
    this.setState({
      startDate: value
    });
  }

  handleEndDateChange(e, { value }) {
    this.setState({
      endDate: value
    });
  }

  handleCheckedJob() {
    this.setState({
      isCheckedJob: !this.state.isCheckedJob,
      type: postTypeEnum["JobOffer"]
    });
  }

  handleCheckedEvent() {
    this.setState({
      isCheckedEvent: !this.state.isCheckedEvent,
      subject: postTypeEnum["Event"]
    });
  }
  handleCheckedOther() {
    this.setState({
      isCheckedOther: !this.state.isCheckedOther,
      subject: postTypeEnum["Default"]
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

export default NewEventModal;
