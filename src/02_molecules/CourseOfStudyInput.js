import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";

const CourseOfStudyInput = props => {
  return (
    <Field
      name="courseOfStudy"
      component={LabelInputField}
      label={{
        content: i18next.t("complete-profile-courseOfStudy-label")
      }}
      labelPosition="left"
      placeholder={i18next.t("complete-profile-courseOfStudy-placeholder")}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(CourseOfStudyInput);
