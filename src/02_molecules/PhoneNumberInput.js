import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";

/**
 * An Input field capable of displaying a phone number
 * @param {*} props
 */
const PhoneNumberInput = props => {
  return (
    <Field
      name={props.name}
      component={LabelInputField}
      label={{
        content: props.label
      }}
      labelPosition="left"
      placeholder={props.placeholder}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(PhoneNumberInput);
