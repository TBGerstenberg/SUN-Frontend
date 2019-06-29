import React from "react";
import { Segment, Label, Header, Card, List } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import Link from "redux-first-router-link";
import { navigationConstants } from "../redux/_constants";

const MySubsCard = props => {
  {
    console.log(props);
  }
  return (
    <List divided relaxed>
      <List.Item>
        <List.Icon name="github" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>
            {" "}
            <Link
              className="item"
              to={{
                type: navigationConstants.NAVIGATE_TO_CHAIR_PAGE,
                payload: { chairId: props.sub.pageId ? props.sub.pageId : null }
              }}
            >
              Lehrstuhlname
            </Link>
          </List.Header>
          <List.Description as="a">Updated 10 mins ago</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default withTranslation()(MySubsCard);
