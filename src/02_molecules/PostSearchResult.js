import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import Link from "redux-first-router-link";
import { navigationConstants } from "../redux/_constants";

const PostSearchResult = props => {
  return (
    <Label>
      <Link
        to={{
          type: navigationConstants.NAVIGATE_TO_CHAIR_PAGE,
          payload: {
            chairId: props.post ? props.post.id : null
          }
        }}
      >
        {props.post.title}
      </Link>
    </Label>
  );
};

export default withTranslation()(PostSearchResult);
