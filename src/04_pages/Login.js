import React from "react";

// Redux bindings & HOCs
import { connect } from "react-redux";
import { userActions } from "../redux/_actions";

// Redux-Form and Bindings Semantic-UI forms
import { Field, reduxForm } from "redux-form";
import { LabelInputField } from "react-semantic-redux-form";

// Internationalization
import i18next from "i18next";
import { Trans, withTranslation } from "react-i18next";

// Components from semantic ui and our own library
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Icon
} from "semantic-ui-react";
import Link from "redux-first-router-link";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";

// Styles
import "./Login.css";

//Actions
import { navigationConstants } from "../redux/_constants";
import { navigationActions } from "../redux/_actions";

/**
 * A Screen that allows a user to log in to the system.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this._handleLoginSubmit = this._handleLoginSubmit.bind(this);
  }

  render() {
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
            <Grid.Column style={{ maxWidth: 400 }}>
              <LanguageSwitcher />
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
                    placeholder={i18next.t("login-password-input-placeholder")}
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
            </Grid.Column>
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
}

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn,
    loginErorr: state.login.error
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "loginForm" // a unique identifier for this form
    })(Login)
  )
);
