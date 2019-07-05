import React from "react";
import { withTranslation } from "react-i18next";
import Link from "redux-first-router-link";
import { Icon } from "semantic-ui-react";
import { navigationConstants } from "../redux/_constants";

const PersonSearchResult = props => {
  return (
    <div>
      <Icon name="user" />
      <Link
        to={{
          type: navigationConstants.NAVIGATE_TO_PROFILE,
          payload: {
            userId: props.person ? props.person.id : null
          }
        }}
      >
        {props.person.firstName + " " + props.person.lastName}
      </Link>
    </div>
  );
};

export default withTranslation()(PersonSearchResult);
