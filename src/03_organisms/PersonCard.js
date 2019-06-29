import React from "react";
import { Segment, Label, Header, Card, Image } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import christian from "../assets/images/christian.jpg";
import daniel from "../assets/images/daniel.jpg";
import elliot from "../assets/images/elliot.jpg";
import helen from "../assets/images/helen.jpg";
import jenny from "../assets/images/jenny.jpg";
import matt from "../assets/images/matt.jpg";
import matthew from "../assets/images/matthew.png";
import molly from "../assets/images/molly.png";
import rachel from "../assets/images/rachel.png";
import stevie from "../assets/images/stevie.jpg";
import tom from "../assets/images/tom.jpg";
import veronika from "../assets/images/veronika.jpg";

const PersonCard = props => {
  console.log(props);
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
