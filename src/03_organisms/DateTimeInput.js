import React from "react";
import { withTranslation } from "react-i18next";
import { DateTimeInput } from "semantic-ui-calendar-react";

const SUN_DateTimeInput = props => {
  return (
    <DateTimeInput
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      iconPosition="left"
      onChange={props.onChange}
      label={props.label}
      dateTimeFormat={props.dateTimeFormat}
    />
  );
};

export default withTranslation()(SUN_DateTimeInput);
