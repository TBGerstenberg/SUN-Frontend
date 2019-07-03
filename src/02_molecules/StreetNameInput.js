import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";

const StreetNameInput = props => {
  return (
    <Field
      name="street"
      component={LabelInputField}
      label={{
        content: i18next.t("complete-profile-streetName-label")
      }}
      labelPosition="left"
      placeholder={i18next.t("complete-profile-streetName-placeholder")}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(StreetNameInput);
