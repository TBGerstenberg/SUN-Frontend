import React from "react";
import Link from "redux-first-router-link";

// Redux bindings & HOCs
import { connect } from "react-redux";

// Internationalization
import i18next from "i18next";
import { Trans, withTranslation } from "react-i18next";

// Components from semantic ui and our own library
import { Button } from "semantic-ui-react";
import NavBar from "../03_organisms/NavBar";

const Home = props => {
  return (
    <header className="App-header">
      <NavBar />
    </header>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default withTranslation()(connect(mapStateToProps)(Home));
