import React from "react";

import NavBar from "../03_organisms/NavBar";
import SubscriptionList from "../03_organisms/SubscriptionList";
import { login } from "../redux/_reducers";
import { connect } from "react-redux";
import { chairActions, userActions } from "../redux/_actions";
import PostCard from "../03_organisms/PostCard";
import AllChairsCard from "../03_organisms/AllChairsCard";
import {
  Segment,
  Label,
  Header,
  Card,
  List,
  Grid,
  Container
} from "semantic-ui-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chairs: null, subs: [] };
  }

  componentWillMount() {
    this.props.getAllChairs();
    this.props.getAllUsers();
  }

  render() {
    const props = this.props;
    return (
      <div>
        <NavBar />
        <Container>
          <Grid padded>
            <Grid.Row columns={3}>
              <Grid.Column width={3} floated="left">
                <Card color="blue">
                  <Card.Content>
                    <Card.Header>Alle Lehrstühle:</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    {props.chairs &&
                      props.chairs.map((chair, index) => {
                        return (
                          <AllChairsCard
                            chairId={chair.id}
                            chairName={chair.name}
                            chairAddress={chair.address}
                          />
                        );
                      })}
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                {this.props.feedPosts &&
                  this.props.feedPosts.length > 0 &&
                  this.props.feedPosts.map((post, index) => {
                    return <PostCard post={post} key={index} />;
                  })}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                <Card color="blue">
                  <Card.Content>
                    <Card.Header>Meine Abonnements:</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    {this.props.subs && (
                      <SubscriptionList subscriptions={this.props.subs} />
                    )}
                  </Card.Content>
                </Card>
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
    subs: state.login.user ? state.login.user.person.subscriptions : [],
    chairs: state.chair.chairs,
    feedPosts: [
      {
        id: 4,
        type: 0,
        title: "Hallo Welt",
        summary:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut l...",
        content:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        pageId: 1,
        authorId: 1,
        createdAt: "2019-07-02T18:39:06.563803+02:00",
        updatedAt: "2019-07-02T18:39:06.563809+02:00"
      }
    ]
  };
};

let mapDispatchToProps = {
  getAllChairs: chairActions.getAllChairs,
  getAllUsers: userActions.getAllUsers
};

let HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
