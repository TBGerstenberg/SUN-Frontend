import React, { Component } from "react";
import { Button, Grid } from "semantic-ui-react";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";
import { withTranslation, Trans } from "react-i18next";
import i18next from "i18next";

// Redux bindings & HOCs
import { connect } from "react-redux";
import { userActions } from "../redux/_actions";
import { navigationConstants } from "../redux/_constants";
import { navigationActions } from "../redux/_actions";
import Link from "redux-first-router-link";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.dispatchLogout = this.dispatchLogout.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  dispatchLogout() {
    this.props.dispatch(userActions.logout());
  }

  redirectToLogin() {
    this.props.dispatch(
      navigationActions.redirect(navigationConstants.NAVIGATE_TO_LOGIN)
    );
  }

  render() {
    if (!this.props.loggedIn) {
      this.redirectToLogin();
    }
    return (
      <div className="ui blue large inverted segment">
        <div className="ui large inverted secondary menu">
          <div className="ui mini image">
            {/*  <img src={logo} style={{ height: "100%" }} /> */}
          </div>

          <Link
            className="item"
            to={{
              type: navigationConstants.NAVIGATE_TO_HOME
            }}
          >
            Home
          </Link>

          <Link
            className="item"
            to={{
              type: navigationConstants.NAVIGATE_TO_PROFILE,
              payload: { userId: this.props.user ? this.props.user.id : null }
            }}
          >
            Profile
          </Link>

          {this.props.user && this.props.user.admin && (
            <Link
              className="item"
              to={{
                type: navigationConstants.NAVIGATE_TO_ADMIN_PANEL
              }}
            >
              Adminpanel
            </Link>
          )}

          <div className="right menu">
            <div className="item">
              <div>
                <Trans i18nKey="navbar-logged-in-as-text" />
                {this.props.user.email}
              </div>
            </div>

            <div className="item">
              <LanguageSwitcher />

              <a href="#" className="ui item" onClick={this.dispatchLogout}>
                <i className="sign-out icon" />
                <Trans i18nKey="navbar-logout-button-text" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn,
    user: state.login.user
  };
};

export default withTranslation()(connect(mapStateToProps)(NavBar));
