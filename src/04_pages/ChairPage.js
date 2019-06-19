import React from "react";
import NavBar from "../03_organisms/NavBar";
import NewPostModal from "../03_organisms/NewPost";
import ConFirmModal from "../03_organisms/ConfirmModal";
import AvatarJob from "../assets/images/chair_avatar.png";
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
  Card
} from "semantic-ui-react";

import { connect } from "react-redux";
import { jobPostActions, chairActions } from "../redux/_actions";

export class ChairPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chairId: null };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chairId !== prevState.chairId) {
      console.log(nextProps);

      nextProps.getSingleChair(nextProps.chairId);
      

      return { chairId: nextProps.chairId };
    } else return null;
  }

  render() {
    return (
      <div>
        <NavBar />
        <HeaderChairPage />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3}>
              <Avatar_Job />
              <ConFirmModal />
              <NewPostModal
                onNewPost={newPost => this.props.addPost(newPost)}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header>Posts</Header>
              {this.props.posts.map(post => {
                return (
                  <Card>
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
            </Grid.Column>
            <Grid.Column width={4} />
          </Grid.Row>
        </Grid>

        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3} />
            <Grid.Column width={8} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}



const Contact_Form = () => {
  return (
    <div>
      {" "}
      <Header color="blue">Jobangebote</Header>
    </div>
  );
};

const Avatar_Job = () => {
  return <Image src={AvatarJob} />;
};

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
    </Header>
  );
};
