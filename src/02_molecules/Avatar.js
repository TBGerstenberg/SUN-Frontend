import React from "react";
import { withTranslation } from "react-i18next";
// Components from semantic ui and our own library
import { Image } from "semantic-ui-react";

/**
 * Renders an avatar Image
 */
const Avatar = props => {
  return <Image src={props.src} />;
};

// extended main view with translate hoc
export default withTranslation()(Avatar);
