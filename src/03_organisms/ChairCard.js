import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";

const ChairCard = props => {
  console.log(props);
  return (
    <Card color="blue">
      <Card.Content>
        <Card.Header>
          <Trans i18nKey="chair-card-header" />
          <a href={"/chair/" + props.chairId}>{props.chairName}</a>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {props.chairAddress && props.chairAddress.email && (
          <p>
            <Trans i18nKey="chair-card-email-label" />
            {" " + props.chairsAddress.email}
          </p>
        )}
        {props.chairAddress && props.chairAddress.phoneNumber && (
          <p>
            <Trans i18nKey="chair-card-phoneNumber-label" />
            {" " + props.chairAddress.phoneNumber}
          </p>
        )}
        {props.chairAddress && props.chairAddress.phoneNumberMobile && (
          <p>
            <Trans i18nKey="chair-card-phoneNumberMobile-label" />
            {" " + props.chairAddress.phoneNumberMobile}
          </p>
        )}
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(ChairCard);
