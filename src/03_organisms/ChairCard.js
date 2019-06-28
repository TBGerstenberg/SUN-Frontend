import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";

const ChairCard = props => {
  return (
    <Card color="blue">
      <Card.Content>
        <Card.Header>
          <Trans i18nKey="chair-card-header" />
          <a href={"/chair/" + props.chairId}>{props.chairName}</a>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {props.address && props.address.email && (
          <p>
            <Trans i18nKey="chair-card-email-label" />
            {" " + props.email}
          </p>
        )}
        {props.address && props.address.phoneNumber && (
          <p>
            <Trans i18nKey="chair-card-phone-label" />
            {" " + props.phoneNumber}
          </p>
        )}
        {props.address && props.address.phoneNumberMobile && (
          <p>
            <Trans i18nKey="chair-card-mobile-label" />
            {" " + props.phoneNumberMobile}
          </p>
        )}
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(ChairCard);
