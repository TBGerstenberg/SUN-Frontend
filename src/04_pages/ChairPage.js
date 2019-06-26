import React from "react";
import NavBar from "../03_organisms/NavBar";
import NewPostModal from "../03_organisms/NewPost";
import ConfirmModal from "../03_organisms/ConfirmModal";
import AvatarJob from "../assets/images/chair_avatar.png";
import { withTranslation, Trans } from "react-i18next";
import ContactCard from "../03_organisms/ContactCard";
import App from "../App";
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
  GridRow
} from "semantic-ui-react";

import { connect } from "react-redux";
import { jobPostActions, chairActions, userActions } from "../redux/_actions";
import { chairService } from "../services";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import SubscribeButton from "../02_molecules/SubscribeButton";

export class ChairPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderPostsFragment = this.renderPostsFragment.bind(this);
    this._handleSubscribeButtonClick = this._handleSubscribeButtonClick.bind(
      this
    );

    const panes = [
      { menuItem: "Aktuelles", render: this.renderPostsFragment },
      {
        menuItem: "Mitarbeiter",
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
      },
      { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ];

    this.state = {
      chairId: null,
      newPostModalOpen: false,
      tabBarPanes: panes,
      subscribeModalOpen: false,
      unsubscribeModalOpen: false,
      userHasSubscribedToChair: null,
      subscriptions: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.chairSubscriptions);

    if (nextProps.chairId !== prevState.chairId) {
      const userHasSubscribedToChair = nextProps.chairSubscriptions.find(
        element => {
          return element.pageId === nextProps.chairId;
        }
      );

      nextProps.getSingleChair(nextProps.chairId);

      return {
        chairId: nextProps.chairId,
        userHasSubscribedToChair: userHasSubscribedToChair
      };
    } else return null;
  }

  renderPostsFragment() {
    return (
      <div>
        <Header>Aktuelles</Header>
        {this.props.posts.map(post => {
          return (
            <Card fluid color="blue">
              <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Description>{post.content}</Card.Description>
                <Card.Meta>
                  <span className="date">01.01.2000</span>

                  <a>
                    <Icon name="user" />
                    Pierre H.
                  </a>
                  <a>
                    <Icon name="info" />
                    {post.subject}
                  </a>
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    );
  }

  async _handleSubscribeButtonClick() {
    if (this.state.userHasSubscribedToChair) {
      const unsubscribeRequest = await chairService.unsubscribeFromChair(
        this.props.chairId
      );

      if (unsubscribeRequest.status === 200) {
        console.log("setting subscribeModal Open");
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
        console.log("setting subscribeModal Open");
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

    return (
      <div>
        <NavBar />

        <Grid columns={3} centered>
          <Grid.Row columns={3}>
            <Grid.Column width={11}>
              <Header as="h1" color="blue">
                {"Lehrstuhl " + chairName}
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="center" width={1} />
            <Grid.Column width={3} textAlign="left">
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

              <Button
                color="teal"
                onClick={() => {
                  this.setState({ newPostModalOpen: true });
                }}
              >
                Neuer Post
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="center" width={1}>
              <NewPostModal
                onNewPost={newPost => {
                  this.setState({ newPostModalOpen: false });
                  this.props.addPost(newPost);
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
            <Grid.Column width={3}>
              <Header>Înformationen</Header>
              <ContactCard />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

//todo
let mapStateToProps = state => {
  return {
    posts: state.post.posts,
    chairId: state.location.payload.chairId,
    currentlyViewedChair: state.chair.currentlyViewedChair,
    chairSubscriptions: state.login.user
      ? state.login.user.person.subscriptions
      : null
  };
};

let mapDispatchToProps = {
  addPost: jobPostActions.addPost,
  addPostContent: jobPostActions.addPostContent,
  getSingleChair: chairActions.getSingleChair,
  addSubscription: userActions.addSubscription,
  removeSubscription: userActions.removeSubscription
};

let PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChairPage);
export default PostContainer;
