import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import i18next from "i18next";
import DropdownSelector from "../01_atoms/DropdownSelector";

const TitleDropdownSelector = props => {
  return (
    <Field
      name="title"
      label={i18next.t("complete-profile-title-label")}
      component={DropdownSelector}
      options={[
        {
          key: 0,
          text: i18next.t("complete-profile-title-dropdown-option-bachelor"),
          value: "Bachelor"
        },
        {
          key: 1,
          text: i18next.t("complete-profile-title-dropdown-option-master"),
          value: "Master"
        },
        {
          key: 2,
          text: i18next.t("complete-profile-title-dropdown-option-dr"),
          value: "Dr."
        },
        {
          key: 3,
          text: i18next.t("complete-profile-title-dropdown-option-prof-dr"),
          value: "Prof. Dr."
        }
      ]}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(TitleDropdownSelector);
