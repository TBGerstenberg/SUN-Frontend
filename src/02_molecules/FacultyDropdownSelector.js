import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import DropdownSelector from "../01_atoms/DropdownSelector";

const FacultyDropdownSelector = props => {
  return (
    <Field
      name="faculty"
      label={i18next.t("faculty-dropdown-label")}
      defaultValue={props.defaultValue}
      placeholder={i18next.t("form-dropdown-placeholder")}
      component={DropdownSelector}
      options={[
        {
          key: 0,
          text: i18next.t("faculty-enum-unset-option"),
          value: "unset"
        },
        {
          key: 1,
          text: i18next.t("faculty-enum-PHIL-option"),
          value: "PHIL"
        },
        {
          key: 2,
          text: i18next.t("faculty-enum-BAK-option"),
          value: "BAK"
        },
        {
          key: 3,
          text: i18next.t("faculty-enum-WIWI-option"),
          value: "WIWI"
        },
        {
          key: 4,
          text: i18next.t("faculty-enum-NT-option"),
          value: "NT"
        },
        {
          key: 5,
          text: i18next.t("faculty-enum-LWF-option"),
          value: "LWF"
        }
      ]}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(FacultyDropdownSelector);
