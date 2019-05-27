import React from "react";
import {
  Container,
  Grid,
  Segment,
  Header,
  Button,
  Form,
  Divider
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
import i18next from "i18next";
import { DateInput } from "semantic-ui-calendar-react";
import { userActions, skillCatalogueActions } from "../redux/_actions";
import ChairSelectionDropdown from "../03_organisms/ChairSelectionDropdown";
import SkillCatalogue from "../03_organisms/SkillCatalogue";
import formValidationUtilities from "../utilities/formValidationUtilities";

import StudentIdInput from "../02_molecules/StudentIdInput";
import CourseOfStudyInput from "../02_molecules/CourseOfStudyInput";
import CityNameInput from "../02_molecules/CityNameInput";
import StreetNameInput from "../02_molecules/StreetNameInput";
import PostalCodeInput from "../02_molecules/PostalCodeInput";
import HouseNumberInput from "../02_molecules/HouseNumberInput";
import FirstNameInput from "../02_molecules/FirstNameInput";
import LastNameInput from "../02_molecules/LastNameInput";
import TitleDropdownSelector from "../02_molecules/TitleDropdownSelector";
import GenderDropdownSelector from "../02_molecules/GenderDropdownSelector";

class CompleteProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSkillInputValue: "",
      currentlySelectedSkill: null,
      dateOfBirth: "",
      immatriculationDate: "",
      exmatriculationDate: ""
    };

    this._handleSkillInputChange = this._handleSkillInputChange.bind(this);
    this._handleSkillSubmission = this._handleSkillSubmission.bind(this);
    this._handleSkillItemClick = this._handleSkillItemClick.bind(this);
    this._handleSkillDeletion = this._handleSkillDeletion.bind(this);
    this._handleSkillRating = this._handleSkillRating.bind(this);
    this._handleDateOfBirthChange = this._handleDateOfBirthChange.bind(this);
    this._handleImmatriculationDateChange = this._handleImmatriculationDateChange.bind(
      this
    );
    this._handleCompleteProfileSubmit = this._handleCompleteProfileSubmit.bind(
      this
    );
    this._handleExmatriculationDateChange = this._handleExmatriculationDateChange.bind(
      this
    );
  }

  render() {
    const props = this.props;

    const isStudent =
      props.formState &&
      props.formState.values &&
      props.formState.values.isStudent;

    const isEmployee =
      props.formState &&
      props.formState.values &&
      props.formState.values.isEmployee;

    return (
      <Container>
        <Segment stacked>
          <Form
            onSubmit={props.handleSubmit(
              this._handleCompleteProfileSubmit.bind(this)
            )}
          >
            <Grid
              container
              textAlign="center"
              verticalAlign="middle"
              colums={2}
              stackable
            >
              {
                // Headline
              }
              <Grid.Row>
                <Header as="h3" color="blue" textAlign="center">
                  <Trans i18nKey="complete-your-profile-headline" />
                </Header>
              </Grid.Row>

              {
                // SubHeadline
              }
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
                  <TitleDropdownSelector />
                </Grid.Column>
                <Grid.Column width={6} textAlign="left">
                  <GenderDropdownSelector />
                </Grid.Column>
              </Grid.Row>

              {
                // FirstName and Lastname inputs
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <FirstNameInput />
                </Grid.Column>
                <Grid.Column width={6}>
                  <LastNameInput />
                </Grid.Column>
              </Grid.Row>

              {
                // Date of Birth
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  {this.renderBirthDateInput()}
                </Grid.Column>
                <Grid.Column width={6} />
              </Grid.Row>

              {
                // Address
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <CityNameInput />
                </Grid.Column>
                <Grid.Column width={6}>
                  <PostalCodeInput />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <StreetNameInput />
                </Grid.Column>
                <Grid.Column width={6}>
                  <HouseNumberInput />
                </Grid.Column>
              </Grid.Row>

              {
                // Skill-Catalogue
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <Header as="h5" color="black" textAlign="left">
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
              <Divider />
              {
                // StudentRole Checkbox(s)
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
                    validate={[]}
                  />
                </Grid.Column>
                <Grid.Column width={6} />
              </Grid.Row>

              {
                // StudentRole Inputs
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  {isStudent && <StudentIdInput />}
                </Grid.Column>
                <Grid.Column width={6}>
                  {isStudent && <CourseOfStudyInput />}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="left" width={6}>
                  {isStudent && this.renderImmatriculationDateInput()}
                </Grid.Column>
                <Grid.Column textAlign="left" width={6}>
                  {isStudent && this.renderExmatericulationDateInput()}
                </Grid.Column>
              </Grid.Row>

              {
                // EmployeeStatus Checkbox
              }
              <Grid.Row columns={2}>
                <Grid.Column textAlign="left" width={6}>
                  <Field
                    component={CheckboxField}
                    label={i18next.t(
                      "complete-profile-employeeStatus-checkbox-label"
                    )}
                    name="isEmployee"
                  />
                </Grid.Column>
                <Grid.Column width={6} />
              </Grid.Row>

              {
                // EmployeeStatus
              }
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  {isEmployee && this.renderRoomNameInput()}
                  {isEmployee && this.renderAdditionalEmailInput()}
                  {isEmployee && <ChairSelectionDropdown />}
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
   * Handles a change in the dateOfBirth-Datepicker input
   */
  _handleDateOfBirthChange(event, { name, value }) {
    this.setState({ dateOfBirth: value });
  }

  /**
   * Handles a change in the immatriculationDate-Picker input
   */
  _handleImmatriculationDateChange(event, { name, value }) {
    this.setState({ immatriculationDate: value });
  }

  /**
   * Handles a change in the immatriculationDate-Picker input
   */
  _handleExmatriculationDateChange(event, { name, value }) {
    this.setState({ exmatriculationDate: value });
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
    console.log("Triggered Submit");

    const skillCatalogue = this.props.skillCatalogue;
    let skillsRatings = [];

    if (skillCatalogue) {
      skillCatalogue.skills.forEach((element, index) => {
        skillsRatings.push({
          skill: element,
          rating: skillCatalogue.ratings[index]
        });
      });
    }

    // Values that are extracted from the various input fields, each field is either managed by redux form
    // or via the components state.
    const profileValues = {
      title: values.title,
      gender: values.gender,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: this.state.dateOfBirth,
      adress: {
        city: values.cityName,
        postCode: values.postalCode,
        street: values.streetName,
        roomName: values.roomName
      },
      studentStatus: {
        studentId: values.studentId,
        courseOfStudy: values.courseOfStudy,
        immatriculationDate: this.state.immatriculationDate,
        exmatriculationDate: this.state.exmatriculationDate
      },
      employeeStatus: null,
      skills: skillsRatings
    };
    console.log(profileValues);

    this.props.dispatch(userActions.updateProfile(profileValues));
  }

  /**
   * Render Methods to keep the component markup in rneder() cleaner
   *
   */

  renderBirthDateInput() {
    return (
      <DateInput
        name="dateOfBirth"
        placeholder={i18next.t("complete-profile-dateOfBirth-placeholder")}
        value={this.state.dateOfBirth}
        iconPosition="left"
        onChange={this._handleDateOfBirthChange}
      />
    );
  }

  renderImmatriculationDateInput() {
    return (
      <DateInput
        name="immatriculationDate"
        placeholder={i18next.t(
          "complete-profile-immatriculationDate-placeholder"
        )}
        value={this.state.immatriculationDate}
        iconPosition="left"
        onChange={this._handleImmatriculationDateChange}
        label={i18next.t("complete-profile-immatriculationDate-label")}
      />
    );
  }

  renderExmatericulationDateInput() {
    return (
      <DateInput
        name="exmatriculationDate"
        placeholder={i18next.t(
          "complete-profile-exmatriculationDate-placeholder"
        )}
        value={this.state.exmatriculationDate}
        iconPosition="left"
        onChange={this._handleExmatriculationDateChange}
        label={i18next.t("complete-profile-exmatriculationDate-label")}
      />
    );
  }

  renderRoomNameInput() {
    return (
      <Field
        name="roomName"
        component={LabelInputField}
        label={{
          content: i18next.t("complete-profile-roomName-label")
        }}
        labelPosition="left"
        placeholder={i18next.t("complete-profile-roomName-placeholder")}
      />
    );
  }

  renderAdditionalEmailInput() {
    return (
      <Field
        name="additional_email"
        component={LabelInputField}
        label={i18next.t("complete-profile-additional-email-label")}
        labelPosition="left"
        placeholder={i18next.t("complete-profile-additional-email-placeholder")}
        validate={[formValidationUtilities.email]}
      />
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
      form: "completeProfileForm",
      initialValues: {
        isStudent: true
      } // a unique identifier for this form
    })(CompleteProfile)
  )
);
