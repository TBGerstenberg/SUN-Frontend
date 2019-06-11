import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";

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
