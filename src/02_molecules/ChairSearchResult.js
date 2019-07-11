import React from "react";
import { withTranslation } from "react-i18next";
import Link from "redux-first-router-link";
import { Icon } from "semantic-ui-react";
import { navigationConstants } from "../redux/_constants";

/**
 * Component that renders a chair-preview item in a list of searchResults
 * @param {*} props
 */
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
