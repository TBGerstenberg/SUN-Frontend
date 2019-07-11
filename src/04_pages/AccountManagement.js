import i18next from "i18next";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { Button, Container, Grid, Icon } from "semantic-ui-react";
import AccountCard from "../03_organisms/AccountCard";
import AddEntityModal from "../03_organisms/AddEntityModal";
import ConfirmDeletionDialog from "../03_organisms/ConfirmDeletionDialog";
import EditEmailForm from "../03_organisms/EditEmailForm";
import EditPasswordForm from "../03_organisms/EditPasswordForm";
import NavBar from "../03_organisms/NavBar";
import { userActions } from "../redux/_actions";
import { accountService } from "../services";
import "./AccountManagement.css";

/**
 * A component that can render a form in which a user can update his basic account information
 * like update his password or set a new primary-account email. Further it allows to delete ones account.
 */
class AccountManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmailModalOpen: false,
      editPasswordModalOpen: false,
      confirmAccountDeletionDialogOpen: false
    };

    // Modal handlers
    this.closeEditEmailModal = this.closeEditEmailModal.bind(this);
    this.openEditEmailModal = this.openEditEmailModal.bind(this);
    this.openEditPasswordModal = this.openEditPasswordModal.bind(this);
    this.closeEditPasswordModal = this.closeEditPasswordModal.bind(this);
    this.openConfirmAccountDeletionDialog = this.openConfirmAccountDeletionDialog.bind(
      this
    );
    this.closeConfirmAccountDeletionDialog = this.closeConfirmAccountDeletionDialog.bind(
      this
    );

    // Button Click handlers
    this.handleDeleteAccountButtonClick = this.handleDeleteAccountButtonClick.bind(
      this
    );
    this.handleEditPasswordButtonClick = this.handleEditPasswordButtonClick.bind(
      this
    );
    this.handleEditEmailButtonClick = this.handleEditEmailButtonClick.bind(
      this
    );

    // Service Calling methods
    this.triggerAccountDeletion = this.triggerAccountDeletion.bind(this);
  }

  render() {
    const props = this.props;
    return (
      <div>
        <NavBar />
        <Container>
          <Grid centered padded>
            <Grid.Row>
              <Grid.Column width={4} />
              <Grid.Column width={8}>
                {/** Modal to edit users email  */}
                <AddEntityModal
                  size="small"
                  modalContent={
                    <EditEmailForm
                      onAbortButtonClick={this.closeEditEmailModal}
                      onCompleteWithSuccess={updatedEmail => {
                        this.closeEditEmailModal();
                        this.toggleSuccessMessage(
                          i18next.t(
                            "edit-private-email-form-success-message-title"
                          ),
                          i18next.t(
                            "edit-private-email-form-success-message-message"
                          )
                        );

                        this.props.dispatch(
                          userActions.updateAccountEmail(updatedEmail)
                        );
                      }}
                      onCompleteWithError={updateEmailRequest => {
                        this.closeEditEmailModal();

                        if (updateEmailRequest.error.status === 409) {
                          this.toggleErrorMessage(
                            i18next.t(
                              "edit-private-email-form-error-409-title"
                            ),
                            i18next.t(
                              "edit-private-email-form-error-409-message"
                            )
                          );
                        } else {
                          this.toggleErrorMessage(
                            i18next.t("edit-private-email-form-error-title"),
                            i18next.t("edit-private-email-form-error-message")
                          );
                        }
                      }}
                    />
                  }
                  open={this.state.editEmailModalOpen}
                />

                {/** Modal to edit the users password  */}
                <AddEntityModal
                  size="small"
                  modalContent={
                    <EditPasswordForm
                      onAbortButtonClick={this.closeEditPasswordModal}
                      onCompleteWithSuccess={() => {
                        this.closeEditPasswordModal();
                        this.toggleSuccessMessage(
                          i18next.t("edit-password-form-success-message-title"),
                          i18next.t(
                            "edit-password-form-success-message-message"
                          )
                        );
                      }}
                      onCompleteWithError={() => {
                        this.closeEditPasswordModal();
                        this.toggleErrorMessage(
                          i18next.t("edit-password-form-error-message-title"),
                          i18next.t("edit-password-form-error-message-message")
                        );
                      }}
                    />
                  }
                  open={this.state.editPasswordModalOpen}
                />

                {/** Modal to confirm the deletion of the users account */}
                <AddEntityModal
                  size="small"
                  modalContent={
                    <ConfirmDeletionDialog
                      onAbortButtonClick={
                        this.closeConfirmAccountDeletionDialog
                      }
                      onConfirm={this.triggerAccountDeletion}
                    />
                  }
                  open={this.state.confirmAccountDeletionDialogOpen}
                />

                <AccountCard
                  email={
                    props.loggedInUsersAccount &&
                    props.loggedInUsersAccount.email
                  }
                />
              </Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4} />
              <Grid.Column width={8}>
                <Button
                  onClick={this.handleDeleteAccountButtonClick}
                  icon
                  color="red"
                  floated="right"
                >
                  <Icon name="trash" />
                  <Trans i18nKey="accountManagement-delete-account-button-label" />
                </Button>
                <Button
                  onClick={this.handleEditEmailButtonClick}
                  floated="left"
                >
                  <Trans i18nKey="accountManagement-edit-email-button-label" />
                </Button>
                <Button
                  onClick={this.handleEditPasswordButtonClick}
                  floated="left"
                >
                  <Trans i18nKey="accountManagement-edit-password-button-label" />
                </Button>
              </Grid.Column>
              <Grid.Column width={4} />
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={12} />

              <Grid.Column width={4}>
                <SemanticToastContainer />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }

  /**
   * Toggles an animated success message in response to a successful network request
   */
  toggleSuccessMessage(title, message) {
    setTimeout(() => {
      toast(
        {
          title: title,
          description: <p>{message}</p>,
          type: "success",
          color: "green",
          size: "mini",
          animation: "fly left"
        },
        () => console.log("toast closed"),
        () => console.log("toast clicked")
      );
    }, 1000);
  }

  /**
   * Toggles an animated error message in response to a failed network request
   */
  toggleErrorMessage(title, message) {
    setTimeout(() => {
      toast(
        {
          title: title,
          description: <p>{message}</p>,
          type: "error",

          size: "mini",
          animation: "fly left"
        },
        () => console.log("toast closed"),
        () => console.log("toast clicked")
      );
    }, 1000);
  }

  /**
   * Opens the dialog required to confirm the deletion of an account.
   */
  openConfirmAccountDeletionDialog() {
    this.setState({
      confirmAccountDeletionDialogOpen: true
    });
  }

  /**
   * Closes the dialog required to confirm the deletion of an account.
   */
  closeConfirmAccountDeletionDialog() {
    this.setState({
      confirmAccountDeletionDialogOpen: false
    });
  }

  /**
   * Opens the edit-email modal
   */
  openEditEmailModal() {
    this.setState({
      editEmailModalOpen: true
    });
  }

  /**
   * Closes the edit-email modal
   */
  closeEditEmailModal() {
    this.setState({
      editEmailModalOpen: false
    });
  }

  /**
   * Opens the edit-password modal
   */
  openEditPasswordModal() {
    this.setState({
      editPasswordModalOpen: true
    });
  }

  /**
   * Closes the edit-password modal
   */
  closeEditPasswordModal() {
    this.setState({
      editPasswordModalOpen: false
    });
  }

  /**
   * Handles a click on the edit-email button
   */
  handleEditEmailButtonClick() {
    this.openEditEmailModal();
  }

  /**
   * Handles a click on the edit-password button
   */
  handleEditPasswordButtonClick() {
    this.openEditPasswordModal();
  }

  /**
   * Handles a click on the delete-account button
   */
  handleDeleteAccountButtonClick() {
    this.openConfirmAccountDeletionDialog();
  }

  async triggerAccountDeletion() {
    const accountDeletionRequest = await accountService.deleteAccount(
      this.props.loggedInUsersAccount.id
    );

    if (accountDeletionRequest.status === 200) {
      this.props.dispatch(userActions.logout());
    }
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = state => {
  return {
    loggedInUsersAccount: state.login.user
  };
};

export default withTranslation()(connect(mapStateToProps)(AccountManagement));
