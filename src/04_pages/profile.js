import React from "react";
// Redux-Form and Bindings Semantic-UI forms
import NavBar from "../03_organisms/NavBar";
//Image Import
import avatar from "../05_images/avatar.png";
// Components from semantic ui and our own library
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
  Placeholder
} from "semantic-ui-react";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <HeaderProfilePage />
      <Zeilen />

      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column textAlign="center" width={3}>
            <Avatar />
          </Grid.Column>
          <Grid.Column width={6}>
            <FirstProfile />

            <Zeilen />

            <SecondProfile />

            <Zeilen />
            
            <ThirdProfile />
          </Grid.Column>
          <Grid.Column>
            <SkillCatalog />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign="center" width={3}>
            <Button primary>Profil bearbeiten</Button>
          </Grid.Column>
          <Grid.Column width={3}>
            <FourthProfile />
          </Grid.Column>
          <Grid.Column>
            <FifthProfile />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const Zeilen = () => {
  return (
    <div>
      <br />
      <br />
      <br />
    </div>
  );
};
const Avatar = () => {
  return <Image src={avatar} />;
};

const FirstProfile = () => {
  return (
    <div>
      <Label color="blue" size={"massive"}>
        Titel
      </Label>
      <Label color="blue" size={"massive"}>
        Vorname
      </Label>
      <Label color="blue" size={"massive"}>
        Nachname
      </Label>
    </div>
  );
};
const SecondProfile = () => {
  return (
    <div>
      <Label size={"big"}>Geschlecht</Label>
      <Label size={"big"}>Geburtsdatum</Label>
    </div>
  );
};
const ThirdProfile = () => {
  return (
    <div>
      <Label color="green" size={"massive"}>
        Studiengang
      </Label>
      <Label color="green" size={"big"}>
        Studentenstatus
      </Label>
    </div>
  );
};
const FourthProfile = () => {
  return (
    <div>
      <Label size={"big"}>E-Mail</Label>
      <Label size={"big"}>Mobile</Label>
    </div>
  );
};
const FifthProfile = () => {
  return (
    <div>
      <Label size={"big"}>Adresse</Label>
      <Label size={"big"}>PLZ</Label>
      <Label size={"big"}>Stadt</Label>
    </div>
  );
};

const HeaderProfilePage = () => {
  return (
    <Header as="h1" color="blue" block>
      Willkommen Herr Mustermann
    </Header>
  );
};

const SkillCatalog = () => {
  return (
    <div>
      <Header>Skill Katalog</Header>
      <Grid columns={2} stackable>
        <Grid.Column>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Profile;
