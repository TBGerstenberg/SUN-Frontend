import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";

const contactCard = props => {
  return (
    <Card color="blue">
      <Card.Content>
        <Card.Header>
          <Trans i18nKey="contact-card-header" />
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <p>
          <Trans i18nKey="contact-card-email-label" />
          {props.email}
        </p>
        <p>
          <Trans i18nKey="contact-card-mobile-label" />
          {props.mobile}
        </p>
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(contactCard);
