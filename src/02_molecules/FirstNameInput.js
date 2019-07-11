import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";

/**
 * An text-input field for a persons first name
 * @param {*} props
 */
const FirstNameInput = props => {
  return (
    <Field
      name="firstName"
      component={LabelInputField}
      label={{
        content: i18next.t("complete-profile-firstName-label")
      }}
      labelPosition="left"
      placeholder={i18next.t("complete-profile-firstName-placeholder")}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(FirstNameInput);
