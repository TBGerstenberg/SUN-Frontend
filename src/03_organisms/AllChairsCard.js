import React from "react";
import { Segment, Label, Header, Card, List } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import Link from "redux-first-router-link";
import { navigationConstants } from "../redux/_constants";

const ChairCard = props => {
  return (
    <List divided relaxed>
      <List.Item>
        <List.Icon name="university" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>
            {" "}
            <Link
              className="item"
              to={{
                type: navigationConstants.NAVIGATE_TO_CHAIR_PAGE,
                payload: { chairId: props.chairId ? props.chairId : null }
              }}
            >
              {props.chairName}
            </Link>
          </List.Header>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default withTranslation()(ChairCard);
