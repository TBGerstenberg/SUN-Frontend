import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Button, Icon, Table, Modal } from "semantic-ui-react";
import { userActions } from "../redux/_actions";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import AddEntityModal from "./AddEntityModal";
import UserForm from "../03_organisms/UserForm";
import onClickOutside from "react-onclickoutside";
import { userService, accountService } from "../services";

class UserManagement extends React.Component {
  async componentWillMount() {
    const accountRequest = await accountService.getAllAccounts();

    if (accountRequest.status === 200) {
      this.setState({
        accounts: accountRequest.data
      });
    } else {
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: null,
      editUserModalOpen: false,
      addUserModalOpen: false,
      accounts: []
    };

    // Table render methods
    this.renderAccountsTableRow = this.renderAccountsTableRow.bind(this);
    this.renderAccountsTableHeader = this.renderAccountsTableHeader.bind(this);
    this.renderAccountsTableFooter = this.renderAccountsTableFooter.bind(this);

    // Button click handlers
    this.handleAddUserButtonClick = this.handleAddUserButtonClick.bind(this);
    this.handleEditUserButtonClick = this.handleEditUserButtonClick.bind(this);
    this.handleDeleteUserButtonClick = this.handleDeleteUserButtonClick.bind(
      this
    );

    // Modal opening methods
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.openEditUserModal = this.openEditUserModal.bind(this);
    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.closeEditUserModal = this.closeEditUserModal.bind(this);
  }

  render() {
    return (
      <div className="adminpanel-fragment-wrapper">
        {this.state.accounts.length > 0 && (
          <Table
            size="small"
            celled
            selectable
            attached="top"
            renderBodyRow={this.renderAccountsTableRow}
            headerRow={this.renderAccountsTableHeader}
            footerRow={this.renderAccountsTableFooter}
            tableData={this.state.accounts}
          />
        )}

        {/** Used to add a new user, thus handing a "null" user  */}
        <AddEntityModal
          size="large"
          modalContent={
            <UserForm
              account={null}
              onAbortButtonClick={() => {
                this.setState({ addUserModalOpen: false });
              }}
              onCompleteWithSuccess={() => {
                this.props.toggleSuccessMessage("Erfolg", "Benutzer editiert");
                this.closeAddUserModal();
              }}
              onCompleteWithError={error => {
                this.props.toggleErrorMessage("Fehler", error);
                this.closeAddUserModal();
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
              account={
                this.state.accounts[this.state.selectedEntry - 1] || null
              }
              onAbortButtonClick={() => {
                this.setState({ editUserModalOpen: false });
              }}
              onCompleteWithSuccess={() => {
                this.props.toggleSuccessMessage("Erfolg", "Benutzer angelegt");
                this.closeEditUserModal();
              }}
              onCompleteWithError={error => {
                this.props.toggleErrorMessage("Fehler", error);
                this.closeEditUserModal();
              }}
            />
          }
          open={this.state.editUserModalOpen}
        />
      </div>
    );
  }

  renderAccountsTableHeader() {
    return (
      <Table.Row>
        <Table.HeaderCell>
          <Trans i18nKey="usermanagement-tableheader-id" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="usermanagement-tableheader-email" />
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

  renderAccountsTableRow(account) {
    console.log(account);
    return (
      <Table.Row
        key={"row" + account.id}
        onClick={() => {
          this.setState({ selectedEntry: account.id });
        }}
        active={this.state.selectedEntry === account.id}
      >
        <Table.Cell key="id">
          {tableFormattingUtilities.numberOrEmpty(account.id)}
        </Table.Cell>
        <Table.Cell key="email">
          {tableFormattingUtilities.stringOrEmpty(account.email)}
        </Table.Cell>
        <Table.Cell key="title">
          {tableFormattingUtilities.stringOrEmpty(account.person.title)}
        </Table.Cell>
        <Table.Cell key="gender">
          {tableFormattingUtilities.genderEnumToString(account.person.gender)}
        </Table.Cell>
        <Table.Cell key="firstName">
          {tableFormattingUtilities.stringOrEmpty(account.person.firstName)}
        </Table.Cell>
        <Table.Cell key="lastName">
          {tableFormattingUtilities.stringOrEmpty(account.person.lastName)}
        </Table.Cell>
        <Table.Cell key="birthDate">
          {tableFormattingUtilities.getFormattedDate(account.person.birthDate)}
        </Table.Cell>
        <Table.Cell key="city">
          {tableFormattingUtilities.stringOrEmpty(account.person.address.city)}
        </Table.Cell>
        <Table.Cell key="postCode">
          {tableFormattingUtilities.stringOrEmpty(
            account.person.address.postCode
          )}
        </Table.Cell>
        <Table.Cell key="street">
          {tableFormattingUtilities.stringOrEmpty(
            account.person.address.street
          )}
        </Table.Cell>
        <Table.Cell key="isStudent">
          {tableFormattingUtilities.stringValueForBoolean(
            account.person.studentStatus
          )}
        </Table.Cell>
        <Table.Cell key="isEmployee">
          {tableFormattingUtilities.stringValueForBoolean(
            account.person.chairs && account.person.chairs.length > 0
          )}
        </Table.Cell>
      </Table.Row>
    );
  }

  renderAccountsTableFooter() {
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

  async handleDeleteUserButtonClick() {
    const deleteAccountRequest = accountService.deleteAccount(
      this.state.selectedEntry
    );

    if (deleteAccountRequest.status === 200) {
      this.props.toggleSuccessMessage("Erfolg", "Benutzer gelöscht");
    } else {
      this.props.toggleErrorMessage(
        "Fehler",
        "Benutzer konnte nicht gelöscht werden"
      );
    }
  }

  openEditUserModal() {
    return this.setState({
      editUserModalOpen: true
    });
  }

  closeEditUserModal() {
    this.setState({
      editUserModalOpen: false
    });
  }

  openAddUserModal() {
    return this.setState({
      addUserModalOpen: true
    });
  }

  closeAddUserModal() {
    this.setState({
      addUserModalOpen: false
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
