import i18next from "i18next";
import React, { Component } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import ErrorMessage from "../01_atoms/ErrorMessage";
import PersonChairRelation from "../models/personChairRelation";
import { chairService } from "../services";
import RoleSelectionDropdown from "./RoleSelectionDropdown";

class ApplyToChairModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRole: "",
      errorMessageShown: false
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
  }

  handleDropdownChange(role) {
    this.setState({ selectedRole: role });
  }

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>
            {i18next.t("chairpage-apply-to-chair-modal-header") +
              this.props.chairName}
          </Modal.Header>
          <Modal.Description>
            <Form>
              <Form.Field style={{ margin: "20px" }}>
                <RoleSelectionDropdown onChange={this.handleDropdownChange} />
              </Form.Field>
            </Form>
            {this.state.errorMessageShown && (
              <ErrorMessage
                header={i18next.t(
                  "chairpage-apply-to-chair-modal-error-headline"
                )}
                body={i18next.t("chairpage-apply-to-chair-modal-error-body")}
              />
            )}
          </Modal.Description>
          <Modal.Actions>
            <Button secondary onClick={this.props.onAbortButtonClick}>
              {i18next.t("chairpage-apply-to-chair-modal-abort-button-label")}
            </Button>
            <Button onClick={this.handleApplicationSubmit} color="teal" icon>
              {i18next.t("chairpage-apply-to-chair-modal-submit-button-label")}
              <Icon name="mail forward" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  async handleApplicationSubmit() {
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

    const createPersonChairRelationRequest = await chairService.createPersonChairRelation(
      this.props.chairId,
      newPersonChairRelation
    );

    if (
      createPersonChairRelationRequest &&
      createPersonChairRelationRequest.status === 200
    ) {
      this.props.onCompleteWithSuccess(createPersonChairRelationRequest.data);
    } else {
      this.setState({ errorMessageShown: true });
    }

    this.setState({
      selectedRole: ""
    });
  }
}

export default ApplyToChairModal;
