import React from "react";
import { Field } from "redux-form";
import i18next from "i18next";
import { Form } from "semantic-ui-react";
import { chairActions } from "../redux/_actions";

import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

const renderSelect = field => {
  return (
    <Form.Select
      label={field.label}
      name={field.input.name}
      onBlur={(e, { value }) => {
        field.input.onChange(value);
      }}
      onChange={(e, { value }) => field.input.onChange(value)}
      options={field.options}
      placeholder={field.placeholder}
      value={field.input.value}
    />
  );
};

class ChairSelectionDropdown extends React.Component {
  componentWillMount() {
    this.props.dispatch(chairActions.getAllChairs());
  }

  render(props) {
    return (
      <Field
        name="chairs"
        label={i18next.t("complete-profile-chair-label")}
        component={renderSelect}
        options={this.props.chairsAsDropdownOptions}
      />
    );
  }
}

/**
 * Takes an API Response from the chairs api and constructs an
 * array of dropdown options from it.
 * @param chairs - {Array of Objects} - Array of chair-objects fetched from the API containg a name-attribute.
 */
const createDropdownOptionsFromChairs = chairs => {
  const dropDownOptions = [];
  chairs.forEach((chairElement, index) => {
    const dropDownOption = {
      key: index,
      value: chairElement.id,
      text: chairElement.name
    };

    dropDownOptions.push(dropDownOption);
  });
  return dropDownOptions;
};

const mapStateToProps = state => {
  let chairsAsDropdownOptions = [];
  if (state.chair.chairs) {
    chairsAsDropdownOptions = createDropdownOptionsFromChairs(
      state.chair.chairs
    );
  }

  return {
    chairsAsDropdownOptions: chairsAsDropdownOptions
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "completeProfileForm" // a unique identifier for this form
    })(ChairSelectionDropdown)
  )
);
