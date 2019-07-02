import React from "react";
import { Segment, Label, Header, Card, Icon } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import { navigationConstants } from "../redux/_constants";
import Link from "redux-first-router-link";

const ChairSearchResult = props => {
  return (
    <div>
      <Icon name="university" />
      <Link
        to={{
          type: navigationConstants.NAVIGATE_TO_CHAIR_PAGE,
          payload: {
            chairId: props.chair ? props.chair.id : null
          }
        }}
      >
        {props.chair.name}
      </Link>
    </div>
  );
};

export default withTranslation()(ChairSearchResult);
