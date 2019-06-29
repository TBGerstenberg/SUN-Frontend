import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "semantic-ui-react";
import "./LanguageSwitcher.css";

const ChangeLanguage = props => {
  return (
    <div className={"languageSwitcher"}>
      <Button
        size="mini"
        onClick={() => props.i18n.changeLanguage("de")}
        inverted
        color="blue"
        className="languageSwitcher-button"
      >
        de
      </Button>
      <Button
        size="mini"
        onClick={() => props.i18n.changeLanguage("en")}
        inverted
        color="blue"
        className="languageSwitcher-button"
      >
        en
      </Button>
    </div>
  );
};

// extended main view with translate hoc
export default withTranslation()(ChangeLanguage);
