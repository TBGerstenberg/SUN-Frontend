import React from "react";
import { Grid, Header, Button, Form, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
import i18next from "i18next";
import chairService from "../services/chairService";

import formValidationUtilities from "../utilities/formValidationUtilities";
import { chairActions } from "../redux/_actions";

import CityNameInput from "../02_molecules/CityNameInput";
import StreetNameInput from "../02_molecules/StreetNameInput";
import PostalCodeInput from "../02_molecules/PostalCodeInput";
import HouseNumberInput from "../02_molecules/HouseNumberInput";
import ChairRoleList from "../02_molecules/ChairRoleList";

import Chair from "../models/chair";

class ChairForm extends React.Component {
  constructor(props) {
    super(props);
    const mode = props.chair ? "edit" : "add";
    const chair = props.chair ? new Chair(props.chair) : null;

    console.log(chair);

    this.state = {
      mode: mode,
      chair: chair
    };
  }

  render() {
    const props = this.props;

    return (
      <Form
        onSubmit={props.handleSubmit(this._handleChairFormSubmit.bind(this))}
      >
        <Grid
          container
          textAlign="center"
          verticalAlign="middle"
          colums={2}
          stackable
        >
          {
            // Headline
          }
          <Grid.Row>
            <Header as="h3" color="blue" textAlign="center">
              {this.state.mode === "edit" && (
                <Trans i18nKey="chairmanagement-edit-chair-headline" />
              )}
              {this.state.mode === "add" && (
                <Trans i18nKey="chairmanagement-add-chair-headline" />
              )}
            </Header>
          </Grid.Row>

          {
            // SubHeadline
          }
          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              <Header as="h4" color="black" textAlign="left">
                <Trans i18nKey="chairForm-add-chair-core-data-headline" />
              </Header>
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          {
            // Address
          }

          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              {this.renderChairNameInput()}
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          {
            // SubHeadline
          }
          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              <Header as="h4" color="black" textAlign="left">
                <Trans i18nKey="complete-profile-adress-information-headline" />
              </Header>
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={6}>
              <CityNameInput />
            </Grid.Column>
            <Grid.Column width={6}>
              <PostalCodeInput />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={6}>
              <StreetNameInput />
            </Grid.Column>
            <Grid.Column width={6}>
              <HouseNumberInput />
            </Grid.Column>
          </Grid.Row>

          <Divider />

          {
            // EmployeeStatus
          }
          <Grid.Row columns={2}>
            <Grid.Column width={6}>{this.renderRoomNameInput()}</Grid.Column>
            <Grid.Column width={6}>
              {this.renderAdditionalEmailInput()}
            </Grid.Column>
          </Grid.Row>

          {
            // Submit and Abort Buttons
          }
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <Form.Field
                control={Button}
                secondary
                onClick={props.onAbortButtonClick}
              >
                {i18next.t("complete-your-profile-abort-button")}
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
              <Form.Field control={Button} primary type="submit">
                {i18next.t("complete-your-profile-continue-button")}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }

  renderChairNameInput() {
    return (
      <Field
        name="chairName"
        component={LabelInputField}
        label={{
          content: i18next.t("edit-chair-chairName-label")
        }}
        labelPosition="left"
        placeholder={i18next.t("edit-chair-chairName-placeholder")}
      />
    );
  }

  renderRoomNameInput() {
    return (
      <Field
        name="roomName"
        component={LabelInputField}
        label={{
          content: i18next.t("complete-profile-roomName-label")
        }}
        labelPosition="left"
        placeholder={i18next.t("complete-profile-roomName-placeholder")}
      />
    );
  }

  renderAdditionalEmailInput() {
    return (
      <Field
        name="additional_email"
        component={LabelInputField}
        label={i18next.t("complete-profile-additional-email-label")}
        labelPosition="left"
        placeholder={i18next.t("complete-profile-additional-email-placeholder")}
        validate={[formValidationUtilities.email]}
      />
    );
  }

  async _handleChairFormSubmit(values) {
    // Values that are extracted from the various input fields, each field is either managed by redux form
    // or via the components state.
    const chairValues = {
      name: values.chairName,
      address: {
        city: values.cityName,
        postCode: values.postCode,
        street: values.streetName,
        room: values.roomName,
        email: values.additional_email
      }
    };

    if (this.state.mode === "edit") {
      console.log("Editing a Chair");

      const response = await chairService.updateChair(
        this.state.chair.id,
        chairValues
      );

      if (response.status === 200) {
        this.props.onCompleteWithSuccess();
      } else {
        this.props.onCompleteWithError(response.error);
      }
    } else if (this.state.mode === "add") {
      console.log("Adding a chair");
      const response = chairService.createChair(chairValues);

      if (response.status === 200) {
        this.props.onCompleteWithSuccess();
      } else {
        this.props.onCompleteWithError(response.error);
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.chair) {
    console.log(ownProps.chair.address);

    const initialValues = {
      chairName: ownProps.chair.name || "",
      cityName: ownProps.chair.address ? ownProps.chair.address.city : "",
      postCode: ownProps.chair.address ? ownProps.chair.address.postCode : "",
      street: ownProps.chair.address ? ownProps.chair.address.street : "",
      email: ownProps.chair.address ? ownProps.chair.address.email : ""
    };

    return {
      initialValues: initialValues,
      chairs: state.chair.chairs
    };
  }

  return {
    chairs: state.chair.chairs
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "editChairForm"
    })(ChairForm)
  )
);
