import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";
import { withTranslation, Trans } from "react-i18next";
import i18next from "i18next";
import logo from "../05_images/Logo.PNG";

class NavBar extends Component {
  render() {
    return (
      <div class="ui teal large inverted segment" >
        <div class="ui large inverted secondary menu">
        <div class="ui mini image">
        <img src={logo} style={{ height: "100%"}}></img>
        </div>
          <a href="Home" class="item" >
            Home
          </a>
          <a href="Profile" class="item">
            Profile
          </a>
          <a href="#" class="item">
            Groups
          </a>
          <div class="right menu">
            <div class="item">
              <div class="ui icon input">
                <input
                  type="text"
                  placeholder={i18next.t("navbar-search-placeholder")}
                />
                <i class="search link icon" />
              </div>
            </div>

            <LanguageSwitcher />
            <a href="#" class="ui item">
              <i class="sign-out icon" />
              <Trans i18nKey="navbar-logout-button-text" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(NavBar);
