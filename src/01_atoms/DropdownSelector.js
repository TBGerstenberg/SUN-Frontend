import React from "react";
import { withTranslation } from "react-i18next";
import { Form } from "semantic-ui-react";
import i18next from "i18next";

const DropdownSelector = props => {
  return (
    <Form.Select
      defaultValue={props.defaultValue}
      label={props.label}
      name={props.input.name}
      onBlur={(e, { value }) => {}}
      onChange={(e, { value }) => {
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
