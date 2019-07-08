import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "semantic-ui-react";

class SubscribeButton extends React.Component {
  render() {
    const props = this.props;
    return (
      <>
        {props.subscribed && (
          <Button size="medium" onClick={this.props.onClick} color="teal">
            {i18next.t("subscribeButton-active-label")}
          </Button>
        )}

        {!props.subscribed && (
          <Button size="medium" onClick={this.props.onClick} color="blue">
            {i18next.t("subscribeButton-unsubscribed-label")}
          </Button>
        )}
      </>
    );
  }
}

// extended main view with translate hoc
export default withTranslation()(SubscribeButton);
