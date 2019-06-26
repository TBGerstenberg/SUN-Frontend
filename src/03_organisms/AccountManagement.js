import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Button, Icon, Table, Modal } from "semantic-ui-react";
import { accountActions } from "../redux/_actions";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import AddEntityModal from "./AddEntityModal";
import UserForm from "../03_organisms/UserForm";

class AccountManagement extends React.Component {
  componentWillMount() {}

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedEntry: null,
      modalOpen: false,
      accounts: null
    };
    this.renderUsersTableRow = this.renderUsersTableRow.bind(this);
    this.renderUsersTableHeader = this.renderUsersTableHeader.bind(this);
    this.renderUsersTableFooter = this.renderUsersTableFooter.bind(this);
    this.handleAddUserButtonClick = this.handleAddUserButtonClick.bind(this);
    this.openModalUserForm = this.openModalUserForm.bind(this);
  }

  render() {
    return (
      <div className="adminpanel-fragment-wrapper">
        {this.props.accounts.length > 0 && (
          <Table
            celled
            selectable
            renderBodyRow={this.renderUsersTableRow}
            headerRow={this.renderUsersTableHeader}
            footerRow={this.renderUsersTableFooter}
            tableData={this.props.accounts}
          />
        )}

        <AddEntityModal
          size="large"
          modalContent={
            <UserForm
              account={this.props.accounts[this.state.selectedEntry] || null}
            />
          }
          open={this.state.modalOpen}
          onOpen={() => {}}
          onClose={() => {}}
        />
      </div>
    );
  }

  renderUsersTableHeader() {
    return (
      <Table.Row>
        <Table.HeaderCell>
          <Trans i18nKey="accountmanagement-tableheader-id" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="accountmanagement-tableheader-email" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="accountmanagement-tableheader-password" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="accountmanagement-tableheader-admin" />
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  renderUsersTableRow(account) {
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
        <Table.Cell key="password">
          {tableFormattingUtilities.stringOrEmpty(account.password)}
        </Table.Cell>
        <Table.Cell key="admin">
          {tableFormattingUtilities.stringOrEmpty(account.admin)}
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
            <Icon name="account" />
            <Trans i18nKey="accountManagement-add-account-button" />
          </Button>

          <Button
            floated="right"
            icon
            labelPosition="left"
            size="small"
            disabled={!this.state.selectedEntry}
          >
            <Icon name="edit" />
            <Trans i18nKey="accountManagement-edit-account-button" />
          </Button>

          <Button
            floated="right"
            icon
            labelPosition="left"
            size="small"
            disabled={!this.state.selectedEntry}
          >
            <Icon name="trash" />
            <Trans i18nKey="accountManagement-delete-account-button" />
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  handleAddUserButtonClick() {
    this.openModalUserForm();
  }

  openModalUserForm() {
    return this.setState({
      modalOpen: true
    });
  }
}

const mapStateToProps = state => {
  return {};
};

export default withTranslation()(connect(mapStateToProps)(AccountManagement));
