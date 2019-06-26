import React, { Component } from "react";
import {
  Button,
  Icon,
  Modal,
  Form,
  TextArea,
  Checkbox
} from "semantic-ui-react";

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      subject: "",
      
    };

    this.updateInputTheme = this.updateInputTheme.bind(this);
    this.handleContentInputChange = this.handleContentInputChange.bind(this);
    this.handleCheckedJob = this.handleCheckedJob.bind(this);
    this.handleCheckedEvent = this.handleCheckedEvent.bind(this);
    this.handleCheckedOther = this.handleCheckedOther.bind(this);
  
  }

  render() {
    return (
      <div>
        <Modal   open={this.props.open} >
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
            </Form>
            <Checkbox
              defaultChecked={false}
              onChange={this.handleCheckedJob}
              label="Job"
              checked={this.state.isCheckedJob}
            />
            <Checkbox
              defaultChecked={false}
              onChange={this.handleCheckedEvent}
              label="Event"
              checked={this.state.isCheckedEvent}
            />
            <Checkbox
              defaultChecked={false}
              onChange={this.handleCheckedOther}
              label="Bachelorarbeit"
              checked={this.state.isCheckedOther}
            />
            {console.log(this.state.isCheckedJob)}
            {console.log(this.state.isCheckedEvent)}
            {console.log(this.state.isCheckedOther)}
          </Modal.Description>
          <Modal.Actions>
            <Button secondary onClick = {this.props.onAbortButtonClick}
            > Abbrechen </Button>
            <Button
              onClick={() => {
                const newPost = {
                  title: this.state.title,
                  content: this.state.content,
                  subject: this.state.subject
                };

                
{//* @ToDo: Hier wird die Server Anfrage reingeschickt 
}




                this.props.onNewPost(newPost);

                this.setState({
                  isCheckedJob: false,
                  isCheckedEvent: false,
                  isCheckedOther: false,
                  title: "",
                  content:""
                  
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

  handleCheckedJob() {
    this.setState({
      isCheckedJob: !this.state.isCheckedJob,
      subject: "Jobpost"
    });
  }

  handleCheckedEvent() {
    this.setState({
      isCheckedEvent: !this.state.isCheckedEvent,
      subject: "Eventpost"
    });
  }
  handleCheckedOther() {
    this.setState({
      isCheckedOther: !this.state.isCheckedOther,
      subject: "Otherpost"
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
