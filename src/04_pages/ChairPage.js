import i18next from "i18next";
import React from "react";
import { connect } from "react-redux";
import { Button, Container, Grid, Header, Image, Tab } from "semantic-ui-react";
import SubscribeButton from "../02_molecules/SubscribeButton";
import AdressCard from "../03_organisms/AdressCard";
import ApplyToChairModal from "../03_organisms/ApplyToChairModal";
import ConfirmModal from "../03_organisms/ConfirmModal";
import ContactCard from "../03_organisms/ContactCard";
import NavBar from "../03_organisms/NavBar";
import NewEventModal from "../03_organisms/NewEventModal";
import NewPostModal from "../03_organisms/NewPost";
import PersonList from "../03_organisms/PersonList";
import PostCard from "../03_organisms/PostCard";
import universityImage from "../assets/images/universityImage.jpg";
import {
  chairActions,
  navigationActions,
  postActions,
  userActions
} from "../redux/_actions";
import { chairService } from "../services";

export class ChairPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderPostsFragment = this.renderPostsFragment.bind(this);
    this.renderEventFragment = this.renderEventFragment.bind(this);
    this.renderEmployeeFragment = this.renderEmployeeFragment.bind(this);
    this._handleSubscribeButtonClick = this._handleSubscribeButtonClick.bind(
      this
    );
    this.updatePersonChairRelations = this.updatePersonChairRelations.bind(
      this
    );
    this.handleApplicantAccepted = this.handleApplicantAccepted.bind(this);
    this.handleApplicantDenied = this.handleApplicantDenied.bind(this);
    this.handleEmployeeRemoved = this.handleEmployeeRemoved.bind(this);
    this.handleEmployeeChanged = this.handleEmployeeChanged.bind(this);

    const panes = [
      {
        menuItem: i18next.t("chairpage-news-fragment-headline"),
        render: this.renderPostsFragment
      },
      {
        menuItem: i18next.t("chairpage-employee-fragment-headline"),
        render: this.renderEmployeeFragment
      },
      {
        menuItem: i18next.t("chairpage-events-fragment-headline"),
        render: this.renderEventFragment
      }
    ];

    this.state = {
      chairId: null,
      currentlyViewedChair: null,
      newPostModalOpen: false,
      newEventModalOpen: false,
      tabBarPanes: panes,
      subscribeModalOpen: false,
      unsubscribeModalOpen: false,
      applyToChairModalOpen: false,
      applyToChairConfirmedModalOpen: false,
      userHasSubscribedToChair: false,
      subscriptions: null,
      persons: [],
      employees: [],
      applicants: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chairId !== prevState.chairId) {
      nextProps.getSingleChair(nextProps.chairId);
      nextProps.getChairPosts(nextProps.chairId);

      const chair = nextProps.chairSubscriptions.find(element => {
        return element.pageId == nextProps.chairId;
      });

      if (chair != null) {
        return {
          chairId: nextProps.chairId,
          userHasSubscribedToChair: true
        };
      } else {
        return {
          chairId: nextProps.chairId,
          userHasSubscribedToChair: false
        };
      }
    } else if (nextProps.currentlyViewedChair) {
      const applicants = nextProps.currentlyViewedChair.persons.filter(
        element => {
          return element.active === false;
        }
      );

      const employees = nextProps.currentlyViewedChair.persons.filter(
        element => {
          return element.active === true;
        }
      );

      return {
        ...prevState,
        employees,
        applicants
      };
    } else return null;
  }

  renderEventFragment() {
    const personCanPostForChair =
      this.props.personIsEmployee || this.props.personIsSuperAdmin;
    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={10}>
            <Header> {i18next.t("chairpage-events-fragment-headline")}</Header>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            {personCanPostForChair && (
              <Button
                style={{ float: "right" }}
                color="blue"
                onClick={() => {
                  this.setState({ newEventModalOpen: true });
                }}
              >
                {i18next.t("chairpage-new-event-button-label")}
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>

        {this.props.chairPosts &&
          this.props.chairPosts.map((post, index) => {
            // 2  is type "event"
            if (post.type === 2) {
              return (
                <Grid.Row key={index}>
                  <Grid.Column>
                    <PostCard post={post} />
                  </Grid.Column>
                </Grid.Row>
              );
            } else {
              return null;
            }
          })}
      </Grid>
    );
  }

  renderEmployeeFragment() {
    const chairHasEmployees =
      this.props.currentlyViewedChair &&
      this.props.currentlyViewedChair.persons &&
      this.props.currentlyViewedChair.persons.length > 0;

    const personCanApplyToChair =
      !this.props.personIsEmployee && !this.props.personIsApplicant;

    const personHasAlreadyApplied = this.props.personIsApplicant;

    const personCanEditEmployees =
      this.props.personIsChairAdmin || this.props.personIsSuperAdmin;

    const personCanManageChairAdmins =
      this.props.personIsSuperAdmin || this.props.personIsChairAdmin;

    console.log(this.props.personIsSuperAdmin);
    console.log(this.props.personIsChairAdmin);

    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={10}>
            {" "}
            <Header>{i18next.t("chairpage-employee-fragment-headline")}</Header>
          </Grid.Column>

          <Grid.Column width={6} floated="right">
            {personCanApplyToChair && (
              <Button
                style={{ float: "right" }}
                color="blue"
                onClick={() => {
                  this.setState({
                    applyToChairModalOpen: true
                  });
                }}
              >
                {i18next.t("chairpage-apply-to-chair-button-label")}
              </Button>
            )}
            {personHasAlreadyApplied && (
              <Button style={{ float: "right" }} color="teal" disabled={true}>
                {i18next.t("chairpage-already-applied-button-label")}
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>

        {chairHasEmployees && (
          <Grid.Row>
            <Grid.Column>
              <PersonList
                itemsRemoveable={personCanEditEmployees}
                itemsAcceptable={false}
                itemsChangeable={personCanManageChairAdmins}
                persons={this.state.employees}
                onItemAdded={() => {}}
                onItemDeleted={this.handleEmployeeRemoved}
                onItemChanged={this.handleEmployeeChanged}
              />
            </Grid.Column>
          </Grid.Row>
        )}

        {chairHasEmployees && personCanEditEmployees && (
          <Grid.Row>
            <Grid.Column>
              <Header>
                {i18next.t("chairpage-employee-fragment-applicants-headline")}
              </Header>
              <PersonList
                itemsRemoveable={personCanEditEmployees}
                itemsAcceptable={personCanEditEmployees}
                itemsChangeable={false}
                onItemAdded={this.handleApplicantAccepted}
                onItemDeleted={this.handleApplicantDenied}
                onItemChanged={() => {}}
                persons={this.state.applicants}
              />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    );
  }

  /**
   * Called when data about the relation between an employee and the chair changes,
   * e.g. when someone is appointed to be chairAdmin or no longer granted that role
   */
  handleEmployeeChanged(alteredEmployeeList) {
    this.setState({ employees: alteredEmployeeList });

    this.updatePersonChairRelations([
      ...alteredEmployeeList,
      ...this.state.applicants
    ]);
  }

  /**
   * Called when an Item from the list of employees is removed
   * e.g. when an employee is no longer granted to be chairAdmin
   */
  handleEmployeeRemoved(alteredEmployeeList) {
    this.setState({ employees: alteredEmployeeList });

    this.updatePersonChairRelations([
      ...alteredEmployeeList,
      ...this.state.applicants
    ]);
  }

  handleApplicantDenied(personChairRelations) {
    this.setState({ applicants: personChairRelations });

    this.updatePersonChairRelations([
      ...this.state.employees,
      ...personChairRelations
    ]);
  }

  handleApplicantAccepted(personChairRelations) {
    const acceptedApplicantIndex = personChairRelations.findIndex(applicant => {
      return applicant.active === true;
    });

    // Remove the applicant from the "applicants" list
    let mutatedApplicants = [...this.state.applicants];
    mutatedApplicants.splice(acceptedApplicantIndex, 1);

    // Make the applicant a chairAdmin when his role qualifies
    const appliedRole = personChairRelations[acceptedApplicantIndex].role;

    const roleShouldBeChairAdmin =
      appliedRole === 0 || appliedRole === 2 || appliedRole === 3;

    personChairRelations[
      acceptedApplicantIndex
    ].chairAdmin = roleShouldBeChairAdmin;

    // Push him to the list of employees
    let mutatedEmployees = [...this.state.employees];
    mutatedEmployees.push(personChairRelations[acceptedApplicantIndex]);

    this.setState({
      applicants: mutatedApplicants,
      employees: mutatedEmployees
    });

    let mutatedPersonChairRelations = mutatedApplicants.concat(
      mutatedEmployees
    );

    // Synchronize with BE
    this.updatePersonChairRelations(mutatedPersonChairRelations);
  }

  async updatePersonChairRelations(personChairRelations) {
    const updatedPersonChairRelations = await chairService.updateAllPersonChairRelationsForChair(
      this.state.chairId,
      personChairRelations
    );

    if (updatedPersonChairRelations.status === 200) {
      this.props.getSingleChair(this.props.chairId);
    }
  }

  renderPostsFragment() {
    const personCanPostForChair =
      this.props.personIsEmployee || this.props.personIsSuperAdmin;

    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={10}>
            <Header> {i18next.t("chairpage-news-fragment-headline")}</Header>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            {personCanPostForChair && (
              <Button
                style={{ float: "right" }}
                color="blue"
                onClick={() => {
                  this.setState({ newPostModalOpen: true });
                }}
              >
                {i18next.t("chairpage-new-post-button-label")}
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>

        {this.props.chairPosts &&
          this.props.chairPosts.map((post, index) => {
            return (
              <Grid.Row key={index}>
                <Grid.Column>
                  <PostCard post={post} key={index} />
                </Grid.Column>
              </Grid.Row>
            );
          })}
      </Grid>
    );
  }

  async _handleSubscribeButtonClick() {
    if (this.state.userHasSubscribedToChair) {
      const unsubscribeRequest = await chairService.unsubscribeFromChair(
        this.props.chairId
      );

      if (unsubscribeRequest.status === 200) {
        this.setState({
          userHasSubscribedToChair: false,
          unsubscribeModalOpen: true
        });
        this.props.removeSubscription({ pageId: this.props.chairId });
      } else {
      }
    } else {
      const subscriptionRequest = await chairService.subscribeToChair(
        this.props.chairId
      );

      if (subscriptionRequest.status === 200) {
        this.setState({
          userHasSubscribedToChair: true,
          subscribeModalOpen: true
        });
        this.props.addSubscription({ pageId: this.props.chairId });
      } else {
      }
    }
  }

  render() {
    if (this.props.fetchChairStatus && this.props.fetchChairStatus === 404) {
      this.props.redirectToNotFound();
    }

    if (
      !this.props.users ||
      (this.props.users && this.props.users.length === 0)
    ) {
      this.props.getAllUsers();
    }
    if (
      !this.props.chairs ||
      (this.props.chairs && this.props.chairs.length === 0)
    ) {
      this.props.getAllChairs();
    }

    const chairName = this.props.currentlyViewedChair
      ? this.props.currentlyViewedChair.name
      : "";

    var chairExists = this.props.currentlyViewedChair;

    let email;
    let phoneNumber;
    let phoneNumberMobile;
    let city;
    let street;
    let postCode;

    if (chairExists) {
      if (chairExists && this.props.currentlyViewedChair.address) {
        email = this.props.currentlyViewedChair.address.email || "";
        phoneNumber = this.props.currentlyViewedChair.address.phoneNumber || "";
        phoneNumberMobile =
          this.props.currentlyViewedChair.address.phoneNumberMobile || "";
        city = this.props.currentlyViewedChair.address.city || "";
        street = this.props.currentlyViewedChair.address.street || "";
        postCode = this.props.currentlyViewedChair.address.postCode || "";
      }
    }

    return (
      <div>
        <NavBar />

        <Container>
          <Grid padded>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <div>
                  <Image
                    rounded
                    centered
                    src={universityImage}
                    style={{ maxHeight: "300px" }}
                    fluid
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={3} centered padded>
            <Grid.Row columns={3}>
              <Grid.Column width={11}>
                <Header as="h1" color="blue">
                  {i18next.t("chairpage-chairName-headline") + " " + chairName}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign="center" width={1} />
              <Grid.Column width={4} textAlign="left">
                <ConfirmModal
                  open={this.state.subscribeModalOpen}
                  content={i18next.t(
                    "chairpage-successfully-subscribed-message"
                  )}
                  onOpen={() => {}}
                  onClose={() => {
                    this.setState({ subscribeModalOpen: false });
                  }}
                />

                <ConfirmModal
                  open={this.state.unsubscribeModalOpen}
                  content={i18next.t(
                    "chairpage-successfully-unsubscribed-message"
                  )}
                  onOpen={() => {}}
                  onClose={() => {
                    this.setState({ unsubscribeModalOpen: false });
                  }}
                />

                <ConfirmModal
                  open={this.state.applyToChairConfirmedModalOpen}
                  content={i18next.t("chairpage-successfully-applied-message")}
                  onOpen={() => {}}
                  onClose={() => {
                    this.setState({ applyToChairConfirmedModalOpen: false });
                  }}
                />

                <SubscribeButton
                  size="small"
                  onClick={this._handleSubscribeButtonClick}
                  floated="left"
                  subscribed={this.state.userHasSubscribedToChair}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={11}>
                <Tab
                  menu={{ fluid: true, vertical: true, tabular: true }}
                  panes={this.state.tabBarPanes}
                />
              </Grid.Column>
              <Grid.Column textAlign="center" width={1}>
                <NewEventModal
                  onNewPost={newPost => {
                    this.setState({ newEventModalOpen: false });
                    this.props.createPost(this.props.chairId, newPost);
                  }}
                  onAbortButtonClick={() => {
                    this.setState({ newEventModalOpen: false });
                  }}
                  onCompleteWithError={() => {
                    this.setState({ newEventModalOpen: false });
                  }}
                  open={this.state.newEventModalOpen}
                />

                <ApplyToChairModal
                  chairId={this.props.chairId}
                  chairName={chairName}
                  onCompleteWithSuccess={newPersonChairRelation => {
                    this.props.getSingleChair(this.props.chairId);
                    this.setState({
                      applyToChairModalOpen: false,
                      applyToChairConfirmedModalOpen: true
                    });
                  }}
                  onAbortButtonClick={() => {
                    this.setState({ applyToChairModalOpen: false });
                  }}
                  onCompleteWithError={() => {
                    this.setState({ applyToChairModalOpen: false });
                  }}
                  open={this.state.applyToChairModalOpen}
                />

                <NewPostModal
                  onNewPost={newPost => {
                    this.setState({ newPostModalOpen: false });

                    this.props.createPost(this.props.chairId, newPost);
                  }}
                  onAbortButtonClick={() => {
                    this.setState({ newPostModalOpen: false });
                  }}
                  onCompleteWithError={() => {
                    this.setState({ newPostModalOpen: false });
                  }}
                  open={this.state.newPostModalOpen}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>
                  {i18next.t("chairpage-general-information-label")}
                </Header>
                <AdressCard city={city} postCode={postCode} street={street} />
                <ContactCard
                  email={email}
                  phoneNumber={phoneNumber}
                  phoneNumberMobile={phoneNumberMobile}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

let mapStateToProps = state => {
  const loggedInUserPersonId = state.login.user
    ? state.login.user.person.id
    : null;
  let personIsSuperAdmin = state.login.user ? state.login.user.admin : false;

  const currentlyViewedChair = state.chair.currentlyViewedChair;
  let personIsEmployee = false;
  let personIsApplicant = false;
  let personIsChairAdmin = false;

  if (currentlyViewedChair && loggedInUserPersonId) {
    if (currentlyViewedChair.persons) {
      // 1. Finden ob der eingeloggte User eine der "persons" im "currentlyViewedChair" ist (e.g. das Recht hat zu Posten)
      let personChairRelation = currentlyViewedChair.persons.find(function(
        personChairRelation
      ) {
        return personChairRelation.personId === loggedInUserPersonId;
      });

      if (personChairRelation) {
        if (personChairRelation.active === true) {
          personIsEmployee = true;
        } else {
          personIsApplicant = true;
        }

        console.log(personChairRelation);
        if (personChairRelation.chairAdmin === true) {
          personIsChairAdmin = true;
        }
      }
    }
  }

  console.log(personIsChairAdmin);

  return {
    // Chair related info
    chairId: state.location.payload.chairId,
    chairPosts: state.chair.chairPosts,
    currentlyViewedChair: state.chair.currentlyViewedChair,
    users: state.user.users,
    chairs: state.chair.chairs,

    // Person related infos
    chairSubscriptions: state.login.user
      ? state.login.user.person.subscriptions
      : null,

    personIsSuperAdmin: personIsSuperAdmin,
    personIsChairAdmin: personIsChairAdmin,
    personIsEmployee: personIsEmployee,
    personIsApplicant: personIsApplicant,
    fetchChairStatus: state.chair.fetchChairStatus
  };
};

let mapDispatchToProps = {
  createPost: postActions.createPost,
  getSingleChair: chairActions.getSingleChair,
  getChairPosts: chairActions.getChairPosts,
  addSubscription: userActions.addSubscription,
  removeSubscription: userActions.removeSubscription,
  getAllUsers: userActions.getAllUsers,
  getAllChairs: chairActions.getAllChairs,
  redirect: navigationActions.redirect,
  redirectToNotFound: navigationActions.redirectToNotFound
};

let PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChairPage);
export default PostContainer;
