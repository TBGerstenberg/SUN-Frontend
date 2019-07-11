import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";

/**
 * An Input field capable of displaying a postcode
 * @param {*} props
 */
const PostalCodeInput = props => {
  return (
    <Field
      name="postCode"
      component={LabelInputField}
      label={{
        content: i18next.t("complete-profile-postalCode-label")
      }}
      labelPosition="left"
      placeholder={i18next.t("complete-profile-postalCode-placeholder")}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(PostalCodeInput);
