import React from "react";
import { withTranslation } from "react-i18next";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";
import i18next from "i18next";
import DropdownSelector from "../01_atoms/DropdownSelector";

const GenderDropdownSelector = props => {
  return (
    <Field
      name="gender"
      label={i18next.t("complete-profile-gender-label")}
      component={DropdownSelector}
      options={[
        {
          key: 1,
          text: i18next.t("complete-profile-gender-dropdown-option-male"),
          value: "male"
        },
        {
          key: 2,
          text: i18next.t("complete-profile-gender-dropdown-option-female"),
          value: "female"
        },
        {
          key: 3,
          text: i18next.t("complete-profile-gender-dropdown-option-other"),
          value: "other"
        }
      ]}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(GenderDropdownSelector);