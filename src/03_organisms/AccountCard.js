import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { Card, Label } from "semantic-ui-react";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";

/**
 * Renders information about an account on a card-based layout
 * @param {*} props
 */
const AccountCard = props => {
  return (
    <Card color="blue" fluid>
      <Card.Content>
        <Label as="p" color="blue" ribbon size="large">
          <Trans i18nKey="account-card-header" />
        </Label>
      </Card.Content>
      <Card.Content>
        <p style={{ fontWeight: "bold" }}>
          <Trans i18nKey="account-card-email-label" />
        </p>
        {" " + tableFormattingUtilities.stringOrEmpty(props.email)}
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(AccountCard);
