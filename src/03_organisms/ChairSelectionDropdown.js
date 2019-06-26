import React from "react";
import i18next from "i18next";
import { Form } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import { isArray } from "util";

class ChairSelectionDropdown extends React.Component {
  constructor(props) {
    super(props);

    let chairsAsDropdownOptions = [];
    if (props && props.chairs && isArray(props.chairs)) {
      chairsAsDropdownOptions = this.createDropdownOptionsFromChairs(
        props.chairs
      );
    }

    this.state = {
      chairsAsDropdownOptions: chairsAsDropdownOptions
    };
  }

  /**
   * Takes an API Response from the chairs api and constructs an
   * array of dropdown options from it.
   * @param chairs - {Array of Objects} - Array of chair-objects fetched from the API containg a name-attribute.
   */
  createDropdownOptionsFromChairs = chairs => {
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

  render(props) {
    return (
      <Form.Select
        label={i18next.t("complete-profile-chair-label")}
        name="chair"
        onBlur={(e, { value }) => {}}
        onChange={(e, { value }) => {
          this.props.onChange(value);
        }}
        options={this.state.chairsAsDropdownOptions}
        placeholder={i18next.t("complete-profile-chair-label")}
      />
    );
  }
}

export default withTranslation()(ChairSelectionDropdown);
