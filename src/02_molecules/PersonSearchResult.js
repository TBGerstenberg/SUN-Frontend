import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import Link from "redux-first-router-link";
import { navigationConstants } from "../redux/_constants";

const PersonSearchResult = props => {
  return (
    <Label>
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
    </Label>
  );
};

export default withTranslation()(PersonSearchResult);
