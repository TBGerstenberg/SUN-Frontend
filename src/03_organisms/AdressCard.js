import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";

const addressCard = props => {
  return (
    <Card color="blue">
      <Card.Content>
        <Card.Header>
          <Trans i18nKey="address-card-header" />
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <p>
          <Trans i18nKey="address-card-city-label" />
          {" " + props.city}
        </p>
        <p>
          <Trans i18nKey="address-card-postCode-label" />
          {" " + props.postCode}
        </p>
        <p>
          <Trans i18nKey="address-card-street-label" />
          {" " + props.street}
        </p>
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(addressCard);
