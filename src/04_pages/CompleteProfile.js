import React from "react";
import {
  Container,
  Grid,
  Segment,
  Header,
  Button,
  Form
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
import i18next from "i18next";
import { userActions, skillCatalogueActions } from "../config/redux/_actions";
import ChairSelectionDropdown from "../03_organisms/ChairSelectionDropdown";
import SkillCatalogue from "../03_organisms/SkillCatalogue";

class CompleteProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSkillInputValue: "", currentlySelectedSkill: null };
    this._handleCompleteProfileSubmit = this._handleCompleteProfileSubmit.bind(
      this
    );
    this._handleSkillInputChange = this._handleSkillInputChange.bind(this);
    this._handleSkillSubmission = this._handleSkillSubmission.bind(this);
    this._handleSkillItemClick = this._handleSkillItemClick.bind(this);
    this._handleSkillDeletion = this._handleSkillDeletion.bind(this);
    this._handleSkillRating = this._handleSkillRating.bind(this);
  }

  render() {
    const props = this.props;
    return (
      <Container>
        <Segment stacked>
          <Form
            onSubmit={props.handleSubmit(this._handleCompleteProfileSubmit)}
          >
            <Grid
              container
              textAlign="center"
              verticalAlign="middle"
              colums={2}
              stackable
            >
              <Grid.Row>
                <Header as="h3" color="blue" textAlign="center">
                  <Trans i18nKey="complete-your-profile-headline" />
                </Header>
              </Grid.Row>

              <Grid.Row textAlign="left">
                <Grid.Column width={6} textAlign="left">
                  <Header as="h4" color="black" textAlign="left">
                    <Trans i18nKey="complete-profile-personal-information-headline" />
                  </Header>
                </Grid.Column>
                <Grid.Column width={6} />
              </Grid.Row>

              {
                // Title and Gender Dropdowns
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6} textAlign="left">
                  <Field
                    name="title"
                    label={i18next.t("complete-profile-title-label")}
                    component={this.renderSelect}
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
                    component={this.renderSelect}
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
                // Role(s)
              }
              <Grid.Row columns={2}>
                <Grid.Column textAlign="left" width={6}>
                  <Header as="h5" color="black" textAlign="left">
                    <Trans i18nKey="complete-profile-role-headline" />
                  </Header>
                  <Field
                    component={CheckboxField}
                    label={i18next.t(
                      "complete-profile-studentStatus-checkbox-label"
                    )}
                    name="isStudent"
                  />
                  {props.formState &&
                    props.formState.values &&
                    props.formState.values.isStudent &&
                    this.renderStudentIdInput()}
                </Grid.Column>
                <Grid.Column width={6} />
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="left" width={6}>
                  <Field
                    component={CheckboxField}
                    label={i18next.t(
                      "complete-profile-employeeStatus-checkbox-label"
                    )}
                    name="isEmployee"
                  />
                  {props.formState &&
                    props.formState.values &&
                    props.formState.values.isEmployee &&
                    this.renderChairSelectionDropdown()}
                </Grid.Column>
                <Grid.Column width={6} />
              </Grid.Row>

              {
                // Skill-Catalogue
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <Header as="h4" color="black" textAlign="left">
                    <Trans i18nKey="complete-profile-skills-headline" />
                  </Header>

                  <Grid textAlign="left" verticalAlign="middle">
                    <Grid.Row>
                      <Grid.Column floated="left" width={16}>
                        <SkillCatalogue
                          items={this.props.skillCatalogue.skills}
                          onItemClicked={this._handleSkillItemClick}
                          onItemDelete={this._handleSkillDeletion}
                          onItemRate={this._handleSkillRating}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={10} floated="left">
                        <Form.Field>
                          <input
                            onChange={this._handleSkillInputChange}
                            value={this.state.currentSkillInputValue}
                            placeholder={i18next.t(
                              "complete-profile-skill-input-placeholder"
                            )}
                          />
                        </Form.Field>
                      </Grid.Column>

                      <Grid.Column width={4} floated="left">
                        <Button
                          type="button"
                          onClick={this._handleSkillSubmission}
                        >
                          {i18next.t("complete-your-profile-add-skill-button")}
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
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
  }

  /**
   * Event handler that is fired every time the user puts a new value in the skill-input field
   * Saves the value thats typed into the skill input to component state
   * @param {} event
   */
  _handleSkillInputChange(event) {
    this.setState({ currentSkillInputValue: event.target.value });
  }

  /**
   * Dispatches a redux action that adds a new skill to the skillCatalogue.
   */
  _handleSkillSubmission() {
    this.props.dispatch(
      skillCatalogueActions.addSkill(this.state.currentSkillInputValue)
    );
    this.setState({ currentSkillInputValue: "" });
  }

  /**
   * Handles a click on an individual iteam in the Skillcatalogue
   * @param {*} event
   * @param {*} skill
   */
  _handleSkillItemClick(skill) {
    this.props.dispatch(skillCatalogueActions.selectSkill(skill));
  }

  /**
   * Handles a rating given to describe proficency levels about a skill
   */
  _handleSkillRating(itemProps, proposedRating, skill) {
    this.props.dispatch(
      skillCatalogueActions.rateSkill(skill, proposedRating.rating)
    );
  }

  /**
   * Handles a click on an individual skill-items delete-button.
   * @param {} skill
   */
  _handleSkillDeletion(skill) {
    this.props.dispatch(skillCatalogueActions.removeSkill(skill));
  }

  /**
   * Event Handler for submission of the Form, triggers an "Update-Profile"-Action with the values from
   * the form.
   * @param {} values
   */
  _handleCompleteProfileSubmit(values) {
    this.props.dispatch(
      userActions.updateProfile(
        values.firstName,
        values.lastName,
        values.title,
        values.gender,
        null,
        null,
        values.isStudent,
        values.isEmployee
      )
    );
  }

  renderStudentIdInput(field) {
    return (
      <Field
        name="studentId"
        component={LabelInputField}
        label={{
          content: i18next.t("complete-profile-studentId-label")
        }}
        labelPosition="left"
        placeholder={i18next.t("complete-profile-studentId-placeholder")}
      />
    );
  }

  renderSelect(field) {
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
  }

  renderChairSelectionDropdown() {
    return (
      <ChairSelectionDropdown />

      /*
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
      /> */
    );
  }
}

const mapStateToProps = state => ({
  formState: state.form.completeProfileForm,
  skillCatalogue: state.skillCatalogue
});

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "completeProfileForm" // a unique identifier for this form
    })(CompleteProfile)
  )
);
