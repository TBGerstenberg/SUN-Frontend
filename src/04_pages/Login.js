import i18next from "i18next";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { LabelInputField } from "react-semantic-redux-form";
import { toast } from "react-semantic-toasts";
import Link from "redux-first-router-link";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
import ErrorMessage from "../01_atoms/ErrorMessage";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";
import { navigationActions, userActions } from "../redux/_actions";
import { navigationConstants } from "../redux/_constants";
import "./Login.css";

/**
 * A Screen that allows a user to log in to the system.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this._handleLoginSubmit = this._handleLoginSubmit.bind(this);
    this.toggleErrorMessage = this.toggleErrorMessage.bind(this);
  }

  render() {
    let hasError = false;
    const errorMessageHeader = "Fehler";
    let errorMessageBody = "";

    if (this.props.loginErrorStatus) {
      hasError = true;
      errorMessageBody = i18next.t(
        `login-error-${this.props.loginErrorStatus}-explanation`
      );
    }

    if (this.props.loggedIn) {
      // Redirect to Home
      this.props.dispatch(
        navigationActions.redirect(navigationConstants.NAVIGATE_TO_HOME)
      );
    }

    return (
      <div className="login-form">
        <Container>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Row>
              <Grid.Column
                style={{ maxWidth: 400, marginTop: "20px", float: "right" }}
              >
                <LanguageSwitcher style={{ float: "right" }} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ maxWidth: 400 }}>
                <Segment stacked>
                  <Header as="h2" color="blue" textAlign="center">
                    <Trans i18nKey="log-in-to-your-account-headline" />
                  </Header>

                  <Form
                    onSubmit={this.props.handleSubmit(
                      this._handleLoginSubmit.bind(this)
                    )}
                  >
                    <Field
                      name="email"
                      component={LabelInputField}
                      label={{
                        content: <Icon color="blue" name="user" size="small" />
                      }}
                      labelPosition="left"
                      placeholder={i18next.t("login-email-input-placeholder")}
                    />

                    <Field
                      name="password"
                      component={LabelInputField}
                      type="password"
                      label={{
                        content: <Icon color="blue" name="lock" size="small" />
                      }}
                      labelPosition="left"
                      placeholder={i18next.t(
                        "login-password-input-placeholder"
                      )}
                    />

                    <Form.Field control={Button} primary type="submit">
                      {i18next.t("log-in-to-your-account-button")}
                    </Form.Field>
                  </Form>
                </Segment>
                <Trans i18nKey="login-message-new-to-us" />
                <Link to="/signup">
                  <Trans i18nKey="login-message-call-to-action" />
                </Link>

                {hasError &&
                  this.renderErrorMessage(errorMessageHeader, errorMessageBody)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }

  /**
   * Calls a redux-action creator to start a login attempt.
   */
  _handleLoginSubmit(values) {
    const submittedEmail = values.email;
    const submittedPassword = values.password;

    this.props.dispatch(
      userActions.login({ email: submittedEmail, password: submittedPassword })
    );
  }

  renderErrorMessage(header, body) {
    return <ErrorMessage header={header} body={body} />;
  }

  toggleErrorMessage(title, message) {
    setTimeout(() => {
      toast(
        {
          title: title,
          description: <p>{message}</p>,
          type: "error",
          size: "mini",
          animation: "fly left"
        },
        () => console.log("toast closed"),
        () => console.log("toast clicked")
      );
    }, 1000);
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn,
    loginErrorStatus:
      state.login.error && state.login.error.error.response
        ? state.login.error.error.response.status
        : null
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "loginForm" // a unique identifier for this form
    })(Login)
  )
);
