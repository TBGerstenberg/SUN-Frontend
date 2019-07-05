import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

class UserManagement extends React.Component {
  state = { visible: false };

  render() {
    return (
      <div className="adminpanel-fragment-wrapper">
        <p>Gruppenverwaltung</p>
      </div>
    );
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = state => ({
  ...state
});

export default withTranslation()(connect(mapStateToProps)(UserManagement));
