import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { Card, Image } from "semantic-ui-react";
import christian from "../assets/images/christian.jpg";

const PersonCard = props => {
  return (
    <Card color="blue">
      <Image src={christian} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Trans i18nKey="chair-card-header" />
          <a href={"/profile/" + props.user.id}>
            {props.user.firstName + " " + props.user.lastName}
          </a>
        </Card.Header>
      </Card.Content>
      <Card.Meta>
        {props.user.studentStatus && props.user.studentStatus.subject && (
          <p>{" " + props.user.studentStatus.subject}</p>
        )}
      </Card.Meta>
      <Card.Content>
        <Card.Description>
          {props.user.address && props.user.address.email && (
            <p>
              <Trans i18nKey="chair-card-email-label" />
              {" " + props.user.address.email}
            </p>
          )}
          {props.user.address && props.user.address.phoneNumberMobile && (
            <p>
              <Trans i18nKey="chair-card-phoneNumberMobile-label" />
              {" " + props.user.address.phoneNumberMobile}
            </p>
          )}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default withTranslation()(PersonCard);
