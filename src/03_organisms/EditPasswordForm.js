import i18next from "i18next";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import PasswordInput from "../02_molecules/PasswordInput";
import { accountService } from "../services";

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
              <Trans i18nKey="accountManagement-edit-password-headline" />
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <PasswordInput
                name="oldPassword"
                placeholder={i18next.t(
                  "edit-password-modal-old-password-input-placeholder"
                )}
              />
              <PasswordInput
                name="newPassword"
                placeholder={i18next.t(
                  "edit-password-modal-new-password-input-placeholder"
                )}
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
   * Handles the submission of a edit-password request
   */
  async _handleAccountFormSubmit(values) {
    const updatePasswordRequestBody = {
      admin: this.props.loggedInAccount.admin,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    };

    const updatePasswordRequest = await accountService.editAccount(
      updatePasswordRequestBody,
      this.props.loggedInAccount.id
    );

    if (updatePasswordRequest.updateAccountStatus === 200) {
      this.props.onCompleteWithSuccess();
    } else {
      this.props.onCompleteWithError();
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
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
