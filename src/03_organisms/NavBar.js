import React, { Component } from "react";
import { Button, Grid, Search, Menu } from "semantic-ui-react";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";
import { withTranslation, Trans } from "react-i18next";
import i18next from "i18next";

// Redux bindings & HOCs
import { connect } from "react-redux";
import { userActions } from "../redux/_actions";
import { navigationConstants } from "../redux/_constants";
import { navigationActions } from "../redux/_actions";
import Link from "redux-first-router-link";

// Styles
import "./Navbar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.dispatchLogout = this.dispatchLogout.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.handleNavitemClick = this.handleNavitemClick.bind(this);

    this.state = {
      searchBarLoading: false
    };
  }

  dispatchLogout() {
    this.props.dispatch(userActions.logout());
  }

  redirectToLogin() {
    this.props.dispatch(
      navigationActions.redirect(navigationConstants.NAVIGATE_TO_LOGIN)
    );
  }

  handleNavitemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    if (!this.props.loggedIn) {
      this.redirectToLogin();
    }
    return (
      <Menu
        color="blue"
        size="huge"
        stackable
        className="SUN_navbar"
        inverted
        secondary
      >
        <Menu.Item
          name="home"
          active={this.state.activeItem === "home"}
          onClick={this.handleNavitemClick}
        >
          <Link
            to={{
              type: navigationConstants.NAVIGATE_TO_HOME
            }}
          >
            Home
          </Link>
        </Menu.Item>

        <Menu.Item
          name="profile"
          active={this.state.activeItem === "profile"}
          onClick={this.handleNavitemClick}
        >
          <Link
            to={{
              type: navigationConstants.NAVIGATE_TO_PROFILE,
              payload: {
                userId: this.props.user ? this.props.user.id : null
              }
            }}
          >
            Profile
          </Link>
        </Menu.Item>

        {this.props.user && this.props.user.admin && (
          <Menu.Item
            name="admin"
            active={this.state.activeItem === "admin"}
            onClick={this.handleNavitemClick}
          >
            <Link
              to={{
                type: navigationConstants.NAVIGATE_TO_ADMIN_PANEL
              }}
              activeStyle={{ textDecoration: "underline" }}
            >
              Adminpanel
            </Link>
          </Menu.Item>
        )}

        <Menu.Menu position="right">
          <Search loading={this.state.searchBarLoading} />
        </Menu.Menu>

        <Menu.Menu position="right">
          <LanguageSwitcher />
          <Menu.Item>
            <Trans i18nKey="navbar-logged-in-as-text" />
            {this.props.user ? this.props.user.email : ""}
            <a href="#" className="ui item" onClick={this.dispatchLogout}>
              <i className="sign-out icon" />
              <Trans i18nKey="navbar-logout-button-text" />
            </a>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
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
