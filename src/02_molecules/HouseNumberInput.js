import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";

const HouseNumberInput = props => {
  return (
    <Field
      name="houseNumber"
      component={LabelInputField}
      label={{
        content: i18next.t("complete-profile-houseNumber-label")
      }}
      labelPosition="left"
      placeholder={i18next.t("complete-profile-houseNumber-placeholder")}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(HouseNumberInput);
