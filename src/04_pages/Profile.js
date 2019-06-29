import React from "react";
import { connect } from "react-redux";
import NavBar from "../03_organisms/NavBar";
import Avatar from "../02_molecules/Avatar";
import avatarSourcePath from "../assets/images/profile_man.png";
import BodyText from "../01_atoms/BodyText";
import AddressCard from "../03_organisms/AdressCard";
import ContactCard from "../03_organisms/ContactCard";
import { withTranslation, Trans } from "react-i18next";
import moment from "moment";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";

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
  constructor(props) {
    super(props);
    this.state = { userId: null };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userId !== prevState.userId) {
      nextProps.dispatch(userActions.getSingleUser(nextProps.userId));

      return { userId: nextProps.userId };
    } else return null;
  }

  render() {
    const props = this.props;
    const profileValuesExist = this.props.profileValues;
    return (
      <div>
        <NavBar />
        <Container>
          <Grid centered padded>
            

            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <Grid centered>
                  <Segment
                    raised
                    style={{ width: "98%", marginTop: "14px", height: "500px" }}
                    textAlign="left"
                  >
                    <Grid.Row>
                      <Grid.Column>
                        <Label as="a" color="blue" ribbon size="big">
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
                              subject={
                                props.profileValues.studentStatus.subject
                              }
                              matriculationNumber={
                                props.profileValues.studentStatus
                                  .matriculationNumber
                              }
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

              <Grid.Column width={6}>
                {profileValuesExist ? (
                  <AddressCard
                    city={props.profileValues.address.city}
                    postCode={props.profileValues.address.postCode}
                    street={props.profileValues.address.street}
                  />
                ) : (
                  <OneLinePlaceHolder />
                )}

                {profileValuesExist ? (
                  <ContactCard
                    email={props.profileValues.address.email}
                    phoneNumber={props.profileValues.address.phoneNumber}
                    phoneNumberMobile={
                      props.profileValues.address.phoneNumberMobile
                    }
                  />
                ) : (
                  <OneLinePlaceHolder />
                )}

                <Button color="teal">Profil bearbeiten</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
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
              <Header size="medium">Titel:</Header>
              <BodyText>{props.title}</BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container>
              <Header size="medium">Geschlecht:</Header>
              <BodyText>
                {tableFormattingUtilities.genderEnumToString(props.gender)}
              </BodyText>
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container>
              <Header size="medium">Vorname:</Header>
              <BodyText>{props.firstName}</BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={10} />
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container>
              <Header size="medium">Nachname:</Header>
              <BodyText>{props.lastName}</BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container>
              <Header size="medium">Geburtsdatum:</Header>
              <BodyText>{moment(props.birthDate).format("L")}</BodyText>
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container>
              <Header size="medium">MatrikelNummer:</Header>
              <BodyText>{props.matriculationNumber}</BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container>
              <Header size="medium">Studiengang:</Header>
              <BodyText>{props.subject}</BodyText>
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
      {`Herzlich Willkommen ${props.firstName}`}
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
  return {
    userId: state.location.payload.userId,
    profileValues: state.user.currentlyViewedUser
  };
};

export default withTranslation()(connect(mapStateToProps)(Profile));
