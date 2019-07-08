import i18next from "i18next";
import { debounce } from "lodash";
import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Link from "redux-first-router-link";
import { Button, Image, Label, Menu, Search } from "semantic-ui-react";
import ChairSearchResult from "../02_molecules/ChairSearchResult";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";
import PersonSearchResult from "../02_molecules/PersonSearchResult";
import PostSearchResult from "../02_molecules/PostSearchResult";
import logoImageSource from "../assets/images/Logo.png";
import {
  navigationActions,
  searchActions,
  userActions
} from "../redux/_actions";
import { navigationConstants } from "../redux/_constants";
import "./Navbar.css";

// Renders the categories that can be searched (persons, chairs, posts)
const categoryRenderer = ({ name }) => (
  <Label as="span" color="blue" content={name} />
);

// Renders individual search results
const resultRenderer = objectToBeRendered => {
  const resultObject = JSON.parse(objectToBeRendered.description);

  // Object is a person
  if (
    resultObject.hasOwnProperty("firstName") &&
    resultObject.hasOwnProperty("lastName")
  ) {
    return (
      <PersonSearchResult person={resultObject} key={resultObject.title} />
    );

    // Object is a chair
  } else if (resultObject.hasOwnProperty("name")) {
    return <ChairSearchResult chair={resultObject} key={resultObject.title} />;

    // Object is a post
  } else if (resultObject.hasOwnProperty("authorId")) {
    return <PostSearchResult post={resultObject} key={resultObject.title} />;
  } else {
    return null;
  }
};

const initialState = {
  searchResults: {}
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.dispatchLogout = this.dispatchLogout.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.handleNavitemClick = this.handleNavitemClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchResultSelect = this.handleSearchResultSelect.bind(this);
    this.state = initialState;
  }

  /** Handles an input change in the searchbar, triggers a search request at the search API  */
  handleSearchChange = (e, { value }) => {
    this.props.dispatch(searchActions.search(value));
  };

  /** Handles a click or keyboard seleciton on a search-result */
  handleSearchResultSelect = (e, { result }) => {
    const resultObject = JSON.parse(result.description);

    // Object is a person, redirect to profile page
    if (
      resultObject.hasOwnProperty("firstName") &&
      resultObject.hasOwnProperty("lastName")
    ) {
      this.props.dispatch(
        navigationActions.redirect(navigationConstants.NAVIGATE_TO_PROFILE, {
          userId: resultObject.id
        })
      );

      // Object is a chair ,redirect to chair page
    } else if (resultObject.hasOwnProperty("name")) {
      this.props.dispatch(
        navigationActions.redirect(navigationConstants.NAVIGATE_TO_CHAIR_PAGE, {
          chairId: resultObject.id
        })
      );
      // Object is a post, redirect to chair page where the post was published
    } else {
      this.props.dispatch(
        navigationActions.redirect(navigationConstants.NAVIGATE_TO_CHAIR_PAGE, {
          chairId: resultObject.pageId
        })
      );
    }
  };

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
      <>
        <Menu
          color="blue"
          size="huge"
          stackable
          className="SUN_navbar"
          inverted
          secondary
        >
          <Menu.Item>
            <Link
              to={{
                type: navigationConstants.NAVIGATE_TO_HOME
              }}
            >
              <Image width={80} height={80} src={logoImageSource} />
            </Link>
          </Menu.Item>
          <Menu.Item
            as="p"
            name="home"
            active={this.state.activeItem === "home"}
            onClick={this.handleNavitemClick}
          >
            <Link
              to={{
                type: navigationConstants.NAVIGATE_TO_HOME
              }}
            >
              {i18next.t("navbar-home-link-label")}
            </Link>
          </Menu.Item>

          <Menu.Item
            as="p"
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
              {i18next.t("navbar-profile-link-label")}
            </Link>
          </Menu.Item>

          {this.props.user && this.props.user.admin && (
            <Menu.Item
              as="p"
              name="admin"
              active={this.state.activeItem === "admin"}
              onClick={this.handleNavitemClick}
            >
              <Link
                to={{
                  type: navigationConstants.NAVIGATE_TO_ADMIN_PANEL
                }}
              >
                {i18next.t("navbar-adminpanel-link-label")}
              </Link>
            </Menu.Item>
          )}

          <Menu.Menu position="right">
            <Search
              loading={this.props.fetchingSearchResults}
              onSearchChange={debounce(this.handleSearchChange, 500, {
                leading: true
              })}
              onResultSelect={this.handleSearchResultSelect}
              results={this.props.searchResults}
              resultRenderer={resultRenderer}
              category={true}
              categoryRenderer={categoryRenderer}
              onFocus={() => {
                this.setState({ searchBarFocused: true });
              }}
              onBlur={() => {
                this.setState({ searchBarFocused: false });
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  this.props.dispatch(
                    navigationActions.redirect(
                      navigationConstants.NAVIGATE_TO_SEARCH_PAGE
                    )
                  );
                }
              }}
            />
          </Menu.Menu>

          <Menu.Menu position="right">
            <LanguageSwitcher />
            <Menu.Item style={{ display: "flex", flexDirection: "column" }}>
              {/*   <Trans i18nKey="navbar-logged-in-as-text" /> */}
              {this.props.user ? this.props.user.email : ""}

              <Button
                href="#"
                className="ui item"
                onClick={this.dispatchLogout}
                style={{ paddingTop: "10px", marginTop: "5px" }}
              >
                <i className="sign-out icon" />
                <Trans i18nKey="navbar-logout-button-text" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </>
    );
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = state => {
  // NOTE: we are stringifying all our search-result objects  into a "description Prop"
  // here, since semantic-UIs Search bar has a very opinionated approach
  // on what it accepts as a props when rendering search results.
  // props like id or title, which are present on almost every entry
  // collide with the reserved props of semanticui-searchbar-searchresult.
  // For more infos on the issue, see : https://github.com/Semantic-Org/Semantic-UI-React/issues/1141
  let personSearchResults = state.search.searchResults
    ? state.search.searchResults.persons
    : [];

  personSearchResults = personSearchResults.map(person => {
    return {
      title: person.firstName + " " + person.lastName,
      description: JSON.stringify(person),
      key: "person" + person.id
    };
  });

  let chairSearchResults = state.search.searchResults
    ? state.search.searchResults.chairs
    : [];

  chairSearchResults = chairSearchResults.map(chair => {
    return {
      title: chair.name,
      description: JSON.stringify(chair),
      key: "chair" + chair.id
    };
  });

  let postSearchResults = state.search.searchResults
    ? state.search.searchResults.posts
    : [];

  postSearchResults = postSearchResults.map(post => {
    return {
      title: post.title,
      description: JSON.stringify(post),
      key: "Post" + post.createdAt
    };
  });

  const searchResults = {
    users: {
      name: i18next.t("searchbar-category-users-label"),
      results: personSearchResults
    },
    chairs: {
      name: i18next.t("searchbar-category-chairs-label"),
      results: chairSearchResults
    },
    posts: {
      name: i18next.t("searchbar-category-posts-label"),
      results: postSearchResults
    }
  };

  return {
    loggedIn: state.login.loggedIn,
    user: state.login.user,
    searchResults: searchResults,
    fetchingSearchResults: state.search.fetchingSearchResults
  };
};

export default withTranslation()(connect(mapStateToProps)(NavBar));
