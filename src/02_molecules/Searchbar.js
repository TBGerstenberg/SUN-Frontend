import React from "react";
import { withTranslation } from "react-i18next";
import { Field } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";
import i18next from "i18next";
import formValidationUtilities from "../utilities/formValidationUtilities";
import { Icon } from "semantic-ui-react";

const Searchbar = props => {
  return (
    <div className="ui icon input">
      <input type="text" placeholder={i18next.t("navbar-search-placeholder")} />
      <i className="search link icon" />
    </div>
  );
};

// extended main view with translate hoc
export default withTranslation()(Searchbar);
