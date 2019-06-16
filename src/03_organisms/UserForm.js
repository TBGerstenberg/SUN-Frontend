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
import ChairSelectionDropdown from "./ChairSelectionDropdown";
import SkillCatalogue from "./SkillCatalogue";
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
import genderEnum from "../models/enumerations/genderEnum";
import personChairRelationEnum from "../models/enumerations/personChairRelationEnum";
import Person from "../models/person";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    const mode = props.user ? "edit" : "add";
    const user = props.user ? new Person(props.user) : null;

    let immatriculationDate = "";
    let exmatriculationDate = "";

    console.log(user);
    if (user && user.isStudent()) {
      immatriculationDate = user.studentStatus.matriculationDate || "";
      exmatriculationDate = user.studentStatus.exmatriculationDate || "";
    }

    this.state = {
      currentSkillInputValue: "",
      currentlySelectedSkill: null,
      dateOfBirth: props.user ? props.user.birthDate : "",
      immatriculationDate: immatriculationDate,
      exmatriculationDate: exmatriculationDate,
      mode: mode,
      user: props.user
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
    this._handleUpdateProfileSubmit = this._handleUpdateProfileSubmit.bind(
      this
    );
    this._handleExmatriculationDateChange = this._handleExmatriculationDateChange.bind(
      this
    );
  }

  render() {
    const props = this.props;

    return (
      <Form
        onSubmit={props.handleSubmit(
          this._handleUpdateProfileSubmit.bind(this)
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
            <Grid.Column width={6} textAlign="left">
              {this.renderBirthDateInput()}
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          {
            // Address
          }

          {
            // SubHeadline
          }
          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              <Header as="h4" color="black" textAlign="left">
                <Trans i18nKey="complete-profile-adress-information-headline" />
              </Header>
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

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
          {/* 
                 SKILLS CURRENTLY DISABLED;
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
                    <Button type="button" onClick={this._handleSkillSubmission}>
                      {i18next.t("complete-your-profile-add-skill-button")}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid> 
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row> */}
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
            <Grid.Column width={6}>{<StudentIdInput />}</Grid.Column>
            <Grid.Column width={6}>{<CourseOfStudyInput />}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="left" width={6}>
              {this.renderImmatriculationDateInput()}
            </Grid.Column>
            <Grid.Column textAlign="left" width={6}>
              {this.renderExmatericulationDateInput()}
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
              {this.renderRoomNameInput()}
              {this.renderAdditionalEmailInput()}
              {<ChairSelectionDropdown />}
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          {
            // Submit and Abort Buttons
          }
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <Form.Field
                control={Button}
                secondary
                onClick={props.onAbortButtonClick}
              >
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
  _handleUpdateProfileSubmit(values) {
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

    const DEFAULT_DATE_IF_UNSET = "1990-01-01T00:00:00+01:00";
    const DEFAULT_GENDER_IF_UNSET = 0;

    // Values that are extracted from the various input fields, each field is either managed by redux form
    // or via the components state.
    const profileValues = {
      userId: this.props.userId,
      title: values.title,
      gender: values.gender || DEFAULT_GENDER_IF_UNSET,
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: this.state.dateOfBirth || DEFAULT_DATE_IF_UNSET,
      address: {
        city: values.cityName,
        postCode: values.postalCode,
        street: values.streetName,
        room: values.roomName,
        email: values.additional_email
      },
      studentStatus: {
        matriculationNumber: values.studentId,
        subect: values.courseOfStudy,
        matriculationDate:
          this.state.immatriculationDate || DEFAULT_DATE_IF_UNSET,
        exmatriculationDate:
          this.state.exmatriculationDate || DEFAULT_DATE_IF_UNSET
      },
      employeeStatus: null,
      chairs: [values.chairs],
      skills: skillsRatings
    };

    if (this.state.mode === "edit") {
      this.props.dispatch(userActions.updateProfile(profileValues));
    } else if (this.state.mode === "add") {
    }
  }

  renderBirthDateInput() {
    return (
      <DateInput
        name="dateOfBirth"
        placeholder={i18next.t("complete-profile-dateOfBirth-placeholder")}
        value={this.state.dateOfBirth}
        iconPosition="left"
        onChange={this._handleDateOfBirthChange}
        label={i18next.t("complete-profile-dateOfBirth-label")}
        dateFormat=""
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
        dateFormat=""
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
        dateFormat=""
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

const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps.user);

  const isEmployee = ownProps.user.chairs.length !== 0;

  return {
    skillCatalogue: state.skillCatalogue,
    initialValues: {
      title: ownProps.user.title || "",
      gender: ownProps.user.gender || 0,
      firstName: ownProps.user.firstName || "",
      lastName: ownProps.user.lastName || "",
      city: ownProps.user.address ? ownProps.user.address.city : "",
      postalCode: ownProps.user.address ? ownProps.user.address.postalCode : "",
      street: ownProps.user.address ? ownProps.user.address.street : "",
      email: ownProps.user.address ? ownProps.user.address.email : "",
      isStudent: ownProps.user.studentStatus ? true : false,
      courseOfStudy: ownProps.user.studentStatus
        ? ownProps.user.studentStatus.subject
        : "",
      matriculatonNumber: ownProps.user.studentStatus
        ? ownProps.user.studentStatus.matriculationNumber
        : "",
      isEmployee: isEmployee
    }
  };
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "updateUserForm"
    })(UserForm)
  )
);
