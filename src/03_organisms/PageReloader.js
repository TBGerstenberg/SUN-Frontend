import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { userActions } from "../redux/_actions";

/**
 * Higher-Order Component responsible for triggering actions each time a page-reaload is triggered
 * like refreshing the users session or updating other global state.
 */
class PageReloader extends React.Component {
  componentWillMount() {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.props.dispatch(userActions.getSession());
      }
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => {
  return {};
};

export default withTranslation()(connect(mapStateToProps)(PageReloader));
