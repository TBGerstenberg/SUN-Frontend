import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Container, Grid, Header } from "semantic-ui-react";
import ChairCard from "../03_organisms/ChairCard";
import NavBar from "../03_organisms/NavBar";
import { chairActions } from "../redux/_actions";

/**
 * A Component capable of rendering a list of all chairs
 * in a Card-based Layout.
 */
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

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
let mapStateToProps = state => {
  return {
    chairs: state.chair.chairs
  };
};

let mapDispatchToProps = {
  getAllChairs: chairActions.getAllChairs
};

let chairContainer = withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllChairs)
);

const HeaderAllChairsPage = () => {
  return (
    <Header as="h1" color="blue">
      <Trans i18nKey="homePage-all-chairs-card-headline" />
    </Header>
  );
};
export default chairContainer;
