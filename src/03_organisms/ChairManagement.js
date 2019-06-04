import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Container
} from "semantic-ui-react";
import i18next from "i18next";

class ChairManagement extends React.Component {
  state = { visible: false };

  render() {
    return (
      <div className="adminpanel-fragment-wrapper">
        <p>Lehrstuhlverwaltung</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default withTranslation()(connect(mapStateToProps)(ChairManagement));
