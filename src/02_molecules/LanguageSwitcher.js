import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "semantic-ui-react";
import "./LanguageSwitcher.css";

const ChangeLanguage = props => {
  return (
    <div className={"languageSwitcher " + props.className}>
      <Button
        size="mini"
        onClick={() => props.i18n.changeLanguage("de")}
        basic
        color="teal"
      >
        de
      </Button>
      <Button
        size="mini"
        onClick={() => props.i18n.changeLanguage("en")}
        basic
        color="teal"
      >
        en
      </Button>
    </div>
  );
};

// extended main view with translate hoc
export default withTranslation()(ChangeLanguage);
