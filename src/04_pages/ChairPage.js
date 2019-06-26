import React from "react";
import NavBar from "../03_organisms/NavBar";
import NewPostModal from "../03_organisms/NewPost";
import ConFirmModal from "../03_organisms/ConfirmModal";
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
import { jobPostActions, chairActions } from "../redux/_actions";

export class ChairPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderPostsFragment = this.renderPostsFragment.bind(this);

    const panes = [
      { menuItem: "Aktuelles", render: this.renderPostsFragment },
      {
        menuItem: "Mitarbeiter",
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
      },
      { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ];

    this.state = { chairId: null, newPostModalOpen: false, tabBarPanes: panes };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chairId !== prevState.chairId) {
      console.log(nextProps);

      nextProps.getSingleChair(nextProps.chairId);

      return { chairId: nextProps.chairId };
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

  render() {
    return (
      <div>
        <NavBar />
        <HeaderChairPage />

        <Grid columns={3} centered>
          <Grid.Row>
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
    chairId: state.location.payload.chairId
  };
};

let mapDispatchToProps = {
  addPost: jobPostActions.addPost,
  addPostContent: jobPostActions.addPostContent,
  getSingleChair: chairActions.getSingleChair
};

let PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChairPage);
export default PostContainer;

const HeaderChairPage = () => {
  return (
    <Header as="h1" color="blue" block>
      Lehrstuhlseite
      <span textAlign="right">
        {" "}
        <ConFirmModal />
      </span>
    </Header>
  );
};
