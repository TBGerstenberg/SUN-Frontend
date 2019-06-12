import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";
// Components from semantic ui and our own library
import { Image } from "semantic-ui-react";

const Avatar = props => {
  return <Image src={props.src} />;
};

// extended main view with translate hoc
export default withTranslation()(Avatar);
