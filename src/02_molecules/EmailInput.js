import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";
import formValidationUtilities from "../utilities/formValidationUtilities";
import { Icon } from "semantic-ui-react";

const EmailInput = props => {
  return (
    <Field
      name="email"
      component={LabelInputField}
      label={{
        content: <Icon color="blue" name="user" size="small" />
      }}
      labelPosition="left"
      placeholder={i18next.t("signup-email-input-placeholder")}
      validate={props.validate}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(EmailInput);
