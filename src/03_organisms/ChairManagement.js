import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Field, reduxForm } from "redux-form";
import { chairActions } from "../redux/_actions";
import { Button, Icon, Table, Modal, Grid } from "semantic-ui-react";
import i18next from "i18next";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import { chairService } from "../services";

import AddEntityModal from "./AddEntityModal";
import ChairForm from "../03_organisms/ChairForm";
import onClickOutside from "react-onclickoutside";
import SuccessMessage from "../01_atoms/SuccessMessage";
import ErrorMessage from "../01_atoms/ErrorMessage";

class ChairManagement extends React.Component {
  componentWillMount() {
    this.props.dispatch(chairActions.getAllChairs());
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: null,
      editChairModalOpen: false,
      addChairModalOpen: false,
      successMessageShown: false,
      errorMessageShown: false
    };

    // Table Rendering
    this.renderChairsTableRow = this.renderChairsTableRow.bind(this);
    this.renderChairsTableHeader = this.renderChairsTableHeader.bind(this);
    this.renderChairsTableFooter = this.renderChairsTableFooter.bind(this);

    // Button click handlers
    this.handleAddChairButtonClick = this.handleAddChairButtonClick.bind(this);
    this.handleEditChairButtonClick = this.handleEditChairButtonClick.bind(
      this
    );
    this.handleDeleteChairButtonClick = this.handleDeleteChairButtonClick.bind(
      this
    );

    // Modal opening methods
    this.openAddChairModal = this.openAddChairModal.bind(this);
    this.openEditChairModal = this.openEditChairModal.bind(this);
  }

  render() {
    return (
      <div className="adminpanel-fragment-wrapper">
        {this.props.chairs.length > 0 && (
          <Table
            celled
            selectable
            renderBodyRow={this.renderChairsTableRow}
            headerRow={this.renderChairsTableHeader}
            footerRow={this.renderChairsTableFooter}
            tableData={this.props.chairs}
          />
        )}

        {/** Used to add a new chair, thus handing a "null" chair  */}
        <AddEntityModal
          size="large"
          modalContent={
            <ChairForm
              chair={null}
              onAbortButtonClick={this.closeAddChairModal}
              onCompleteWithSuccess={() => {
                this.props.toggleSuccessMessage("Erfolg", "Lehrstuhl angelegt");
                this.closeAddChairModal();
              }}
              onCompleteWithError={error => {
                this.props.toggleErrorMessage("Fehler", "irgendwas");
                this.closeAddChairModal();
              }}
            />
          }
          open={this.state.addChairModalOpen}
        />

        {/** Used to edit a chair  */}
        <AddEntityModal
          size="large"
          modalContent={
            <ChairForm
              chair={this.props.chairs[this.state.selectedEntry - 1] || null}
              onAbortButtonClick={() => {
                this.setState({ editChairModalOpen: false });
              }}
              onCompleteWithSuccess={() => {
                this.props.toggleSuccessMessage("Erfolg", "Lehrstuhl editiert");
                this.closeEditChairModal();
              }}
              onCompleteWithError={error => {
                this.props.toggleErrorMessage("Fehler", "irgendwas");
                this.closeEditChairModal();
              }}
            />
          }
          open={this.state.editChairModalOpen}
        />
      </div>
    );
  }

  renderChairsTableHeader() {
    return (
      <Table.Row>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-id" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-name" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-city" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-postCode" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-street" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-room" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-phoneNumber" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Trans i18nKey="chairManagement-tableheader-phoneNumberMobile" />
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  renderChairsTableRow(chair) {
    return (
      <Table.Row
        key={"row" + chair.id}
        onClick={() => {
          this.setState({ selectedEntry: chair.id });
        }}
        active={this.state.selectedEntry === chair.id}
      >
        <Table.Cell key="id">
          {tableFormattingUtilities.numberOrEmpty(chair.id)}
        </Table.Cell>
        <Table.Cell key="name">
          {tableFormattingUtilities.numberOrEmpty(chair.name)}
        </Table.Cell>
        <Table.Cell key="city">
          {tableFormattingUtilities.stringOrEmpty(chair.address.city)}
        </Table.Cell>
        <Table.Cell key="postCode">
          {tableFormattingUtilities.stringOrEmpty(chair.address.postCode)}
        </Table.Cell>
        <Table.Cell key="street">
          {tableFormattingUtilities.stringOrEmpty(chair.address.street)}
        </Table.Cell>
        <Table.Cell key="room">
          {tableFormattingUtilities.stringOrEmpty(chair.address.room)}
        </Table.Cell>
        <Table.Cell key="phoneNumber">
          {tableFormattingUtilities.stringOrEmpty(chair.address.phoneNumber)}
        </Table.Cell>
        <Table.Cell key="phoneNumberMobile">
          {tableFormattingUtilities.stringOrEmpty(
            chair.address.phoneNumberMobile
          )}
        </Table.Cell>
      </Table.Row>
    );
  }

  renderChairsTableFooter() {
    return (
      <Table.Row>
        <Table.HeaderCell colSpan="14">
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={this.handleAddChairButtonClick}
          >
            <Icon name="university" />
            <Trans i18nKey="chairManagement-add-chair-button" />
          </Button>

          <Button
            floated="right"
            icon
            labelPosition="left"
            size="small"
            disabled={!this.state.selectedEntry}
            onClick={this.handleEditChairButtonClick}
          >
            <Icon name="edit" />
            <Trans i18nKey="chairManagement-edit-chair-button" />
          </Button>

          <Button
            floated="right"
            icon
            labelPosition="left"
            size="small"
            disabled={!this.state.selectedEntry}
            onClick={this.handleDeleteChairButtonClick}
          >
            <Icon name="trash" />
            <Trans i18nKey="chairManagement-delete-chair-button" />
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  handleAddChairButtonClick() {
    this.openAddChairModal();
  }

  handleEditChairButtonClick() {
    this.openEditChairModal();
  }

  async handleDeleteChairButtonClick() {
    const deletionResponse = await chairService.deleteChair(
      this.state.selectedEntry
    );

    console.log(deletionResponse);

    if (deletionResponse.status === 200) {
      this.props.toggleSuccessMessage(
        i18next.t("chairManagement-delete-chair-success-title"),
        i18next.t("chairManagement-delete-chair-success-message")
      );
    } else {
      this.props.toggleErrorMessage("Fehler", deletionResponse.error);
    }
  }

  openEditChairModal() {
    this.setState({
      editChairModalOpen: true
    });
  }
  closeEditChairModal() {
    this.setState({
      editChairModalOpen: false
    });
  }
  openAddChairModal() {
    this.setState({
      addChairModalOpen: true
    });
  }
  closeAddChairModal() {
    this.setState({
      addChairModalOpen: false
    });
  }

  handleClickOutside = evt => {
    this.setState({
      selectedEntry: null
    });
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    chairs: state.chair.chairs || []
  };
};

export default connect(mapStateToProps)(onClickOutside(ChairManagement));
