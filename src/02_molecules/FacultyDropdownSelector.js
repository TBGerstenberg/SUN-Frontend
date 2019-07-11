import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import DropdownSelector from "../01_atoms/DropdownSelector";

/**
 * A dropdown-selector containing the faculties of a university.
 * NOTE: Faculty names should be fetched from the server instead of being hardcoded
 * in the system, as in @see RoleSelectionDropdown
 */
const FacultyDropdownSelector = props => {
  return (
    <Field
      name="faculty"
      label={i18next.t("faculty-dropdown-label")}
      placeholder={i18next.t("form-dropdown-placeholder")}
      defaultValue={props.defaultValue}
      component={DropdownSelector}
      options={[
        {
          key: 0,
          text: i18next.t("faculty-enum-unset-option"),
          value: 0
        },
        {
          key: 1,
          text: i18next.t("faculty-enum-PHIL-option"),
          value: 1
        },
        {
          key: 2,
          text: i18next.t("faculty-enum-BAK-option"),
          value: 2
        },
        {
          key: 3,
          text: i18next.t("faculty-enum-WIWI-option"),
          value: 3
        },
        {
          key: 4,
          text: i18next.t("faculty-enum-NT-option"),
          value: 4
        },
        {
          key: 5,
          text: i18next.t("faculty-enum-LWF-option"),
          value: 5
        }
      ]}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(FacultyDropdownSelector);
