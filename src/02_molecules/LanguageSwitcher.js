import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { Button, Dropdown } from "semantic-ui-react";
import "./LanguageSwitcher.css";

const ChangeLanguage = props => {
  return (
    <Dropdown
      item
      text={i18next.t("languageswitcher-label")}
      style={props.style}
    >
      <Dropdown.Menu>
        <Dropdown.Item>
          <Button
            size="mini"
            onClick={() => props.i18n.changeLanguage("de")}
            style={{ backgroundColor: "rgba(0,0,0,0)", color: "black" }}
            className="languageSwitcher-button"
          >
            de
          </Button>
        </Dropdown.Item>
        <Dropdown.Item>
          <Button
            size="mini"
            onClick={() => props.i18n.changeLanguage("en")}
            style={{ backgroundColor: "rgba(0,0,0,0)", color: "black" }}
            className="languageSwitcher-button"
          >
            en
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// extended main view with translate hoc
export default withTranslation()(ChangeLanguage);
