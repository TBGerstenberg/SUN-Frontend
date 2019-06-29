import React from "react";
import NavBar from "../03_organisms/NavBar";
import { chairActions } from "../redux/_actions";
import { connect } from "react-redux";
import { Grid, Header, Icon, Card, Container } from "semantic-ui-react";
import ChairCard from "../03_organisms/ChairCard";
class AllChairs extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chairs: null };
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
          <HeaderAllChairsPage />
          <Grid columns={2} padded>
            <Grid.Row>
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
            </Grid.Row>
          </Grid>

          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column textAlign="center" width={3} />
              <Grid.Column width={8} />
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    chairs: state.chair.chairs
  };
};

let mapDispatchToProps = {
  getAllChairs: chairActions.getAllChairs
};

let chairContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChairs);

const HeaderAllChairsPage = () => {
  return (
    <Header as="h1" color="blue">
      Alle Lehrstühle
    </Header>
  );
};
export default chairContainer;
