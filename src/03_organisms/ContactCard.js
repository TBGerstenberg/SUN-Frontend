import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { Card, Label } from "semantic-ui-react";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";

const ContactCard = props => {
  return (
    <Card color="blue" fluid>
      <Card.Content>
        <Label as="p" color="blue" ribbon size="large">
          <Trans i18nKey="contact-card-header" />
        </Label>
      </Card.Content>
      <Card.Content>
        <p>
          <Trans i18nKey="contact-card-email-label" />
          {" " + tableFormattingUtilities.stringOrEmpty(props.email)}
        </p>
        <p>
          <Trans i18nKey="contact-card-phone-label" />
          {" " + tableFormattingUtilities.stringOrEmpty(props.phoneNumber)}
        </p>
        <p>
          <Trans i18nKey="contact-card-mobile-label" />
          {" " +
            tableFormattingUtilities.stringOrEmpty(props.phoneNumberMobile)}
        </p>
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(ContactCard);
