import i18next from "i18next";
import moment from "moment";
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { CheckboxField, LabelInputField } from "react-semantic-redux-form";
import { Field, reduxForm } from "redux-form";
import { DateInput } from "semantic-ui-calendar-react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Message
} from "semantic-ui-react";
import ChairRoleList from "../02_molecules/ChairRoleList";
import CityNameInput from "../02_molecules/CityNameInput";
import CourseOfStudyInput from "../02_molecules/CourseOfStudyInput";
import EmailInput from "../02_molecules/EmailInput";
import FirstNameInput from "../02_molecules/FirstNameInput";
import GenderDropdownSelector from "../02_molecules/GenderDropdownSelector";
import LastNameInput from "../02_molecules/LastNameInput";
import PasswordInput from "../02_molecules/PasswordInput";
import PhoneNumberInput from "../02_molecules/PhoneNumberInput";
import PostalCodeInput from "../02_molecules/PostalCodeInput";
import StreetNameInput from "../02_molecules/StreetNameInput";
import StudentIdInput from "../02_molecules/StudentIdInput";
import TitleDropdownSelector from "../02_molecules/TitleDropdownSelector";
import Account from "../models/account";
import genderEnum from "../models/enumerations/genderEnum";
import { chairActions, skillCatalogueActions } from "../redux/_actions";
import { accountService, chairService } from "../services";
import userService from "../services/userService";
import formValidationUtilities from "../utilities/formValidationUtilities";

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    // Depending on the "Mode" of this form, it either initializes values from a given Account
    // Or initializes all input
    const mode = props.account ? "edit" : "add";
    const account = props.account ? new Account(props.account) : null;

    // StudentStatus values
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

    // PersonChairRelations
    let personChairRelations = [];
    if (props.account && props.account.person && props.account.person.chairs) {
      personChairRelations = props.account.person.chairs;
    }

    // Initialize Component state
    this.state = {
      currentSkillInputValue: "",
      currentlySelectedSkill: null,
      dateOfBirth: birthDate,
      matriculationDate: matriculationDate,
      exmatriculationDate: exmatriculationDate,

      personChairRelations: personChairRelations,
      mode: mode,
      account: account,

      errors: []
    };

    /* Bind Methods */

    // Input handlers
    this._handleSkillInputChange = this._handleSkillInputChange.bind(this);
    this._handleSkillSubmission = this._handleSkillSubmission.bind(this);
    this._handleSkillItemClick = this._handleSkillItemClick.bind(this);
    this._handleSkillDeletion = this._handleSkillDeletion.bind(this);
    this._handleSkillRating = this._handleSkillRating.bind(this);
    this._handleDateOfBirthChange = this._handleDateOfBirthChange.bind(this);
    this._handleImmatriculationDateChange = this._handleImmatriculationDateChange.bind(
      this
    );
    this._handleExmatriculationDateChange = this._handleExmatriculationDateChange.bind(
      this
    );
    this._handleUpdateProfileSubmit = this._handleUpdateProfileSubmit.bind(
      this
    );

    // Utility Methods
    this.renderErrorMessages = this.renderErrorMessages.bind(this);

    // Service Methods
    this.editUser = this.editUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  /** React-Component Lifecycle Methods  */

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
            // Email and Password
          }

          {!this.props.editedByOwner && (
            <>
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
                    name="email"
                    placeholder={i18next.t("signup-email-input-placeholder")}
                    validate={[
                      formValidationUtilities.requiredEmail,
                      formValidationUtilities.email,
                      formValidationUtilities.uniSiegenEmail
                    ]}
                  />
                  {this.state.mode === "add" && (
                    <PasswordInput
                      placeholder={i18next.t(
                        "signup-password-input-placeholder"
                      )}
                      name="password"
                      validators={[
                        formValidationUtilities.passwordStrength,
                        formValidationUtilities.requiredPassword
                      ]}
                    />
                  )}
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
            </>
          )}

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

          <Grid.Row textAlign="left">
            <Grid.Column width={6} textAlign="left">
              <Header as="h4" color="black" textAlign="left">
                <Trans i18nKey="complete-profile-contact-information-headline" />
              </Header>
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={6}>
              {this.renderAdditionalEmailInput()}
            </Grid.Column>
            <Grid.Column width={6} />
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={6}>
              <PhoneNumberInput
                name="phoneNumber"
                label="Telefon"
                placeholder="Telefonnummer"
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <PhoneNumberInput
                name="phoneNumberMobile"
                label="Mobil"
                placeholder="Mobil"
              />
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

          {this.props.isStudent && (
            <>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <StudentIdInput />
                </Grid.Column>
                <Grid.Column width={6}>
                  <CourseOfStudyInput />
                </Grid.Column>
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
            <Grid.Row columns={2}>
              <Grid.Column width={6}>{this.renderRoomNameInput()}</Grid.Column>
              <Grid.Column width={6} />
            </Grid.Row>
          )}

          {!props.editedByOwner && props.chairs && props.chairs.length > 0 && (
            <Grid.Row columns={1}>
              <Grid.Column width={12}>
                <ChairRoleList
                  userId={
                    this.state.account ? this.state.account.person.id : null
                  }
                  itemsAddable={!props.editedByOwner}
                  items={this.state.personChairRelations}
                  chairs={props.chairs}
                  onChange={personChairRelations => {
                    this.setState({
                      personChairRelations: personChairRelations
                    });
                  }}
                />
              </Grid.Column>
            </Grid.Row>
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
                {i18next.t("complete-your-profile-abort-button")}
              </Button>
            </Grid.Column>
            <Grid.Column width={3}>
              <Form.Field control={Button} primary type="submit">
                {i18next.t("complete-your-profile-continue-button")}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          {this.state.errors.length > 0 && (
            <Grid.Row>
              <Grid.Column width={12}>{this.renderErrorMessages()}</Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form>
    );
  }

  /** Input-Changehandlers */

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
    /*  
   // SKILLS currently disabled 
   const skillCatalogue = this.props.skillCatalogue;
    let skillsRatings = [];

    if (skillCatalogue) {
      skillCatalogue.skills.forEach((element, index) => {
        skillsRatings.push({
          skill: element,
          rating: skillCatalogue.ratings[index]
        });
      });
    } */

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
          email: values.additional_email,
          phoneNumber: values.phoneNumber,
          phoneNumberMobile: values.phoneNumberMobile
        },
        studentStatus: {
          matriculationNumber: values.studentId,
          subject: values.courseOfStudy,
          matriculationDate: matriculationDate,
          exmatriculationDate: exmatriculationDate
        }
        // skills: skillsRatings
      }
    };

    // Temporary workaround, since the BE responds with a 400 when including the admin field
    if (!this.props.editedByOwner) {
      accountValues.admin = values.accountIsAdminCheckbox;
      accountValues["newEmail"] = values.email;
    }

    this.setState({
      errors: []
    });

    if (this.state.mode === "edit") {
      this.editUser(accountValues);
    } else if (this.state.mode === "add") {
      this.addUser(accountValues);
    }
  }

  /** Service calling-methods */

  /** Calls the various services that ineract with the SUN-API to update
   *  the entities touched by this form, including the Account-API, the Person-API and the Chairs-API
   *  @param accountValues - Current input values of all the input fields in this form.
   */
  async editUser(accountValues) {
    const editAccountRequest = await accountService.editAccount(
      accountValues,
      this.state.account.id
    );

    if (
      editAccountRequest.response &&
      editAccountRequest.response.status === 200
    ) {
      // The owner of the account cant update his personChairRelations himself
      if (this.props.editedByOwner) {
        this.props.onCompleteWithSuccess();
      } else {
        const editPersonChairRelationsRequest = await chairService.updatePersonChairRelations(
          this.state.personChairRelations
        );

        if (
          editPersonChairRelationsRequest[0] &&
          editPersonChairRelationsRequest[0].status === 200
        ) {
          this.props.onCompleteWithSuccess();
        } else {
          this.props.onCompleteWithError(editPersonChairRelationsRequest.error);
        }
      }
    } else {
      this.setState({
        errors: [...this.state.errors, editAccountRequest.error.status]
      });
    }
  }

  /** Calls the various services that ineract with the SUN-API to create a new user
   *  including the Account-API, the Person-API and the Chairs-API
   *  @param accountValues - Current input values of all the input fields in this form.
   */
  async addUser(accountValues) {
    // Create a new Account
    const newAccountRequest = await userService.signup(
      accountValues.newEmail,
      accountValues.password
    );

    // If no errors occur, update the profile of with values from the form.
    if (newAccountRequest.error == null && newAccountRequest.status === 200) {
      // Set the person Id returned from the BE to update the newly created profile with the valeus set in the from
      accountValues.person.userId = newAccountRequest.user.person.id;
      const updateProfileRequest = await userService.updateProfile(
        accountValues.person
      );

      // If no errors occur, update the personChair-relations from the form
      if (
        updateProfileRequest.response &&
        updateProfileRequest.response.status === 200
      ) {
        let personChairRelations = [...this.state.personChairRelations];

        // Add missing person id from create-account-response to person-Chair-relations
        personChairRelations.forEach(element => {
          element.personId = newAccountRequest.user.person.id;
        });

        const addChairRelationsRequest = await chairService.updatePersonChairRelations(
          personChairRelations
        );

        // If no errors occur in this stage, all values could be successfully updated. Call "onCompleteWithSuccess - giving control back to the contorlling component (UserManagement in this case)"
        if (
          addChairRelationsRequest[0] &&
          addChairRelationsRequest[0].status === 200
        ) {
          this.props.onCompleteWithSuccess();
        } else {
          this.props.onCompleteWithError(addChairRelationsRequest.error);
        }
      } else {
        this.setState({
          errors: [...this.state.errors, updateProfileRequest.error]
        });
      }
    } else {
      this.setState({
        errors: [...this.state.errors, newAccountRequest.error]
      });
    }
  }

  /** Component-rendering methods */

  /** Renders a redux-form BirthDate-Input field */
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

  /** Renders a redux-Form input-field for the immatriculationdate of a student*/
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

  /** Renders a redux-Form input-field for the exmatriculationdate of a student*/
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

  /** Renders a redux-Form input-field for the room in which an employee can be met */
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

  /**  Renders a redux-Form input field for a publicly available email that may deviate from the one set in the creation of one's account*/
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

  /** Renders a set of error messages that may occur when performing one of the numerous API-requests from this form */
  renderErrorMessages() {
    return (
      <>
        {this.state.errors.map((errorStatus, index) => {
          return (
            <Message negative key={index}>
              <Message.Header>
                {" "}
                {i18next.t(`userForm-error-${errorStatus}-message`)}
              </Message.Header>
              <p> {i18next.t(`userForm-error-${errorStatus}-explanation`)}</p>
            </Message>
          );
        })}
      </>
    );
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
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
        editedByOwner:
          state.login.user.person.id === ownProps.account.person.id,

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
          phoneNumber: ownProps.account.person.address
            ? ownProps.account.person.address.phoneNumber
            : "",
          phoneNumberMobile: ownProps.account.person.address
            ? ownProps.account.person.address.phoneNumberMobile
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
              ? ownProps.account.person.studentStatus.subject
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
        loggedInUsersAccount: state.login.user,

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
      isStudent: isStudent,
      loggedInUsersAccount: state.login.user
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
