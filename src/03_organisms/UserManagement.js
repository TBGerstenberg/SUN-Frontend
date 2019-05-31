import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Field, reduxForm } from "redux-form";
import { Button, Icon, Table } from "semantic-ui-react";
import { userActions } from "../redux/_actions";

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
    return (
      <Table celled compact definition selectable>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Premium Plan</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.forEach((user, index) => {
            this.renderUsersTableRow(user);
          })}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
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

  renderUsersTableRow(user) {
    const TableRow = user => (
      <Table.Row>
        <Table.Cell key="email">{user.email}</Table.Cell>
        <Table.Cell key="password">{user.password}</Table.Cell>
        <Table.Cell key="firstName">{user.firstName}</Table.Cell>
        <Table.Cell key="lastName">{user.lastName}</Table.Cell>
        <Table.Cell key="birthDate">{user.birthDate}</Table.Cell>
        <Table.Cell key="city">{user.adress.city}</Table.Cell>
        <Table.Cell key="postCode">{user.adress.postCode}</Table.Cell>
        <Table.Cell key="street">{user.adress.street}</Table.Cell>
        <Table.Cell key="houseNumber">{user.adress.houseNumber}</Table.Cell>
        <Table.Cell key="isStudent">{user.studentStatus}</Table.Cell>
        <Table.Cell key="isEmployee">{user.employeeStatus}</Table.Cell>
      </Table.Row>
    );
    return TableRow;
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  ...state
});

export default withTranslation()(connect(mapStateToProps)(UserManagement));
