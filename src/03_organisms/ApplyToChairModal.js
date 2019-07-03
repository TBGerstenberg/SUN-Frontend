import React, { Component } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import PersonChairRelation from "../models/personChairRelation";
import { chairService } from "../services";
import RoleSelectionDropdown from "./RoleSelectionDropdown";
import ErrorMessage from "../01_atoms/ErrorMessage";

class ApplyToChairModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRole: "",
      errorMessageShown: false,
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(role) {
    this.setState({ selectedRole: role });
  }

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>
            {" "}
            {"Neue Bewerbung am Lehrstuhl " + this.props.chairName}{" "}
          </Modal.Header>
          <Modal.Description>
            <Form>
              <Form.Field style={{ margin: "20px" }}>
                <RoleSelectionDropdown onChange={this.handleDropdownChange} />
              </Form.Field>
            </Form>
            {this.state.errorMessageShown && <ErrorMessage header={"Fehler"} body={"Bewerbung konnte nicht abgeschickt werden, bitte versuchen Sie es später erneut"}/>}
          </Modal.Description>
          <Modal.Actions>
            <Button secondary onClick={this.props.onAbortButtonClick}>
              {" "}
              Abbrechen{" "}
            </Button>
            <Button
              onClick={() => {
                console.log(this.state);

                const newPersonChairRelationValues = {
                  personId: this.props.personId,
                  chairId: this.props.chairId,
                  role: this.state.selectedRole,
                  isActive: false,
                  chairAdmin: false
                };

                const newPersonChairRelation = new PersonChairRelation(
                  newPersonChairRelationValues
                );

                const createPersonChairRelationRequest = chairService.createPersonChairRelation(
                  this.props.chairId,
                  newPersonChairRelation
                );

                if (createPersonChairRelationRequest.response && createPersonChairRelationRequest.response.status === 200) {
                  this.props.onCompleteWithSuccess(
                    createPersonChairRelationRequest.data
                  );
                } else {
                  this.setState({errorMessageShown: true});
                }

                this.setState({
                  selectedRole: ""
                });
              }}
              color="teal"
              icon
            >
              Bewerbung abschicken <Icon name="mail forward" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ApplyToChairModal;
