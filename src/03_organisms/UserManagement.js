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

  constructor(props) {
    super(props);
    this.state = { visible: false, selectedEntry: null };
    this.renderUsersTableRow = this.renderUsersTableRow.bind(this);
    this.renderUsersTableHeader = this.renderUsersTableHeader.bind(this);
    this.renderUsersTableFooter = this.renderUsersTableFooter.bind(this);
  }

  render() {
    console.log(this.props);
    return (
      <div className="adminpanel-fragment-wrapper">
        {console.log(this.props.users)}

        {this.props.users.length > 0 && (
          <Table
            celled
            selectable
            renderBodyRow={this.renderUsersTableRow}
            headerRow={this.renderUsersTableHeader}
            footerRow={this.renderUsersTableFooter}
            tableData={this.props.users}
          />
        )}
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
    console.log("Rendering user with Id " + user.id);

    return (
      <Table.Row
        key={"row" + user.id}
        onClick={() => {
          this.setState({ selectedEntry: user.id });
        }}
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
    );
  }

  handleAddUserButtonClick() {
    this.openModalUserForm();
  }

  openModalUserForm() {
    return <Modal />;
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users || []
  };
};

export default withTranslation()(connect(mapStateToProps)(UserManagement));

/**[
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
  ], */
