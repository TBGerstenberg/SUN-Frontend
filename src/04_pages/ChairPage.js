import i18next from "i18next";
import React from "react";
import { connect } from "react-redux";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { Button, Container, Grid, Header, Image, Tab } from "semantic-ui-react";
import SubscribeButton from "../02_molecules/SubscribeButton";
import AddEntityModal from "../03_organisms/AddEntityModal";
import AdressCard from "../03_organisms/AdressCard";
import ApplyToChairModal from "../03_organisms/ApplyToChairModal";
import ChairForm from "../03_organisms/ChairForm";
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
      editChairModalOpen: false,
      persons: [],
      employees: [],
      applicants: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(prevState);

    // As soon as the chairId of the chair that shall be viewed is available from redux
    if (nextProps.chairId !== prevState.chairId) {
      // Fetch the data for it
      nextProps.getSingleChair(nextProps.chairId);
      nextProps.getChairPosts(nextProps.chairId);

      // Check if the user has subscribed to the chair that is being viewed
      const chairIsInUsersSubscriptions = nextProps.chairSubscriptions.find(
        element => {
          return element.pageId == nextProps.chairId;
        }
      );

      // If so, save it in the componens state
      if (chairIsInUsersSubscriptions != null) {
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

      // As soon as the chair that shall be displayed arrives
    } else if (nextProps.currentlyViewedChair) {
      // Filter applicants and employees
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
    // Rechte aus Rollen ableiten

    const personCanEditEmployees =
        this.props.personIsChairAdmin || this.props.personIsSuperAdmin,
      personCanManageChairAdmins =
        this.props.personIsChairAdmin || this.props.personIsSuperAdmin,
      personCanApplyToChair =
        !this.props.personIsEmployee && !this.props.personIsApplicant,
      personHasAlreadyApplied = this.props.personIsApplicant,
      chairHasEmployees =
        this.props.currentlyViewedChair &&
        this.props.currentlyViewedChair.persons &&
        this.props.currentlyViewedChair.persons.length > 0;

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
   * @param {Array of PersonChairRelation Objects} alteredEmployeeList - Collection of personChairRelations of Employees that have been updated
   * @see /src/models/personChairRelation
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
   * @param {Array of PersonChairRelation Objects} alteredEmployeeList - Collection of personChairRelations of Employees in which one or more entries have been removed
   * @see /src/models/personChairRelation
   */
  handleEmployeeRemoved(alteredEmployeeList) {
    this.setState({ employees: alteredEmployeeList });

    this.updatePersonChairRelations([
      ...alteredEmployeeList,
      ...this.state.applicants
    ]);
  }

  /**
   * Handles a click onto the "deny" button which is visible for each applicant of the chair
   * Given that the user has permission to perform this operation.
   * @param {Array of PersonChairRelation Objects} personChairRelations - List of PersonChairRelations containg applicants of a chair where one or more have been denied
   * @see /src/models/personChairRelation
   */
  handleApplicantDenied(personChairRelations) {
    this.setState({ applicants: personChairRelations });

    this.updatePersonChairRelations([
      ...this.state.employees,
      ...personChairRelations
    ]);
  }

  /**
   * Handles a click onto the "accept button" which is visible for each applicant of a chair.
   * Given that the user has permission to perform this operation.
   * @param {Array of PersonChairRelation Objects} personChairRelations - List of PersonChairRelations containg applicants of a chair where one or more have been accepted
   * @see /src/models/personChairRelation
   */
  handleApplicantAccepted(personChairRelations) {
    const acceptedApplicantIndex = personChairRelations.findIndex(applicant => {
      return applicant.active === true;
    });

    // Remove the applicant from the "applicants" list
    let mutatedApplicants = [...this.state.applicants];
    mutatedApplicants.splice(acceptedApplicantIndex, 1);

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

  /**
   *  Triggers a network request to update the relations of employees to the chair they are employed at or applied to.
   * @param {Array of PersonChairRelation Objects} personChairRelations - Complete list of personChairRelations containing applicants and employees that shall be synchronized to the backend services.
   * @see /src/models/personChairRelation
   */
  async updatePersonChairRelations(personChairRelations) {
    const updatedPersonChairRelations = await chairService.updateAllPersonChairRelationsForChair(
      this.state.chairId,
      personChairRelations
    );

    // Re-fetch the chair to allow refreshing the content of the page without a page reload.
    if (updatedPersonChairRelations.status === 200) {
      this.props.getSingleChair(this.props.chairId);
    }
  }

  /**
   * Renders the fragment of the page that contains "current news" and generic posts of the chair.
   */
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

  /**
   * Handles a click on the subsribe button on the chairpage
   * which triggers a subscribe- or remove-subscription request
   */
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

  // Renders a success message in response to failed network requests
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

  // Renders an error message in response to failed network requests
  toggleErrorMessage(title, message) {
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

  render() {
    // Catch if no chair with the given ID can be found, which is the case when a user directly changes the url in his browser
    if (this.props.fetchChairStatus && this.props.fetchChairStatus === 404) {
      this.props.redirectToNotFound();
    }

    //  Fetch all users if the site was navigated to by directly manipulating urls, used to populate the author-field of chairposts with an actual user instead of a profile link, so his name can be displayed on the posts
    if (
      !this.props.users ||
      (this.props.users && this.props.users.length === 0)
    ) {
      this.props.getAllUsers();
    }

    // Fetch all chairs if the site was navigated to by directly manipuating urls, used to populate the chair-field on each post
    if (
      !this.props.chairs ||
      (this.props.chairs && this.props.chairs.length === 0)
    ) {
      this.props.getAllChairs();
    }

    // Once the chair is loaded, display its name in the top-heading
    const chairName = this.props.currentlyViewedChair
      ? this.props.currentlyViewedChair.name
      : "";

    var chairExists = this.props.currentlyViewedChair;

    // Populate information about the chair if it exists
    let email, phoneNumber, phoneNumberMobile, city, street, postCode, room;

    const personCanEditChairInfo =
      this.props.personIsChairAdmin || this.props.personIsSuperAdmin;

    if (chairExists) {
      if (this.props.currentlyViewedChair.address) {
        email = this.props.currentlyViewedChair.address.email || "";
        phoneNumber = this.props.currentlyViewedChair.address.phoneNumber || "";
        phoneNumberMobile =
          this.props.currentlyViewedChair.address.phoneNumberMobile || "";
        city = this.props.currentlyViewedChair.address.city || "";
        street = this.props.currentlyViewedChair.address.street || "";
        postCode = this.props.currentlyViewedChair.address.postCode || "";
        room = this.props.currentlyViewedChair.address.room || "";
      }
    }

    return (
      <div style={{ minHeight: "800px" }}>
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

                {/** Used to edit a chair  */}
                <AddEntityModal
                  size="large"
                  modalContent={
                    <ChairForm
                      chair={this.props.currentlyViewedChair}
                      onAbortButtonClick={() => {
                        this.setState({ editChairModalOpen: false });
                      }}
                      onCompleteWithSuccess={() => {
                        this.toggleSuccessMessage(
                          "Erfolg",
                          "Lehrstuhl editiert"
                        );
                        this.setState({ editChairModalOpen: false });
                        this.props.getSingleChair(this.props.chairId);
                      }}
                      onCompleteWithError={error => {
                        this.toggleErrorMessage("Fehler", error);
                        this.setState({ editChairModalOpen: false });
                      }}
                    />
                  }
                  open={this.state.editChairModalOpen}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>
                  {i18next.t("chairpage-general-information-label")}
                </Header>
                <AdressCard
                  city={city}
                  postCode={postCode}
                  street={street}
                  room={room}
                />
                <ContactCard
                  email={email}
                  phoneNumber={phoneNumber}
                  phoneNumberMobile={phoneNumberMobile}
                />
                {personCanEditChairInfo && (
                  <Button
                    style={{ float: "left" }}
                    color="teal"
                    onClick={() => {
                      this.setState({ editChairModalOpen: true });
                    }}
                  >
                    {i18next.t("chairpage-edit-chair-button-label")}
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={11} />
              <Grid.Column width={1} />
              <Grid.Column width={4}>
                <SemanticToastContainer />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

// Map Redux-store data to the components props.
let mapStateToProps = state => {
  const loggedInUserPersonId = state.login.user
    ? state.login.user.person.id
    : null;
  let personIsSuperAdmin = state.login.user ? state.login.user.admin : false;

  const currentlyViewedChair = state.chair.currentlyViewedChair;
  let personIsEmployee = false;
  let personIsApplicant = false;
  let personIsChairAdmin = false;

  // Rechte für die aktuelle Seite berechnen
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

        if (personChairRelation.chairAdmin === true) {
          personIsChairAdmin = true;
        }
      }
    }
  }

  // Daten aus dem Redux-Store auf die Props der Komponente mappen
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
