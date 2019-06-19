import React from "react";
import NavBar from "../03_organisms/NavBar";
import NewPostModal from "../03_organisms/NewPost";
import ConFirmModal from "../03_organisms/ConfirmModal";
import AvatarJob from "../assets/images/job.png";
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
import { jobPostActions } from "../redux/_actions";

export class Job extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <HeaderJobPage />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3}>
              <Avatar_Job />
              <ConFirmModal />
              <NewPostModal
                onNewPost={newPostText => this.props.addPost(newPostText)}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              {this.props.posts.map(posts => {
                return (
                  <Card>
                    
                    <Card.Content>
                    <Card.Header>{posts.title} {posts.Content}</Card.Header>
                      <Card.Meta>
                        <span className="date">01.01.2000</span>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name="user" />
                        Pierre H.
                      </a>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name="info" />
                        JobPost
                      </a>
                    </Card.Content>
                  </Card>
                );
              })}
            </Grid.Column>
            <Grid.Column width={4}>
              <SecondProfile />
            </Grid.Column>
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
    posts: state.job.posts
  };
};

let mapDispatchToProps = {
  addPost: jobPostActions.addPost
};

let JobPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Job);
export default JobPostContainer;

const HeaderJobPage = () => {
  return (
    <Header as="h1" color="blue" block>
      Jobseite
    </Header>
  );
};

const SecondProfile = () => {
  return (
    <div>
      <Header color="blue">Gründungsthema</Header>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  );
};
