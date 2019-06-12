import React from "react";
import { connect } from "react-redux";
import NavBar from "../03_organisms/NavBar";
import Avatar from "../02_molecules/Avatar";
import avatarSourcePath from "../assets/images/profile_man.png";
import AddressCard from "../03_organisms/AdressCard";
import { withTranslation, Trans } from "react-i18next";

// Components from semantic ui and our own library
import {
  Button,
  Grid,
  Header,
  Segment,
  Image,
  Label,
  Placeholder,
  Responsive,
  Container
} from "semantic-ui-react";

import { userActions } from "../redux/_actions";

class Profile extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getSingleUser(this.props.userId));
  }

  render() {
    const props = this.props;
    const profileValuesExist = this.props.profileValues;
    return (
      <div>
        <NavBar />
        <Grid columns={3} centered>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" width={3}>
              <HeaderProfilePage />
              <Avatar src={avatarSourcePath} />
            </Grid.Column>

            <Grid.Column width={6}>
              <Grid centered>
                <Segment
                  raised
                  style={{ width: "98%", marginTop: "14px", height: "500px" }}
                  textAlign="left"
                >
                  <Grid.Row>
                    <Grid.Column>
                      <Label as="a" color="blue" ribbon>
                        <Trans i18nKey="profile-overview-label" />
                      </Label>

                      <Grid padded>
                        {profileValuesExist ? (
                          <FirstProfileRow
                            title={props.profileValues.title}
                            birthDate={props.profileValues.birthDate}
                            firstName={props.profileValues.firstName}
                            lastName={props.profileValues.lastName}
                            gender={props.profileValues.gender}
                            subject={props.profileValues.subject}
                          />
                        ) : (
                          <OneLinePlaceHolder />
                        )}
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Segment>
              </Grid>
            </Grid.Column>

            <Grid.Column width={3}>
              {profileValuesExist ? (
                <AddressCard
                  city={props.profileValues.address.city}
                  postCode={props.profileValues.address.postCode}
                  street={props.profileValues.address.street}
                />
              ) : (
                <OneLinePlaceHolder />
              )}
              <SkillCatalog />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" width={3}>
              <Button primary>Profil bearbeiten</Button>
            </Grid.Column>
            <Grid.Column width={6} />
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const FirstProfileRow = props => {
  return (
    <Grid.Row>
      <Grid columns={2}>
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container>
              <p>Titel:</p>
              {props.title}
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container>
              <p>Geschlecht:</p>
              {props.gender}
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container>
              <p>Vorname:</p>
              {props.firstName}
            </Container>
          </Grid.Column>
          <Grid.Column width={10} />
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container>
              <p>Nachname:</p>
              {props.lastName}
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container>
              <p>Geburtsdatum:</p>
              {props.birthDate}
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container>
              <p>MatrikelNummer:</p>
              {props.matriculationNumber}
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container>
              <p>Studiengang:</p>
              {props.subject}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Row>
  );
};

const ThirdProfileRow = props => {
  return (
    <Grid.Row columns={1} textAlign="left">
      <Grid.Column>
        <Label color="green" size={"big"}>
          Studentenstatus
        </Label>
        <Label color="green" size={"massive"}>
          {props.subject}
        </Label>
      </Grid.Column>
    </Grid.Row>
  );
};

const HeaderProfilePage = props => {
  return (
    <Header as="h1" color="blue">
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

const OneLinePlaceHolder = () => {
  return (
    <Placeholder>
      <Placeholder.Line />
    </Placeholder>
  );
};

const mapStateToProps = state => {
  console.log(state.user);

  return {
    userId: state.location.payload.id,
    profileValues: state.user.currentlyViewedUser
  };
};

export default withTranslation()(connect(mapStateToProps)(Profile));
