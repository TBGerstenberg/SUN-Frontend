import React from "react";

import NavBar from "../03_organisms/NavBar";
import MySubsCard from "../03_organisms/MySubsCard";
import { login } from "../redux/_reducers";
import { connect } from "react-redux";
import { chairActions } from "../redux/_actions";
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
              <Grid.Column width={8} />
              <Grid.Column width={3} floated="right">
                <Card color="blue">
                  <Card.Content>
                    <Card.Header>Meine Abonnements:</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    {props.subs &&
                      props.subs.map((sub, index) => {
                        return <MySubsCard sub={sub} />;
                      })}
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

let mapStateToProps = state => {
  return {
    subs: state.login.user ? state.login.user.person.subscriptions : [],
    chairs: state.chair.chairs
  };
};

let mapDispatchToProps = {
  getAllChairs: chairActions.getAllChairs
};

let HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
