import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Button, Icon, Table, Modal } from "semantic-ui-react";
import { userActions } from "../redux/_actions";
import UpdateProfileForm from "./UpdateProfileForm";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";

class UserManagement extends React.Component {
  componentWillMount() {
    this.props.dispatch(userActions.getAllUsers());
  }

  state = { visible: false, selectedEntry: null };

  render() {
    return (
      <div className="adminpanel-fragment-wrapper">
        {this.renderUsersTable(this.props.users)}
      </div>
    );
  }

  renderUsersTable(users) {
    console.log(users);
    return (
      <Table celled selectable>
        {this.renderUsersTableHeader()}
        <Table.Body>
          {this.renderUsersTableRow(users[0])}
          {users.forEach(user => {
            this.renderUsersTableRow(user);
          })}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="14">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={this.handleAddUserButtonClick}
              >
                <Icon name="user" />
                <Trans i18nKey="userManagement-add-user-button" />
              </Button>

              <Button
                floated="right"
                icon
                labelPosition="left"
                size="small"
                disabled={!this.state.selectedEntry}
              >
                <Icon name="edit" />
                <Trans i18nKey="userManagement-edit-user-button" />
              </Button>

              <Button
                floated="right"
                icon
                labelPosition="left"
                size="small"
                disabled={!this.state.selectedEntry}
              >
                <Icon name="trash" />
                <Trans i18nKey="userManagement-delete-user-button" />
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  renderUsersTableHeader() {
    return (
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-id" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-email" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-password" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-title" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-gender" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-firstName" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-lastName" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-birthDate" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-city" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-postCode" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-street" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-studentStatus" />
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Trans i18nKey="usermanagement-tableheader-employeeStatus" />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }

  renderUsersTableRow(user) {
    console.log(user);
    return (
      <Table.Row
        key={"row" + user.id}
        onClick={() => {
          this.setState({ selectedEntry: user.id });
        }}
      >
        <Table.Cell key="id">{user.id}</Table.Cell>
        <Table.Cell key="email">{user.email}</Table.Cell>
        <Table.Cell key="password">{user.password}</Table.Cell>
        <Table.Cell key="title">{user.title}</Table.Cell>
        <Table.Cell key="gender">{user.gender}</Table.Cell>
        <Table.Cell key="firstName">{user.firstName}</Table.Cell>
        <Table.Cell key="lastName">{user.lastName}</Table.Cell>
        <Table.Cell key="birthDate">{user.birthDate}</Table.Cell>
        <Table.Cell key="city">{user.address.city}</Table.Cell>
        <Table.Cell key="postCode">{user.address.postCode}</Table.Cell>
        <Table.Cell key="street">{user.address.street}</Table.Cell>
        <Table.Cell key="isStudent">
          {tableFormattingUtilities.stringValueForBoolean(user.studentStatus)}
        </Table.Cell>
        <Table.Cell key="isEmployee">
          {tableFormattingUtilities.stringValueForBoolean(user.employeeStatus)}
        </Table.Cell>
      </Table.Row>
    );
  }

  handleAddUserButtonClick() {
    this.openModalUserForm();
  }

  openModalUserForm() {
    return (
      <Modal>
        <UpdateProfileForm />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  users: [
    {
      id: 1,
      firstName: "Sebastian",
      lastName: "Zilles",
      title: null,
      gender: 1,
      birthDate: "1994-01-23T00:00:00",
      address: {
        id: 1,
        name: null,
        street: "Am Gänschenwald 15",
        postCode: "51467",
        city: "Bergisch Gladbach",
        room: "Example",
        phoneNumber: "01605000231",
        phoneNumberMobile: null,
        email: null
      },
      studentStatus: {
        id: 0,
        personForeignId: 0,
        person: null,
        matriculationNumber: null,
        matriculationDate: "0001-01-01T00:00:00",
        exmatriculationDate: "0001-01-01T00:00:00",
        subject: null
      },
      chairs: [
        {
          personId: 1,
          chairId: 1,
          chair: null,
          role: 2,
          active: false,
          chairAdmin: false
        }
      ],
      chairSubscriptions: [],
      authoredChairPosts: [],
      skills: []
    }
  ],
  ...state
});

export default withTranslation()(connect(mapStateToProps)(UserManagement));
