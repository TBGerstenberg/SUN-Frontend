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
import { chairActions, postActions, userActions } from "../redux/_actions";
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

    const panes = [
      {
        menuItem: "Aktuelles",
        render: this.renderPostsFragment
      },
      {
        menuItem: "Mitarbeiter",
        render: this.renderEmployeeFragment
      },
      {
        menuItem: "Veranstaltungen",
        render: this.renderEventFragment
      }
    ];

    this.state = {
      chairId: null,
      newPostModalOpen: false,
      newEventModalOpen: false,
      tabBarPanes: panes,
      subscribeModalOpen: false,
      unsubscribeModalOpen: false,
      applyToChairModalOpen: false,
      applyToChairConfirmedModalOpen: false,
      userHasSubscribedToChair: false,
      subscriptions: null,
      persons: []
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
    } else return null;
  }

  renderEventFragment() {
    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={10}>
            <Header> {i18next.t("chairpage-events-fragment-headline")}</Header>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            {this.props.personCanPostForChair && (
              <Button
                style={{ float: "right" }}
                color="teal"
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
          this.props.chairPosts.map(post => {
            // 2  is type "event"
            if (post.type === 2) {
              return (
                <Grid.Row>
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
    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={10}>
            {" "}
            <Header>{i18next.t("chairpage-employee-fragment-headline")}</Header>
          </Grid.Column>

          <Grid.Column width={6} floated="right">
            {this.props.personCanApplyToChair && (
              <Button
                style={{ float: "right" }}
                color="teal"
                onClick={() => {
                  this.setState({
                    applyToChairModalOpen: true
                  });
                }}
              >
                {i18next.t("chairpage-apply-to-chair-button-label")}
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <PersonList
              persons={
                this.props.currentlyViewedChair.persons
                  ? this.props.currentlyViewedChair.persons
                  : []
              }
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderPostsFragment() {
    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={10}>
            {" "}
            <Header> {i18next.t("chairpage-news-fragment-headline")}</Header>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            {this.props.personCanPostForChair && (
              <Button
                style={{ float: "right" }}
                color="teal"
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
          this.props.chairPosts.map(post => {
            return (
              <Grid.Row>
                <Grid.Column>
                  <PostCard post={post} />
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

//todo
let mapStateToProps = state => {
  const currentlyViewedChair = state.chair.currentlyViewedChair;
  const loggedInUserPersonId = state.login.user
    ? state.login.user.person.id
    : null;
  var personCanPostForChair = false;
  var personIsChairAdmin = false;
  let personCanApplyToChair = true;

  if (currentlyViewedChair && loggedInUserPersonId) {
    if (currentlyViewedChair.persons) {
      // 1. Finden ob der eingeloggte User eine der "persons" im "currentlyViewedChair" ist (e.g. das Recht hat zu Posten)
      let person = currentlyViewedChair.persons.find(function(
        arrayElement,
        index
      ) {
        return arrayElement.personId === loggedInUserPersonId;
      });

      if (person) {
        personCanPostForChair = true;
        personCanApplyToChair = false;
      }

      if (person && person.role === 3) {
        personIsChairAdmin = true;
      }
    } else {
      personCanPostForChair = false;
    }

    // 2. Finden ob der eingeloggte User einer der Subscriber des "currentlyViewedChair" ist (e.g. der Abo-button )
  }

  return {
    chairId: state.location.payload.chairId,
    currentlyViewedChair: state.chair.currentlyViewedChair,
    chairPosts: state.chair.chairPosts,
    users: state.user.users,
    chairs: state.chair.chairs,

    chairSubscriptions: state.login.user
      ? state.login.user.person.subscriptions
      : null,

    personCanPostForChair: personCanPostForChair,
    personCanApplyToChair: personCanApplyToChair,
    personIsChairAdmin: personIsChairAdmin
  };
};

let mapDispatchToProps = {
  createPost: postActions.createPost,
  getSingleChair: chairActions.getSingleChair,
  getChairPosts: chairActions.getChairPosts,
  addSubscription: userActions.addSubscription,
  removeSubscription: userActions.removeSubscription,
  getAllUsers: userActions.getAllUsers,
  getAllChairs: chairActions.getAllChairs
};

let PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChairPage);
export default PostContainer;
