// App.js
import React from "react";
import { connect } from "react-redux";
import * as components from "./04_pages";

const App = ({ page }) => {
  const Component = components[page];
  return <Component />;
};

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = ({ page }) => ({ page });
export default connect(mapStateToProps)(App);
