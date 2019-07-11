import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";
import { Icon } from "semantic-ui-react";

/**
 * An iconized input field for the email-adress of a member
 * @param {*} props
 */
const EmailInput = props => {
  return (
    <Field
      disabled={props.disabled || false}
      name={props.name}
      component={LabelInputField}
      label={{
        content: <Icon color="blue" name="user" size="small" />
      }}
      labelPosition="left"
      placeholder={props.placeholder}
      validate={props.validate}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(EmailInput);
