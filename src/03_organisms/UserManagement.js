import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Button, Icon, Table, Modal } from "semantic-ui-react";
import { userActions } from "../redux/_actions";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import AddEntityModal from "./AddEntityModal";
import UserForm from "../03_organisms/UserForm";
import onClickOutside from "react-onclickoutside";
import { userService } from "../services";
import accountService from "../services/accountService";

class UserManagement extends React.Component {
  componentWillMount() {
    this.props.dispatch(userActions.getAllUsers());
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: null,
      editUserModalOpen: false,
      addUserModalOpen: false
    };

    // Table render methods
    this.renderUsersTableRow = this.renderUsersTableRow.bind(this);
    this.renderUsersTableHeader = this.renderUsersTableHeader.bind(this);
    this.renderUsersTableFooter = this.renderUsersTableFooter.bind(this);

    // Button click handlers
    this.handleAddUserButtonClick = this.handleAddUserButtonClick.bind(this);
    this.handleEditUserButtonClick = this.handleEditUserButtonClick.bind(this);
    this.handleDeleteUserButtonClick = this.handleDeleteUserButtonClick.bind(
      this
    );

    // Modal opening methods
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.openEditUserModal = this.openEditUserModal.bind(this);
  }

  render() {
    console.log("Selected: " + this.state.selectedEntry);
    return (
      <div className="adminpanel-fragment-wrapper">
        {this.props.users.length > 0 && (
          <Table
            size="small"
            celled
            selectable
            attached="top"
            renderBodyRow={this.renderUsersTableRow}
            headerRow={this.renderUsersTableHeader}
            footerRow={this.renderUsersTableFooter}
            tableData={this.props.users}
          />
        )}

        {/** Used to add a new user, thus handing a "null" user  */}
        <AddEntityModal
          size="large"
          modalContent={
            <UserForm
              user={null}
              onAbortButtonClick={() => {
                this.setState({ addUserModalOpen: false });
              }}
            />
          }
          open={this.state.addUserModalOpen}
        />

        {/** Used to edit a user  */}
        <AddEntityModal
          size="large"
          modalContent={
            <UserForm
              user={this.props.users[this.state.selectedEntry - 1] || null}
              onAbortButtonClick={() => {
                this.setState({ editUserModalOpen: false });
              }}
            />
          }
          open={this.state.editUserModalOpen}
        />
      </div>
    );
  }

  renderUsersTableHeader() {
    return (
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
    );
  }

  renderUsersTableRow(user) {
    return (
      <Table.Row
        key={"row" + user.id}
        onClick={() => {
          this.setState({ selectedEntry: user.id });
        }}
        active={this.state.selectedEntry === user.id}
      >
        <Table.Cell key="id">
          {tableFormattingUtilities.numberOrEmpty(user.id)}
        </Table.Cell>
        <Table.Cell key="email">
          {tableFormattingUtilities.stringOrEmpty(user.email)}
        </Table.Cell>
        <Table.Cell key="password">
          {tableFormattingUtilities.stringOrEmpty(user.password)}
        </Table.Cell>
        <Table.Cell key="title">
          {tableFormattingUtilities.stringOrEmpty(user.title)}
        </Table.Cell>
        <Table.Cell key="gender">
          {tableFormattingUtilities.stringOrEmpty(user.gender)}
        </Table.Cell>
        <Table.Cell key="firstName">
          {tableFormattingUtilities.stringOrEmpty(user.firstName)}
        </Table.Cell>
        <Table.Cell key="lastName">
          {tableFormattingUtilities.stringOrEmpty(user.lastName)}
        </Table.Cell>
        <Table.Cell key="birthDate">
          {tableFormattingUtilities.stringOrEmpty(user.birthDate)}
        </Table.Cell>
        <Table.Cell key="city">
          {tableFormattingUtilities.stringOrEmpty(user.address.city)}
        </Table.Cell>
        <Table.Cell key="postCode">
          {tableFormattingUtilities.stringOrEmpty(user.address.postCode)}
        </Table.Cell>
        <Table.Cell key="street">
          {tableFormattingUtilities.stringOrEmpty(user.address.street)}
        </Table.Cell>
        <Table.Cell key="isStudent">
          {tableFormattingUtilities.stringValueForBoolean(user.studentStatus)}
        </Table.Cell>
        <Table.Cell key="isEmployee">
          {tableFormattingUtilities.stringValueForBoolean(user.employeeStatus)}
        </Table.Cell>
      </Table.Row>
    );
  }

  renderUsersTableFooter() {
    return (
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
            onClick={this.handleEditUserButtonClick}
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
            onClick={this.handleDeleteUserButtonClick}
          >
            <Icon name="trash" />
            <Trans i18nKey="userManagement-delete-user-button" />
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  handleAddUserButtonClick() {
    this.openAddUserModal();
  }

  handleEditUserButtonClick() {
    this.openEditUserModal();
  }

  handleDeleteUserButtonClick() {
    accountService.deleteAccount(this.state.selectedEntry);
  }

  openEditUserModal() {
    return this.setState({
      editUserModalOpen: true
    });
  }
  openAddUserModal() {
    return this.setState({
      addUserModalOpen: true
    });
  }

  handleClickOutside = evt => {
    this.setState({
      selectedEntry: null
    });
  };
}

const mapStateToProps = state => {
  return {
    users: state.user.users || []
  };
};

export default withTranslation()(
  connect(mapStateToProps)(onClickOutside(UserManagement))
);
