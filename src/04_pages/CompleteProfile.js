import React from "react";
import {
  Container,
  Grid,
  Segment,
  Header,
  Button,
  Form,
  GridColumn
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
import i18next from "i18next";
import { userActions } from "../config/redux/_actions";
import ChairSelectionDropdown from "../03_organisms/ChairSelectionDropdown";

const renderSelect = field => {
  return (
    <Form.Select
      label={field.label}
      name={field.input.name}
      onBlur={(e, { value }) => {
        field.input.onChange(value);
      }}
      onChange={(e, { value }) => field.input.onChange(value)}
      options={field.options}
      placeholder={field.placeholder}
      value={field.input.value}
    />
  );
};

const renderChairSelectionDropdown = () => {
  return (
    /* <ChairSelectionDropdown /> */

    <Field
      name="chairs"
      label={i18next.t("complete-profile-chair-label")}
      component={renderSelect}
      options={[
        {
          key: 0,
          value: "TODO",
          text: "TODO"
          // TODO: Fetch chairs from backend and populate the dropdown with these values
        }
      ]}
    />
  );
};

const CompleteProfile = props => {
  console.log("Component Props:");
  console.log(props);

  return (
    <Container>
      <Segment stacked>
        <Header as="h3" color="blue" textAlign="center">
          <Trans i18nKey="complete-your-profile-headline" />
        </Header>

        <Form
          onSubmit={props.handleSubmit(_handleCompleteProfileSubmit.bind(this))}
        >
          <Grid
            textAlign="center"
            verticalAlign="middle"
            colums={2}
            divided
            stackable
          >
            {
              // Title and Gender Dropdowns
            }
            <Grid.Row columns={2}>
              <Grid.Column width={6} textAlign="left">
                <Field
                  name="title"
                  label={i18next.t("complete-profile-title-label")}
                  component={renderSelect}
                  options={[
                    {
                      key: 0,
                      text: i18next.t(
                        "complete-profile-title-dropdown-option-bachelor"
                      ),
                      value: "bachelor"
                    },
                    {
                      key: 1,
                      text: i18next.t(
                        "complete-profile-title-dropdown-option-master"
                      ),
                      value: "master"
                    },
                    {
                      key: 2,
                      text: i18next.t(
                        "complete-profile-title-dropdown-option-dr"
                      ),
                      value: "Dr."
                    },
                    {
                      key: 3,
                      text: i18next.t(
                        "complete-profile-title-dropdown-option-prof-dr"
                      ),
                      value: "Prof. Dr."
                    }
                  ]}
                />
              </Grid.Column>
              <Grid.Column width={6} textAlign="left">
                <Field
                  name="gender"
                  label={i18next.t("complete-profile-gender-label")}
                  component={renderSelect}
                  options={[
                    {
                      key: 1,
                      text: i18next.t(
                        "complete-profile-gender-dropdown-option-male"
                      ),
                      value: "male"
                    },
                    {
                      key: 2,
                      text: i18next.t(
                        "complete-profile-gender-dropdown-option-female"
                      ),
                      value: "female"
                    },
                    {
                      key: 3,
                      text: i18next.t(
                        "complete-profile-gender-dropdown-option-other"
                      ),
                      value: "other"
                    }
                  ]}
                />
              </Grid.Column>
            </Grid.Row>
            {
              // FirstName and Lastname inputs
            }
            <Grid.Row columns={2}>
              <Grid.Column width={6}>
                <Field
                  name="firstName"
                  component={LabelInputField}
                  label={{
                    content: i18next.t("complete-profile-firstName-label")
                  }}
                  labelPosition="left"
                  placeholder={i18next.t(
                    "complete-profile-firstName-placeholder"
                  )}
                />
              </Grid.Column>

              <Grid.Column width={6}>
                <Field
                  name="lastName"
                  component={LabelInputField}
                  label={{
                    content: i18next.t("complete-profile-lastName-label")
                  }}
                  labelPosition="left"
                  placeholder={i18next.t(
                    "complete-profile-lastName-placeholder"
                  )}
                />
              </Grid.Column>
            </Grid.Row>

            {
              // Date of Birth and Adress
            }
            <Grid.Row columns={2}>
              <Grid.Column width={6} />

              <Grid.Column width={6} />
            </Grid.Row>

            {
              // Role(s)
            }
            <Grid.Row columns={2}>
              <Grid.Column width={6} textAlign="left">
                <Form.Group inline>
                  <Field
                    component={CheckboxField}
                    label={i18next.t(
                      "complete-profile-studentStatus-checkbox-label"
                    )}
                    name="studentStatusCheckbox"
                  />
                  <Field
                    component={CheckboxField}
                    label={i18next.t(
                      "complete-profile-employeeStatus-checkbox-label"
                    )}
                    name="employeeStatusCheckbox"
                  />
                </Form.Group>
              </Grid.Column>

              <Grid.Column width={6} />
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column width={6}>
                {props.isEmployee && renderChairSelectionDropdown()}
              </Grid.Column>
              <Grid.Column width={6} />
            </Grid.Row>

            {
              // Submit and Abort Buttons
            }
            <Grid.Row columns={2}>
              <Grid.Column width={3}>
                <Form.Field control={Button} secondary>
                  {i18next.t("complete-your-profile-abort-button")}
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field control={Button} primary type="submit">
                  {i18next.t("complete-your-profile-continue-button")}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </Container>
  );
};

/**
 * Calls a redux-action that updates a profile with the given values
 */
const _handleCompleteProfileSubmit = values => {
  this.props.dispatch(userActions.updateProfile({}));
};

const mapStateToProps = state => {
  if (state.form.completeProfileForm && state.form.completeProfileForm.values) {
    return {
      ...state,
      isEmployee: state.form.completeProfileForm.values.employeeStatusCheckbox
    };
  } else {
    return { state };
  }
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "completeProfileForm" // a unique identifier for this form
    })(CompleteProfile)
  )
);
