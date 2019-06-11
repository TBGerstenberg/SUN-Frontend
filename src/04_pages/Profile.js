import React from "react";
import { connect } from "react-redux";
import NavBar from "../03_organisms/NavBar";
import Avatar from "../02_molecules/Avatar";
import avatarSourcePath from "../assets/images/avatar.png";

// Components from semantic ui and our own library
import {
  Button,
  Grid,
  Header,
  Segment,
  Image,
  Label,
  Placeholder
} from "semantic-ui-react";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <HeaderProfilePage />

      <Grid columns={3} divided>
        <Grid.Row columns={3}>
          <Grid.Column textAlign="center" width={3}>
            <Avatar src={avatarSourcePath} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Segment raised>
                <Label as="a" color="blue" ribbon>
                  Overview
                </Label>
                <span>Account Details</span>

                <Grid.Row>
                  <Grid.Column>
                    <FirstProfileRow />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <SecondProfileRow />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <ThirdProfileRow />
                  </Grid.Column>
                </Grid.Row>
              </Segment>
            </Grid>
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

const FirstProfileRow = props => {
  return (
    <div>
      <Label color="blue" size={"massive"}>
        {props.title}
      </Label>
      <Label color="blue" size={"massive"}>
        {props.firstName}
      </Label>
      <Label color="blue" size={"massive"}>
        {props.lastName}
      </Label>
    </div>
  );
};
const SecondProfileRow = props => {
  return (
    <div>
      <Label size={"big"}> {props.gender}</Label>
      <Label size={"big"}>{props.birthDate}</Label>
    </div>
  );
};
const ThirdProfileRow = props => {
  return (
    <div>
      <Label color="green" size={"big"}>
        Studentenstatus
      </Label>
      <Label color="green" size={"massive"}>
        {props.courseOfStudy}
      </Label>
    </div>
  );
};
const FourthProfile = props => {
  return (
    <div>
      <Label size={"big"}> {props.email}</Label>
      <Label size={"big"}> {props.mobile}</Label>
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

const HeaderProfilePage = props => {
  return (
    <Header as="h1" color="blue" block>
      {`Herzlich Willkommen ${props.gender} ${props.lastName}`}
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

const mapStateToProps = state => {
  return {
    profileValues: state.user.ownProfile
  };
};

export default connect(mapStateToProps)(Profile);
