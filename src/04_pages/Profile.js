import i18next from "i18next";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { NOT_FOUND } from "redux-first-router";
// Components from semantic ui and our own library
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Label,
  Placeholder,
  Segment
} from "semantic-ui-react";
import BodyText from "../01_atoms/BodyText";
import AddEntityModal from "../03_organisms/AddEntityModal";
import AddressCard from "../03_organisms/AdressCard";
import ContactCard from "../03_organisms/ContactCard";
import NavBar from "../03_organisms/NavBar";
import UserForm from "../03_organisms/UserForm";
import christianImage from "../assets/images/christian.jpg";
import danielImage from "../assets/images/daniel.jpg";
import elliotImage from "../assets/images/elliot.jpg";
import helenImage from "../assets/images/helen.jpg";
import jennyImage from "../assets/images/jenny.jpg";
import matthewImage from "../assets/images/matthew.png";
import mollyImage from "../assets/images/molly.png";
import rachelImage from "../assets/images/rachel.png";
import stevieImage from "../assets/images/stevie.jpg";
import tomImage from "../assets/images/tom.jpg";
import veronikaImage from "../assets/images/veronika.jpg";
import { navigationActions, userActions } from "../redux/_actions";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";

var randomMaleImages = [
  christianImage,
  matthewImage,
  tomImage,
  danielImage,
  elliotImage
];

var randomFemaleImages = [
  helenImage,
  jennyImage,
  mollyImage,
  rachelImage,
  stevieImage,
  veronikaImage
];

/**
 * Profile page capable of displaying data about a user, like contact, adress or student-status and
 * a random set of profile images.
 */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      editUserModalOpen: false,
      imageMaleSrc:
        randomMaleImages[Math.floor(Math.random() * randomMaleImages.length)],
      imageFemaleSrc:
        randomFemaleImages[
          Math.floor(Math.random() * randomFemaleImages.length)
        ],
      gender: 0,
      imageSource: null
    };

    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.openEditUserModal = this.openEditUserModal.bind(this);
  }

  // React-Lifecycle Methods

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userId !== prevState.userId) {
      nextProps.dispatch(userActions.getSingleUser(nextProps.userId));
      return { userId: nextProps.userId };
    }

    if (nextProps.profileFetchStatus && nextProps.profileFetchStatus === 200) {
      let imageSource;

      if (nextProps.profileValues.gender === 0) {
        imageSource = null;
      } else if (nextProps.profileValues.gender === 1) {
        imageSource =
          randomMaleImages[Math.floor(Math.random() * randomMaleImages.length)];
      } else if (nextProps.profileValues.gender === 2) {
        imageSource =
          randomFemaleImages[
            Math.floor(Math.random() * randomFemaleImages.length)
          ];
      }

      return { ...prevState, imageSource: imageSource };
    } else return null;
  }

  render() {
    const props = this.props;
    const profileValuesExist = this.props.profileValues;
    let userCanEditProfile = false;

    if (props.profileFetchStatus && props.profileFetchStatus === 404) {
      this.props.dispatch(navigationActions.redirect(NOT_FOUND));
    }

    if (this.props.loggedInUsersAccount) {
      userCanEditProfile =
        this.state.userId == this.props.loggedInUsersAccount.person.id;
    }

    return (
      <div>
        <NavBar />
        <Container>
          <Grid centered padded>
            <Grid.Row columns={3}>
              <Grid.Column width={3}>
                <Image
                  rounded
                  size="large"
                  style={{ marginLeft: "-25px" }}
                  src={this.state.imageSource}
                />
              </Grid.Column>
              <Grid.Column width={9}>
                <Grid centered>
                  <Segment
                    raised
                    style={{ width: "98%", marginTop: "14px", height: "500px" }}
                    textAlign="left"
                  >
                    <Grid.Row>
                      <Grid.Column>
                        <Label as="p" color="blue" ribbon size="big">
                          <Trans i18nKey="profile-overview-label" />
                        </Label>

                        <Grid padded>
                          {profileValuesExist ? (
                            <ProfileCore
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
                              matriculationDate={
                                props.profileValues.studentStatus
                                  .matriculationDate
                              }
                              exmatriculationDate={
                                props.profileValues.studentStatus
                                  .exmatriculationDate
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

              <Grid.Column width={4}>
                {profileValuesExist ? (
                  <AddressCard
                    city={props.profileValues.address.city}
                    postCode={props.profileValues.address.postCode}
                    street={props.profileValues.address.street}
                    room={props.profileValues.address.room}
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

                {/** Used to edit a user  */}
                <AddEntityModal
                  size="large"
                  modalContent={
                    <UserForm
                      account={this.props.loggedInUsersAccount}
                      onAbortButtonClick={() => {
                        this.setState({ editUserModalOpen: false });
                      }}
                      onCompleteWithSuccess={() => {
                        this.props.dispatch(
                          userActions.getSingleUser(this.props.userId)
                        );
                        this.toggleSuccessMessage(
                          i18next.t("profile-update-success-title"),
                          i18next.t("profile-update-success-message")
                        );

                        this.closeEditUserModal();
                      }}
                      onCompleteWithError={error => {
                        this.toggleErrorMessage("Fehler", error);
                        this.closeEditUserModal();
                      }}
                    />
                  }
                  open={this.state.editUserModalOpen}
                />

                {userCanEditProfile && (
                  <Button color="teal" onClick={this.openEditUserModal}>
                    {i18next.t("edit-profile-button-label")}
                  </Button>
                )}
                <div style={{ marginLeft: "5px", marginTop: "5px" }}>
                  <SemanticToastContainer />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }

  toggleSuccessMessage(title, message) {
    setTimeout(() => {
      toast(
        {
          title: title,
          description: <p>{message}</p>,
          type: "success",
          color: "green",
          size: "mini",
          animation: "fly left"
        },
        () => console.log("toast closed"),
        () => console.log("toast clicked")
      );
    }, 1000);
  }

  toggleErrorMessage(title, message) {
    setTimeout(() => {
      toast(
        {
          title: title,
          description: <p>{message}</p>,
          type: "error",

          size: "mini",
          animation: "fly left"
        },
        () => console.log("toast closed"),
        () => console.log("toast clicked")
      );
    }, 1000);
  }

  /**
   * Closes the modal to edit one's profile
   */
  closeEditUserModal() {
    this.setState({
      editUserModalOpen: false
    });
  }

  /**
   * Opens the modal to edit one's profile
   */
  openEditUserModal() {
    this.setState({
      editUserModalOpen: true
    });
  }
}

/**
 * Component capable of displaying the core-information of a users profile.
 */
const ProfileCore = props => {
  return (
    <Grid.Row>
      <Grid columns={2}>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Container>
              <Header size="medium"> {i18next.t("profile-title-label")}</Header>
              <BodyText>
                {tableFormattingUtilities.stringOrEmpty(props.title)}
              </BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={8}>
            <Container>
              <Header size="medium">{i18next.t("profile-gender-label")}</Header>
              <BodyText>
                {tableFormattingUtilities.genderEnumToString(props.gender)}
              </BodyText>
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Container>
              <Header size="medium">
                {i18next.t("profile-firstName-label")}
              </Header>
              <BodyText>
                {" "}
                {tableFormattingUtilities.stringOrEmpty(props.firstName)}
              </BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={8} />
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Container>
              <Header size="medium">
                {i18next.t("profile-lastName-label")}
              </Header>
              <BodyText>
                {" "}
                {tableFormattingUtilities.stringOrEmpty(props.lastName)}
              </BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={8}>
            <Container>
              <Header size="medium">
                {i18next.t("profile-birthDate-label")}
              </Header>
              <BodyText>
                {tableFormattingUtilities.getFormattedDate(props.birthDate)}
              </BodyText>
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          {props.matriculationNumber ? (
            <Grid.Column width={8}>
              <Container>
                <Header size="medium">
                  {i18next.t("profile-matriculationNumber-label")}
                </Header>
                <BodyText>
                  {" "}
                  {tableFormattingUtilities.stringOrEmpty(
                    props.matriculationNumber
                  )}
                </BodyText>
              </Container>
            </Grid.Column>
          ) : (
            <Grid.Column width={8} />
          )}

          {props.subject ? (
            <Grid.Column width={8}>
              <Container>
                <Header size="medium">
                  {i18next.t("profile-courseOfStudy-label")}
                </Header>
                <BodyText>
                  {" "}
                  {tableFormattingUtilities.stringOrEmpty(props.subject)}
                </BodyText>
              </Container>
            </Grid.Column>
          ) : (
            <Grid.Column width={8} />
          )}
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Container>
              <Header size="medium">
                {i18next.t("profile-matriculationDate-label")}
              </Header>
              <BodyText>
                {tableFormattingUtilities.getFormattedDate(
                  props.matriculationDate
                )}
              </BodyText>
            </Container>
          </Grid.Column>
          <Grid.Column width={8}>
            <Container>
              <Header size="medium">
                {i18next.t("profile-exmatriculationDate-label")}
              </Header>
              <BodyText>
                {tableFormattingUtilities.getFormattedDate(
                  props.exmatriculationDate
                )}
              </BodyText>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Row>
  );
};

/**
 * Component that displays a personalized greeting message
 */
const HeaderProfilePage = props => {
  return (
    <Header as="h1" color="blue">
      {`Herzlich Willkommen ${props.firstName}`}
    </Header>
  );
};

/**
 * Component capable of displaying a set of skills of that particular user
 * NOTE: Feature ommitted due to time limitations.
 */
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

/**
 * Placeholder component that is rendered while the profile is still fetching
 */
const OneLinePlaceHolder = () => {
  return (
    <Placeholder>
      <Placeholder.Line />
    </Placeholder>
  );
};

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = state => {
  return {
    userId: state.location.payload.userId,
    profileValues: state.user.currentlyViewedUser,
    loggedInUsersAccount: state.login.user,
    profileFetchStatus: state.user.userFetchStatus
  };
};

export default withTranslation()(connect(mapStateToProps)(Profile));
