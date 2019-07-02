import React from "react";
import { Segment, Label, Header, Card, Icon } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import Link from "redux-first-router-link";
import { navigationConstants } from "../redux/_constants";

const PostSearchResult = props => {
  return (
    <div>
      <Icon name="comment" />
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
    </div>
  );
};

export default withTranslation()(PostSearchResult);
