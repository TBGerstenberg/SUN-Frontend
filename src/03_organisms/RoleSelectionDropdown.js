import React from "react";
import i18next from "i18next";
import { withTranslation } from "react-i18next";
import { Form } from "semantic-ui-react";
import personChairRelationEnum from "../models/enumerations/personChairRelationEnum";

class RoleSelectionDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesAsDropdownOptions: this._roleEnumToDropdownOptions(),
      selectedRole: ""
    };
  }

  _roleEnumToDropdownOptions() {
    let rolesAsDropdownOptions = [];
    for (var property in personChairRelationEnum) {
      if (personChairRelationEnum.hasOwnProperty(property)) {
        rolesAsDropdownOptions.push({
          key: property,
          value: property,
          text: personChairRelationEnum[property]
        });
      }
    }
    return rolesAsDropdownOptions;
  }

  render(props) {
    return (
      <Form.Select
        label={i18next.t("complete-profile-role-label")}
        name="roles"
        onBlur={(e, { value }) => {}}
        onChange={(e, { value }) => {
          return this.props.onChange(value);
        }}
        options={this.state.rolesAsDropdownOptions}
        placeholder={i18next.t("complete-profile-role-label")}
        value={this.props.value}
      />
    );
  }
}

export default withTranslation()(RoleSelectionDropdown);
