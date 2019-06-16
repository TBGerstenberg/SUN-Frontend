import React from "react";
import { withTranslation } from "react-i18next";
import { Form } from "semantic-ui-react";

const DropdownSelector = props => {
  return (
    <Form.Select
      label={props.label}
      name={props.input.name}
      onBlur={(e, { value }) => {
        props.input.onChange(value);
      }}
      onChange={(e, { value }) => {
        console.log("Changed value to " + value);
        return props.input.onChange(value);
      }}
      options={props.options}
      placeholder={props.placeholder}
      value={props.input.value}
    />
  );
};

// extended main view with translate hoc
export default withTranslation()(DropdownSelector);
