import React from "react";
import { withTranslation } from "react-i18next";
import { DateInput } from "semantic-ui-calendar-react";

const SUN_DateInput = props => {
  return (
    <DateInput
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      iconPosition="left"
      onChange={props.onChange}
      label={props.label}
      dateFormat="DD.MM.YYYY"
    />
  );
};

export default withTranslation()(SUN_DateInput);
