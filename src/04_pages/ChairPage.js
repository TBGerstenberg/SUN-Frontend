import React from "react";
import NavBar from "../03_organisms/NavBar";
import ContactForm from "../03_organisms/ContactForm";
import ConFirmModal from "../03_organisms/ConfirmModal";
import avatar_chair from "../assets/images/chair_avatar.png";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Icon,
  Image,
  Label,
  GridColumn,
  Placeholder,
  Modal
} from "semantic-ui-react";

const ChairPage = () => {
  return (
    <div>
      <NavBar />
      <HeaderChairPage />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column textAlign="center" width={3}>
            <Avatar_Chair />
            <ConFirmModal />
            <ContactForm />
          </Grid.Column>
          <Grid.Column width={8}>
            <Contact_Form />
          </Grid.Column>
          <Grid.Column width={4}>
            <SecondProfile />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column textAlign="center" width={3}>
            <FirstProfile />
            <br />
            <ThirdProfile />
          </Grid.Column>
          <Grid.Column width={8}>
            <Contact_Form />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ChairPage;

const Avatar_Chair = () => {
  return <Image src={avatar_chair} />;
};

const HeaderChairPage = () => {
  return (
    <Header as="h1" color="blue" block>
      Lehrstuhlseite
    </Header>
  );
};

const FirstProfile = () => {
  return (
    <div>
      <Label color="green" size={"big"}>
        Lehrstuhlname
      </Label>
      <Label color="green" size={"big"}>
        Fakultät
      </Label>
    </div>
  );
};

const SecondProfile = () => {
  return (
    <div>
      <Header color="blue">Mitarbeiter des Lehrstuhls</Header>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  );
};

const ThirdProfile = () => {
  return (
    <div>
      <Label color="green" size={"medium"}>
        Adresse
      </Label>
      <Label color="green" size={"medium"}>
        Raum
      </Label>
    </div>
  );
};

const Contact_Form = () => {
  return (
    <div>
      {" "}
      <Header color="blue">Jobangebote</Header>
      <Placeholder fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  );
};
