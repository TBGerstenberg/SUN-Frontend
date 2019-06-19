import React from "react";
import NavBar from "../03_organisms/NavBar";
import { chairActions } from "../redux/_actions";
import { connect } from "react-redux";
import { Grid, Header, Icon, Card } from "semantic-ui-react";

class AllChairs extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chairs: null };
  }

  componentWillMount(allChairs){
     this.props.getAllChairs()
  }

  render() {
    return (
      <div>
        <NavBar />
        
        <HeaderAllChairsPage />
        <Grid columns={2}>
          <Grid.Row>
            <Card>
              <Card.Content>
                {this.props.getAllChairs.name}
                <Card.Header />
                <Card.Description />
                <Card.Meta>
                  <a>
                    <Icon name="user" />
                    Lehrstuhlname
                  </a>
                  
                </Card.Meta>
              </Card.Content>
            </Card>

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

let mapStateToProps = state => {
  return {
    chairs: state.location.payload.chairs
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
    <Header as="h1" color="blue" block>
      Alle Lehrstühle
    </Header>
  );
};
export default chairContainer;
