import React from "react";
import NavBar from "../03_organisms/NavBar";
import NewPostModal from "../03_organisms/NewPost";
import NewEventModal from "../03_organisms/NewEventModal";
import ConfirmModal from "../03_organisms/ConfirmModal";
import AvatarJob from "../assets/images/chair_avatar.png";
import { withTranslation, Trans } from "react-i18next";
import ContactCard from "../03_organisms/ContactCard";
import App from "../App";
import PersonList from "../03_organisms/PersonList";
import universityImage from "../assets/images/universityImage.jpg";
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
  Modal,
  Card,
  Tab,
  GridRow,
  List
} from "semantic-ui-react";

import { connect } from "react-redux";
import { postActions, chairActions, userActions } from "../redux/_actions";
import { chairService } from "../services";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import SubscribeButton from "../02_molecules/SubscribeButton";
import PostCard from "../03_organisms/PostCard";
import AdressCard from "../03_organisms/AdressCard";
import { S_IXGRP } from "constants";

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
      userHasSubscribedToChair: false,
      subscriptions: null,
      persons: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chairId !== prevState.chairId) {
      nextProps.getSingleChair(nextProps.chairId);

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
        <Grid.Row columns={2}>
          <Grid.Column width={10} verticalAlign="middle">
            <Header>Veranstaltungen</Header>
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
                Neue Veranstaltung
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>

        {this.props.currentlyViewedChair &&
          this.props.currentlyViewedChair.posts &&
          this.props.currentlyViewedChair.posts.map(post => {
            // 2  is type "event"
            if (post.type === 2) {
              return (
                <Grid.Row>
                  <Grid.Column>
                    <PostCard
                      title={post.title}
                      content={post.content}
                      authorId={post.authorId}
                      postType={post.type}
                      createdAt={post.createdAt}
                    />
                  </Grid.Column>
                </Grid.Row>
              );
            } else {
              return;
            }
          })}
      </Grid>
    );
  }

  renderEmployeeFragment() {
    return (
      <div>
        <PersonList
          persons={
            this.props.currentlyViewedChair.persons
              ? this.props.currentlyViewedChair.persons
              : []
          }
        />
      </div>
    );
  }

  renderPostsFragment() {
    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={10}>
            {" "}
            <Header>Aktuelles</Header>
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
                Neuer Post
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>

        {this.props.currentlyViewedChair &&
          this.props.currentlyViewedChair.posts &&
          this.props.currentlyViewedChair.posts.map(post => {
            return (
              <Grid.Row>
                <Grid.Column>
                  <PostCard
                    title={post.title}
                    content={post.content}
                    authorId={post.authorId}
                    postType={post.type}
                    createdAt={post.createdAt}
                  />
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
    console.log(this.props);
    return (
      <div>
        <NavBar />

        <Container>
          <Grid padded>
            <Grid.Row columns={1}>
              <Grid.Column width={16}>
                <div>
                  <Image rounded centered src={universityImage} fluid />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={3} centered padded>
            <Grid.Row columns={3}>
              <Grid.Column width={11}>
                <Header as="h1" color="blue">
                  {"Lehrstuhl " + chairName}
                </Header>
              </Grid.Column>
              <Grid.Column textAlign="center" width={1} />
              <Grid.Column width={4} textAlign="left">
                <ConfirmModal
                  open={this.state.subscribeModalOpen}
                  content={"Erfolgreich abonniert"}
                  onOpen={() => {}}
                  onClose={() => {
                    this.setState({ subscribeModalOpen: false });
                  }}
                />

                <ConfirmModal
                  open={this.state.unsubscribeModalOpen}
                  content={"Erfolgreich deabonniert"}
                  onOpen={() => {}}
                  onClose={() => {
                    this.setState({ unsubscribeModalOpen: false });
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
                <Header>Informationen</Header>
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

  if (currentlyViewedChair && loggedInUserPersonId) {
    // 1. Finden ob der eingeloggte User eine der "persons" im "currentlyViewedChair" ist (e.g. das Recht hat zu Posten)
    let person = currentlyViewedChair.persons.find(function(
      arrayElement,
      index
    ) {
      return (
        arrayElement.personId === loggedInUserPersonId &&
        (arrayElement.role === 0 ||
          arrayElement.role === 1 ||
          arrayElement.role === 2 ||
          arrayElement.role === 3 ||
          arrayElement.role === 4)
      );
    });

    if (person) {
      personCanPostForChair = true;
    }

    // 2. Finden ob der eingeloggte User einer der Subscriber des "currentlyViewedChair" ist (e.g. der Abo-button )
  }

  return {
    chairId: state.location.payload.chairId,
    currentlyViewedChair: state.chair.currentlyViewedChair,
    personCanPostForChair: personCanPostForChair,
    chairSubscriptions: state.login.user
      ? state.login.user.person.subscriptions
      : null
  };
};

let mapDispatchToProps = {
  createPost: postActions.createPost,
  getSingleChair: chairActions.getSingleChair,
  getChairPosts: chairActions.getChairPosts,
  addSubscription: userActions.addSubscription,
  removeSubscription: userActions.removeSubscription
};

let PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChairPage);
export default PostContainer;
