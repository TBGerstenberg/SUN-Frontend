import i18next from "i18next";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { Button, Grid, Header } from "semantic-ui-react";

class ConfirmDeletionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;

    return (
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
          <Header as="h3" color="red" textAlign="center">
            <Trans i18nKey="accountManagement-confirm-account-deletion-headline" />
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            {i18next.t(
              "accountManagement-delete-account-confirmation-modal-content"
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Button secondary onClick={props.onAbortButtonClick} type="button">
              {i18next.t("complete-your-profile-abort-button")}
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <Button color="red" onClick={props.onConfirm} type="button">
              {i18next.t(
                "accountManagement-delete-account-confirmation-modal-confirm-button-label"
              )}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withTranslation()(ConfirmDeletionDialog);
