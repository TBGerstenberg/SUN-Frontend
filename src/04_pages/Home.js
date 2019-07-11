import i18next from "i18next";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Button, Card, Container, Grid, Icon, Image } from "semantic-ui-react";
import AllChairsCard from "../03_organisms/AllChairsCard";
import NavBar from "../03_organisms/NavBar";
import PostCard from "../03_organisms/PostCard";
import SubscriptionList from "../03_organisms/SubscriptionList";
import logoImageSource from "../assets/images/logo_blue.png";
import { chairActions, postActions, userActions } from "../redux/_actions";

/**
 * Home page of the system - capable of displaying a list of posts in the news-feed,
 * the chairs a user has subscribed to and a list of all chairs that are currently represented within the system.
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chairs: null };
  }

  componentWillMount() {
    this.props.getAllChairs();
    this.props.getFeedPosts();
  }

  render() {
    const props = this.props;
    return (
      <div>
        <NavBar />
        <Container>
          <Grid padded>
            <Grid.Row columns={3} style={{ height: "45px" }}>
              <Grid.Column width={3} floated="left" />
              <Grid.Column width={8}>
                <Button
                  loading={this.props.feedLoading}
                  floated="right"
                  onClick={this.props.getFeedPosts}
                  style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    color: "",
                    paddingRight: "0px"
                  }}
                >
                  <p as="span">
                    <Icon name="refresh" />
                    {i18next.t("home-page-refresh-button-text")}{" "}
                  </p>
                </Button>
              </Grid.Column>
              <Grid.Column width={3} floated="right" />
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column width={4} floated="left">
                <Card color="blue">
                  <Card.Content>
                    <Card.Header>
                      <Trans i18nKey="homePage-all-chairs-card-headline" />
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    {props.chairs &&
                      props.chairs.map((chair, index) => {
                        return (
                          <AllChairsCard
                            key={index}
                            chairId={chair.id}
                            chairName={chair.name}
                            chairAddress={chair.address}
                          />
                        );
                      })}
                  </Card.Content>
                </Card>
              </Grid.Column>

              {this.props.subs && this.props.subs.length > 0 && (
                <Grid.Column width={8}>
                  {this.props.feedPosts &&
                    this.props.feedPosts.length > 0 &&
                    this.props.feedPosts.map((post, index) => {
                      return <PostCard post={post} key={index} />;
                    })}
                </Grid.Column>
              )}

              {this.props.subs && this.props.subs.length === 0 && (
                <Grid.Column width={8} textAlign="center">
                  <Card fluid color="blue">
                    <Card.Header
                      textAlign="center"
                      style={{ margin: "20px 0px" }}
                    >
                      <Image
                        width={78}
                        height={78}
                        src={logoImageSource}
                        centered
                      />
                      {i18next.t("home-page-no-subscriptions-placeholder")}
                    </Card.Header>
                  </Card>
                </Grid.Column>
              )}
              <Grid.Column width={4} floated="right">
                <Card color="blue">
                  <Card.Content>
                    <Card.Header>
                      <Trans i18nKey="homePage-my-subscriptions-card-headline" />
                    </Card.Header>
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
    subs:
      state.login.user && state.login.user.person
        ? state.login.user.person.subscriptions
        : [],
    chairs: state.chair.chairs,
    feedPosts: state.post.feedPosts,
    feedLoading: state.post.fetchingPosts
  };
};

let mapDispatchToProps = {
  getAllChairs: chairActions.getAllChairs,
  getAllUsers: userActions.getAllUsers,
  getFeedPosts: postActions.getFeedPosts
};

let HomeContainer = withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);

export default HomeContainer;
