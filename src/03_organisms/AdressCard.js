import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { Card, Label } from "semantic-ui-react";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";

const addressCard = props => {
  return (
    <Card color="blue" fluid>
      <Card.Content>
        <Label as="p" color="blue" ribbon size="large">
          <Trans i18nKey="address-card-header" />
        </Label>
      </Card.Content>
      <Card.Content>
        <p>
          <Trans i18nKey="address-card-city-label" />
          {" " + tableFormattingUtilities.stringOrEmpty(props.city)}
        </p>
        <p>
          <Trans i18nKey="address-card-postCode-label" />
          {" " + tableFormattingUtilities.stringOrEmpty(props.postCode)}
        </p>
        <p>
          <Trans i18nKey="address-card-street-label" />
          {" " + tableFormattingUtilities.stringOrEmpty(props.street)}
        </p>
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(addressCard);
