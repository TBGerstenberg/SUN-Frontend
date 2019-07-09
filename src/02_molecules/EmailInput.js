import React from "react";
import { withTranslation } from "react-i18next";
import { LabelInputField } from "react-semantic-redux-form";
import { Field } from "redux-form";
import { Icon } from "semantic-ui-react";

const EmailInput = props => {
  return (
    <Field
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
