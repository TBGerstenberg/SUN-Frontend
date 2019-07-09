import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";
import { Icon } from "semantic-ui-react";

const PasswordInput = props => {
  return (
    <Field
      name={props.name}
      component={LabelInputField}
      type="password"
      label={{
        content: <Icon color="blue" name="lock" size="small" />
      }}
      labelPosition="left"
      placeholder={props.placeholder}
      validate={props.validators}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(PasswordInput);
