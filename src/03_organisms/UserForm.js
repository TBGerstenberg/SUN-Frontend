import React from "react";
import { Grid, Header, Button, Form, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { LabelInputField, CheckboxField } from "react-semantic-redux-form";
import i18next from "i18next";
import { DateInput } from "semantic-ui-calendar-react";
import { userActions, skillCatalogueActions } from "../redux/_actions";
import userService from "../services/userService";

import formValidationUtilities from "../utilities/formValidationUtilities";
import { chairActions } from "../redux/_actions";

import StudentIdInput from "../02_molecules/StudentIdInput";
import CourseOfStudyInput from "../02_molecules/CourseOfStudyInput";
import CityNameInput from "../02_molecules/CityNameInput";
import StreetNameInput from "../02_molecules/StreetNameInput";
import PostalCodeInput from "../02_molecules/PostalCodeInput";
import FirstNameInput from "../02_molecules/FirstNameInput";
import LastNameInput from "../02_molecules/LastNameInput";
import TitleDropdownSelector from "../02_molecules/TitleDropdownSelector";
import GenderDropdownSelector from "../02_molecules/GenderDropdownSelector";
import EmailInput from "../02_molecules/EmailInput";
import PasswordInput from "../02_molecules/PasswordInput";
import ChairRoleList from "../02_molecules/ChairRoleList";

import genderEnum from "../models/enumerations/genderEnum";
import Account from "../models/account";
import { accountService, chairService } from "../services";
import moment from "moment";

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    const mode = props.account ? "edit" : "add";
    const account = props.account ? new Account(props.account) : null;

    let matriculationDate = "";
    let exmatriculationDate = "";
    let birthDate = "";

    if (account && account.person) {
      birthDate = account.person.birthDate
        ? moment(account.person.birthDate).format("DD-MM-YYYY")
        : "";

      if (account.person && account.person.isStudent()) {
        matriculationDate = account.person.studentStatus.matriculationDate
          ? moment(account.person.studentStatus.matriculationDate).format(
              "DD-MM-YYYY"
            )
          : "";
        exmatriculationDate = account.person.studentStatus.exmatriculationDate
          ? moment(account.person.studentStatus.exmatriculationDate).format(
              "DD-MM-YYYY"
            )
          : "";
      }
    }

    let personChairRelations = [];
    if (props.account && props.account.person && props.account.person.chairs) {
      personChairRelations = props.account.person.chairs;
    }

    this.state = {
      currentSkillInputValue: "",
      currentlySelectedSkill: null,
      dateOfBirth: birthDate,
      matriculationDate: matriculationDate,
      exmatriculationDate: exmatriculationDate,
      personChairRelations: personChairRelations,
      mode: mode,
      account: props.account
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

  componentWillMount() {
    this.props.dispatch(chairActions.getAllChairs());
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
              {this.state.mode === "edit" && (
                <Trans i18nKey="usermanagement-edit-user-headline" />
              )}
              {this.state.mode === "add" && (
                <Trans i18nKey="usermanagement-add-user-headline" />
              )}
            </Header>
          </Grid.Row>

          {
            // SubHeadline
          }
          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              <Header as="h4" color="black" textAlign="left">
                <Trans i18nKey="usermanagement-edit-user-headline" />
              </Header>
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          {
            // Email and Password
          }

          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              <Header as="h4" color="black" textAlign="left">
                <Trans i18nKey="complete-profile-account-information-headline" />
              </Header>
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              <EmailInput
                validate={[
                  formValidationUtilities.requiredEmail,
                  formValidationUtilities.email,
                  formValidationUtilities.uniSiegenEmail
                ]}
              />
              {this.state.mode === "add" && <PasswordInput />}
            </Grid.Column>
            <Grid.Column width={6}>
              <Form.Group>
                <Field
                  name="accountIsAdminCheckbox"
                  component={CheckboxField}
                  label={"Admin"}
                />
              </Form.Group>
            </Grid.Column>
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
              <TitleDropdownSelector
                defaultValue={
                  props.initialValues ? props.initialValues.title : null
                }
              />
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
            <Grid.Column width={6} />
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

          {this.props.isStudent && (
            <>
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
            </>
          )}

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
          {this.props.isEmployee && (
            <>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  {this.renderRoomNameInput()}
                </Grid.Column>
                <Grid.Column width={6}>
                  {this.renderAdditionalEmailInput()}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column width={12}>
                  {props.chairs && props.chairs.length > 0 && (
                    <ChairRoleList
                      userId={props.userId}
                      items={this.state.personChairRelations}
                      chairs={props.chairs}
                      onChange={personChairRelations => {
                        this.setState({
                          personChairRelations: personChairRelations
                        });
                      }}
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </>
          )}

          {
            // Submit and Abort Buttons
          }
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <Button
                secondary
                onClick={props.onAbortButtonClick}
                type="button"
              >
                {i18next.t("complete-your-profile-continue-button")}
              </Button>
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
    this.setState({ matriculationDate: value });
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
  async _handleUpdateProfileSubmit(values) {
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

    const DEFAULT_DATE_IF_UNSET = "1990-01-01T00:00:00";
    const DEFAULT_GENDER_IF_UNSET = 0;

    const birthDate = this.state.dateOfBirth
      ? moment(this.state.dateOfBirth, "DD-MM-YYYY").format()
      : DEFAULT_DATE_IF_UNSET;
    const matriculationDate = this.state.matriculationDate
      ? moment(this.state.matriculationDate, "DD-MM-YYYY").format()
      : DEFAULT_DATE_IF_UNSET;
    const exmatriculationDate = this.state.exmatriculationDate
      ? moment(this.state.exmatriculationDate, "DD-MM-YYYY").format()
      : DEFAULT_DATE_IF_UNSET;

    // Values that are extracted from the various input fields, each field is either managed by redux form
    // or via the components state.
    const accountValues = {
      email: values.email,
      admin: values.accountIsAdminCheckbox,
      person: {
        userId: this.props.userId,
        title: values.title,
        gender: values.gender || DEFAULT_GENDER_IF_UNSET,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: birthDate,
        address: {
          city: values.cityName,
          postCode: values.postCode,
          street: values.street,
          room: values.roomName,
          email: values.additional_email
        },
        studentStatus: {
          matriculationNumber: values.studentId,
          subect: {
            name: values.courseOfStudy
          },
          matriculationDate: matriculationDate,
          exmatriculationDate: exmatriculationDate
        },
        chairs: this.state.personChairRelations,
        skills: skillsRatings
      }
    };

    if (this.state.mode === "edit") {
      const editAccountRequest = await accountService.editAccount(
        accountValues,
        this.state.account.id
      );

      if (editAccountRequest.response.status === 200) {
        console.log("Completed with success");
        this.props.onCompleteWithSuccess();
      } else {
        this.props.onCompleteWithError();
      }
    } else if (this.state.mode === "add") {
      // Create a new Account
      const newAccountRequest = await userService.signup(
        values.email,
        values.password
      );

      // If errors occur, update the profile of with values from the form.
      if (newAccountRequest.error == null && newAccountRequest.status === 200) {
        accountValues.person.userId = newAccountRequest.user.person.id;
        const updateProfileRequest = userService.updateProfile(
          accountValues.person
        );

        if (updateProfileRequest.status === 200) {
          this.props.onCompleteWithSuccess();
        } else {
          this.props.onCompleteWithError();
        }
      }
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
        dateFormat="DD-MM-YYYY"
      />
    );
  }

  renderImmatriculationDateInput() {
    return (
      <DateInput
        name="matriculationDate"
        placeholder={i18next.t(
          "complete-profile-immatriculationDate-placeholder"
        )}
        value={this.state.matriculationDate}
        iconPosition="left"
        onChange={this._handleImmatriculationDateChange}
        label={i18next.t("complete-profile-immatriculationDate-label")}
        dateFormat="DD-MM-YYYY"
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
        dateFormat="DD-MM-YYYY"
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
  let isStudent;
  let isEmployee;

  if (
    state.form &&
    state.form.completeProfileForm &&
    state.form.completeProfileForm.values
  ) {
    isStudent = state.form.completeProfileForm.values.isStudent;
    isEmployee = state.form.completeProfileForm.values.isEmployee;
  }

  // Initialize redux form with account values given in props
  if (ownProps.account) {
    if (ownProps.account.person) {
      const gender = genderEnum[ownProps.account.person.gender];

      return {
        chairs: state.chair.chairs,
        skillCatalogue: state.skillCatalogue,
        isEmployee: isEmployee,
        isStudent: isStudent,

        initialValues: {
          email: ownProps.account.email || "",
          accountIsAdminCheckbox: ownProps.account.admin || false,

          title: ownProps.account.person.title || "",
          gender: gender || 0,
          firstName: ownProps.account.person.firstName || "",
          lastName: ownProps.account.person.lastName || "",
          cityName: ownProps.account.person.address
            ? ownProps.account.person.address.city
            : "",
          postCode: ownProps.account.person.address
            ? ownProps.account.person.address.postCode
            : "",
          street: ownProps.account.person.address
            ? ownProps.account.person.address.street
            : "",
          roomName: ownProps.account.person.address
            ? ownProps.account.person.address.room
            : "",
          additional_email: ownProps.account.person.address
            ? ownProps.account.person.address.email
            : "",
          isStudent: ownProps.account.person.studentStatus ? true : false,
          courseOfStudy:
            ownProps.account.person.studentStatus &&
            ownProps.account.person.studentStatus.subject
              ? ownProps.account.person.studentStatus.subject.name
              : "",
          matriculatonNumber: ownProps.account.person.studentStatus
            ? ownProps.account.person.studentStatus.matriculationNumber
            : "",
          isEmployee: ownProps.account.person.chairs.length !== 0
        }
      };
    } else {
      return {
        chairs: state.chair.chairs,
        skillCatalogue: state.skillCatalogue,
        isEmployee: isEmployee,
        isStudent: isStudent,

        initialValues: {
          email: ownProps.account.email || "",
          accountIsAdminCheckbox: ownProps.account.admin || false,
          isEmployee: false,
          isStudent: false
        }
      };
    }
  } else {
    return {
      chairs: state.chair.chairs,
      isEmployee: isEmployee,
      isStudent: isStudent
    };
  }
};

export default withTranslation()(
  connect(mapStateToProps)(
    reduxForm({
      form: "completeProfileForm"
    })(UserForm)
  )
);
