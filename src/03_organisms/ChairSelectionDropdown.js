import React from "react";
import { Field } from "redux-form";
import i18next from "i18next";
import { Form } from "semantic-ui-react";
import { chairActions } from "../config/redux/_actions";

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

  createDropdownOptionsFromProps() {
    const dropDownOptions = [];

    const chairsFromProps = this.props.chairs;

    chairsFromProps.forEach((chairElement, index) => {
      const dropDownOption = {
        key: index,
        value: chairElement.name,
        text: chairElement.name
      };

      dropDownOptions.push(dropDownOption);
    });
    return dropDownOptions;
  }

  render(props) {
    return (
      <Field
        name="chairs"
        label={i18next.t("complete-profile-chair-label")}
        component={renderSelect}
        options={this.createDropdownOptionsFromProps()}
      />
    );
  }
}

// MOCKED API response, since CORS is currently disabled
const mapStateToProps = state => {
  console.log(state);

  return {
    chairs: [
      {
        name: "CSCW"
      }
    ]
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "completeProfileForm" // a unique identifier for this form
    })(ChairSelectionDropdown)
  )
);
