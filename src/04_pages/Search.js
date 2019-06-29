import React from "react";
import NavBar from "../03_organisms/NavBar";
import ChairCard from "../03_organisms/ChairCard";
import PersonCard from "../03_organisms/PersonCard";
import PostCard from "../03_organisms/PostCard";

import { chairActions, userActions, postActions } from "../redux/_actions";
import { connect } from "react-redux";

import { Grid, Header, Container } from "semantic-ui-react";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chairs: null, users: [], posts: [] };
  }

  componentWillMount() {
    this.props.getAllChairs();
    this.props.getAllUsers();
    this.props.getAllPosts();
  }

  

  render() {
    
    const props = this.props;
    return (
      <div>
        <NavBar />
        <Container>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column width={16} verticalAlign="middle">
                <Header>Suchergebnisse:</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column width={5}>
                <Header>Personen:</Header>
                {props.users &&
                  props.users.map((user, index) => {
                      
                    return (
                      <PersonCard
                        user = {user}
                      />
                    );
                  })}
              </Grid.Column>
              <Grid.Column width={5}>
                <Header>Lehrstühle:</Header>
                {props.chairs &&
                  props.chairs.map((chair, index) => {
                    return (
                      <ChairCard
                      chairId={chair.id}
                      chairName={chair.name}
                      chairAddress={chair.address}
                      />
                    );
                  })}
              </Grid.Column>
              <Grid.Column width={5}>
                <Header>Postings:</Header>
                {props.posts &&
                  props.posts.map((post, index) => {
                      
                    return (
                      <PostCard
                        post = {post}
                      />
                    );
                  })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );

  }
  
}

let mapStateToProps = state => {
  return {
    chairs: state.chair.chairs,
    users: state.user.users,
    posts: state.post.posts
  };
};

let mapDispatchToProps = {
  getAllChairs: chairActions.getAllChairs,
  getAllUsers: userActions.getAllUsers,
  getAllPosts: postActions.getAllPosts
};

let SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
