import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";

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
