import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";

/**
 * A number based Input field for a student-Identification number
 */
const StudentIdInput = props => {
  return (
    <Field
      name="studentId"
      component={LabelInputField}
      label={{
        content: i18next.t("complete-profile-studentId-label")
      }}
      labelPosition="left"
      placeholder={i18next.t("complete-profile-studentId-placeholder")}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(StudentIdInput);
