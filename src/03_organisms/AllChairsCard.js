import React from "react";
import { withTranslation } from "react-i18next";
import Link from "redux-first-router-link";
import { List } from "semantic-ui-react";
import { navigationConstants } from "../redux/_constants";
import "./allChairsCard.css";

const ChairCard = props => {
  return (
    <List divided relaxed>
      <List.Item>
        <List.Icon name="university" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header>
            {" "}
            <Link
              className="item chairLink"
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
