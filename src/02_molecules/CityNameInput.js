import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";

const CityNameInput = props => {
  return (
    <Field
      name="cityName"
      component={LabelInputField}
      label={{
        content: i18next.t("complete-profile-cityName-label")
      }}
      labelPosition="left"
      placeholder={i18next.t("complete-profile-cityName-placeholder")}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(CityNameInput);