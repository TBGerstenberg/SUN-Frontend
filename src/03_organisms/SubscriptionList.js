import React from "react";
import { connect } from "react-redux";
import Link from "redux-first-router-link";
import { List } from "semantic-ui-react";
import { navigationConstants } from "../redux/_constants";

class SubscriptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: null,
      subscriptions: props.subscriptions
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.chairs != prevState.chairs && nextProps.chairs.length != 0) {
      let subscriptionsCopy = [...prevState.subscriptions];

      subscriptionsCopy.forEach((subscription, index) => {
        const indexOfChairForSubscription = nextProps.chairs.findIndex(
          chair => {
            return chair.id == subscription.pageId;
          }
        );

        if (indexOfChairForSubscription !== -1) {
          subscription.chair = nextProps.chairs[indexOfChairForSubscription];
        }
      });

      return { chairs: nextProps.chairs, subscriptions: subscriptionsCopy };
    } else {
      return prevState;
    }
  }

  render() {
    return (
      <List relaxed>
        {this.state.subscriptions &&
          this.state.subscriptions.map((sub, index) => {
            return <SubscriptionListItem subscription={sub} key={index} />;
          })}
      </List>
    );
  }
}

const SubscriptionListItem = props => {
  return (
    <List.Item>
      <List.Icon name="rss" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>
          <Link
            className="item"
            to={{
              type: navigationConstants.NAVIGATE_TO_CHAIR_PAGE,
              payload: {
                chairId: props.subscription.pageId
                  ? props.subscription.pageId
                  : null
              }
            }}
          >
            {props.subscription.chair && props.subscription.chair.name}
          </Link>
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
let mapStateToProps = state => {
  return {
    chairs: state.chair.chairs || []
  };
};

export default connect(mapStateToProps)(SubscriptionList);
