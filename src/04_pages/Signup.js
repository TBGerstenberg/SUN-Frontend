import React from "react";

// Redux bindings & HOCs
import { connect } from "react-redux";
import { userActions } from "../redux/_actions";
import { navigationConstants } from "../redux/_constants";

// Redux-Form and Bindings Semantic-UI forms
import { Field, reduxForm } from "redux-form";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
import { Message } from "semantic-ui-react";

// Internationalization
import i18next from "i18next";
import { Trans, withTranslation } from "react-i18next";

// Components from semantic ui and our own library
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Icon
} from "semantic-ui-react";

import Link from "redux-first-router-link";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";
import PasswordInput from "../02_molecules/PasswordInput";
import { redirect } from "redux-first-router";

import formValidationUtilities from "../utilities/formValidationUtilities";

// Styles
import "./Signup.css";
import EmailInput from "../02_molecules/EmailInput";

/**
 * A Screen that allows a user to log in to the system.
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this._handleRegistrationSubmit = this._handleRegistrationSubmit.bind(this);
    this.redirectToCompleteProfilePage = this.redirectToCompleteProfilePage.bind(
      this
    );
  }

  redirectToCompleteProfilePage() {
    const action = redirect({
      type: navigationConstants.NAVIGATE_TO_COMPLETE_PROFILE
    });
    this.props.dispatch(action);
  }

  render() {
    if (this.props.registrationCompleted) {
      this.redirectToCompleteProfilePage();
    }
    return (
      <div className="registration-form">
        <Container>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 400 }}>
              <LanguageSwitcher />
              <Segment stacked>
                <Header as="h2" color="blue" textAlign="center">
                  <Trans i18nKey="signup-a-new-account-headline" />
                </Header>

                <Form
                  onSubmit={this.props.handleSubmit(
                    this._handleRegistrationSubmit.bind(this)
                  )}
                >
                  <EmailInput
                    validate={[
                      formValidationUtilities.requiredEmail,
                      formValidationUtilities.email,
                      formValidationUtilities.uniSiegenEmail
                    ]}
                  />

                  <PasswordInput />

                  <Form.Group>
                    <Field
                      name="consentToDataProcessingAgreement"
                      component={CheckboxField}
                      label={this._renderToSAgreementSnippet()}
                    />
                  </Form.Group>

                  <Form.Field control={Button} primary type="submit">
                    {i18next.t("signup-a-new-account-call-to-action-button")}
                  </Form.Field>
                </Form>
              </Segment>
              <Trans i18nKey="signup-message-already-have-an-account" />
              <Link to="/">
                <Trans i18nKey="signup-message-already-have-an-account-call-to-action" />
              </Link>
              {this.props.registrationErrorStatus &&
                this.renderErrorMessage(this.props.registrationErrorStatus)}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }

  _renderToSAgreementSnippet() {
    const tos_snippet = (
      <label>
        <Trans i18nKey="i-agree-to-data-processing-agreement-start" />
        <Link to="DataProcessingAgreement">
          {i18next.t("data-processing-agreement")}
        </Link>
        <Trans i18nKey="i-agree-to-data-processing-agreement-middle" />
        <Link to="TermsOfService">{i18next.t("terms-of-service")}</Link>
        <Trans i18nKey="i-agree-to-data-processing-agreement-end" />
      </label>
    );

    return tos_snippet;
  }

  /**
   * Calls a redux-action creator to start a registration attempt.
   */
  _handleRegistrationSubmit(values) {
    const submittedEmail = values.email;
    const submittedPassword = values.password;

    // Using values.consentToDataProcessingAgreement for capturing consent
    // to Terms of Service and data processing, since we use only a single checkbox for both.
    const submittedConsentToDataProcessingAgreement =
      values.consentToDataProcessingAgreement;
    const submittedConsentToTermsOfService =
      values.consentToDataProcessingAgreement;

    this.props.dispatch(
      userActions.register({
        email: submittedEmail,
        password: submittedPassword,
        consentToDataProcessingAgreement: submittedConsentToDataProcessingAgreement,
        consentToTermsOfService: submittedConsentToTermsOfService
      })
    );
  }

  renderErrorMessage(status) {
    return (
      <Message negative>
        <Message.Header>
          {i18next.t(`signup-error-${status}-message`)}
        </Message.Header>
        <p> {i18next.t(`signup-error-${status}-explanation`)}</p>
      </Message>
    );
  }
}

const mapStateToProps = state => {
  let registrationErrorStatus = null;

  if (state.registration.registrationResponseError) {
    registrationErrorStatus =
      state.registration.registrationResponseError.response.status;
  }

  return {
    registrationForm: state.registrationForm,
    registrationCompleted: state.registration.registrationCompleted,
    registrationErrorStatus: registrationErrorStatus
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "registrationForm" // a unique identifier for this form
    })(Signup)
  )
);
