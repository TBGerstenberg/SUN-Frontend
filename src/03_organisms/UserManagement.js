import React from "react";
import { Trans, withTranslation } from "react-i18next";
import onClickOutside from "react-onclickoutside";
import { connect } from "react-redux";
import { Button, Icon, Table } from "semantic-ui-react";
import UserForm from "../03_organisms/UserForm";
import { accountService } from "../services";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import AddEntityModal from "./AddEntityModal";

class UserManagement extends React.Component {
  /** React-component-lifecycle methods */

  async componentWillMount() {
    this.fetchAllAccounts();
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

    // Service callers
    this.fetchAllAccounts = this.fetchAllAccounts.bind(this);

    // Utilities
    this.findSelectedAccount = this.findSelectedAccount.bind(this);
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
                this.props.toggleSuccessMessage("Erfolg", "Benutzer angelegt");
                this.fetchAllAccounts();
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
              account={this.findSelectedAccount() || null}
              onAbortButtonClick={() => {
                this.setState({ editUserModalOpen: false });
              }}
              onCompleteWithSuccess={() => {
                this.props.toggleSuccessMessage("Erfolg", "Benutzer editiert");
                this.fetchAllAccounts();
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

  /** Table rendering methods */

  // Renders the header of the users-table
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

  // Renders the body of the users-table
  renderAccountsTableRow(account) {
    return (
      <Table.Row
        key={"row" + account.id}
        onClick={() => {
          console.log("Selected entry" + account.id);
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

  // Renders the footer of the users-table
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

  findSelectedAccount() {
    return this.state.accounts.find(account => {
      return account.id === this.state.selectedEntry;
    });
  }

  /** Button click handlers */

  // Handles a click on the add-user Button
  handleAddUserButtonClick() {
    this.openAddUserModal();
  }

  // Handles a click on the edit-user Button
  handleEditUserButtonClick() {
    this.openEditUserModal();
  }

  // Handles a click on the delete-user Button
  async handleDeleteUserButtonClick() {
    const deleteAccountRequest = await accountService.deleteAccount(
      this.state.selectedEntry
    );
    console.log(deleteAccountRequest);

    if (deleteAccountRequest.status === 200) {
      this.props.toggleSuccessMessage("Erfolg", "Benutzer gelöscht");
      this.fetchAllAccounts();
    } else {
      this.props.toggleErrorMessage(
        "Fehler",
        "Benutzer konnte nicht gelöscht werden"
      );
    }
  }

  /** Modal controls */

  // Opens the modal to edit an existing user
  openEditUserModal() {
    return this.setState({
      editUserModalOpen: true
    });
  }

  // Closes the modal to edit an existing user
  closeEditUserModal() {
    this.setState({
      editUserModalOpen: false
    });
  }

  // Opens the modal to add a new user
  openAddUserModal() {
    return this.setState({
      addUserModalOpen: true
    });
  }

  // Closes the modal to Add a new user
  closeAddUserModal() {
    this.setState({
      addUserModalOpen: false
    });
  }

  /** Utility Methods */

  // Removes focus from the selected table row when clicking outside of the table
  handleClickOutside = evt => {
    this.setState({
      selectedEntry: null
    });
  };

  /** Service call wrappers */

  async fetchAllAccounts() {
    const accountRequest = await accountService.getAllAccounts();

    if (accountRequest.status === 200) {
      this.setState({
        accounts: accountRequest.data
      });
    } else {
    }
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = state => {
  return {
    users: state.user.users || []
  };
};

export default withTranslation()(
  connect(mapStateToProps)(onClickOutside(UserManagement))
);
