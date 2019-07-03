import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";
import { Icon } from "semantic-ui-react";
import formValidationUtilities from "../utilities/formValidationUtilities";

const PasswordInput = props => {
  return (
    <Field
      name="password"
      component={LabelInputField}
      type="password"
      label={{
        content: <Icon color="blue" name="lock" size="small" />
      }}
      labelPosition="left"
      placeholder={i18next.t("signup-password-input-placeholder")}
      validate={[
        formValidationUtilities.requiredPassword,
        formValidationUtilities.passwordStrength,
        formValidationUtilities.passwordNotJochen
      ]}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(PasswordInput);
