import i18next from "i18next";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import EmailInput from "../02_molecules/EmailInput";
import { accountService } from "../services";
import formValidationUtilities from "../utilities/formValidationUtilities";

class EditEmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;

    return (
      <Form
        onSubmit={props.handleSubmit(this._handleAccountFormSubmit.bind(this))}
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
              <Trans i18nKey="accountManagement-edit-email-headline" />
            </Header>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <EmailInput
                disabled
                name="oldEmail"
                placeholder={i18next.t(
                  "edit-private-email-modal-oldEmail-placeholder"
                )}
              />
              <EmailInput
                name="newEmail"
                placeholder={i18next.t(
                  "edit-private-email-modal-newEmail-placeholder"
                )}
                validate={[
                  formValidationUtilities.requiredEmail,
                  formValidationUtilities.email,
                  formValidationUtilities.uniSiegenEmail
                ]}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <Button
                secondary
                onClick={props.onAbortButtonClick}
                type="button"
              >
                {i18next.t("complete-your-profile-abort-button")}
              </Button>
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

  /**
   * Handles the submission of the form to update ones email
   */
  async _handleAccountFormSubmit(values) {
    const updateAccountEmailRequestBody = {
      admin: this.props.loggedInAccount.admin,
      newEmail: values.newEmail
    };

    const updateEmailRequest = await accountService.editAccount(
      updateAccountEmailRequestBody,
      this.props.loggedInAccount.id
    );
    if (
      updateEmailRequest.response &&
      updateEmailRequest.response.status === 200
    ) {
      this.props.onCompleteWithSuccess(updateAccountEmailRequestBody.newEmail);
    } else {
      this.props.onCompleteWithError(updateEmailRequest);
    }
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      oldEmail: state.login.user && state.login.user.email
    },
    loggedInAccount: state.login.user
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "editEmailForm"
    })(EditEmailForm)
  )
);
