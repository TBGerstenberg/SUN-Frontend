import React from "react";
import { connect } from "react-redux";
import * as components from "./04_pages";

const App = ({ page }) => {
  const Component = components[page];
  return <Component />;
};

const mapStateToProps = ({ page }) => ({ page });
export default connect(mapStateToProps)(App);
