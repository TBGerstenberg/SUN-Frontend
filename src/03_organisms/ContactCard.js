import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";

const ContactCard = props => {
  return (
    <Card color="blue" fluid>
      <Card.Content>
        <Card.Header>
          <Trans i18nKey="contact-card-header" />
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <p>
          <Trans i18nKey="contact-card-email-label" />
          {" " + props.email}
        </p>
        <p>
          <Trans i18nKey="contact-card-phone-label" />
          {" " + props.phoneNumber}
        </p>
        <p>
          <Trans i18nKey="contact-card-mobile-label" />
          {" " + props.phoneNumberMobile}
        </p>
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(ContactCard);
