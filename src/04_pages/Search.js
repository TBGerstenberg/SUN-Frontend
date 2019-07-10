import React from "react";
import { Trans } from "react-i18next";
import { connect } from "react-redux";
import { Container, Grid, Header } from "semantic-ui-react";
import ChairCard from "../03_organisms/ChairCard";
import NavBar from "../03_organisms/NavBar";
import PersonCard from "../03_organisms/PersonCard";
import PostCard from "../03_organisms/PostCard";
import { chairActions, postActions, userActions } from "../redux/_actions";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chairs: null, users: [], posts: [] };
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
                <Header>
                  <Trans i18nKey="searchResultPage-searchResult-list-header" />
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column width={5}>
                <Header>
                  <Trans i18nKey="searchResultPage-person-list-header" />
                </Header>
                {props.users &&
                  props.users.map((user, index) => {
                    return <PersonCard user={user} />;
                  })}
              </Grid.Column>
              <Grid.Column width={5}>
                <Header>
                  <Trans i18nKey="searchResultPage-chair-list-header" />
                </Header>
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
                <Header>
                  <Trans i18nKey="searchResultPage-post-list-header" />
                </Header>
                {props.posts &&
                  props.posts.map((post, index) => {
                    return <PostCard post={post} />;
                  })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
let mapStateToProps = state => {
  return {
    chairs: state.search.searchResults && state.search.searchResults.chairs,
    users: state.search.searchResults && state.search.searchResults.persons,
    posts: state.search.searchResults && state.search.searchResults.posts
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
