import React from "react";
import { Segment, Label, Header, Card } from "semantic-ui-react";
import { withTranslation, Trans } from "react-i18next";
import { DateTimeInput } from "semantic-ui-calendar-react";

const SUN_DateInput = props => {
  return (
    <DateTimeInput
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      iconPosition="left"
      onChange={props.onChange}
      label={props.label}
      dateTimeFormat=""
    />
  );
};

export default withTranslation()(SUN_DateInput);
