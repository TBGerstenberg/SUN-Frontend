import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Field, reduxForm } from "redux-form";
import { chairActions } from "../redux/_actions";
import { Button, Icon, Table, Modal } from "semantic-ui-react";
import i18next from "i18next";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";

class ChairManagement extends React.Component {
  componentWillMount() {
    this.props.dispatch(chairActions.getAllChairs());
  }

  constructor(props) {
    super(props);
    this.state = { visible: false, selectedEntry: null };
    this.renderChairsTableRow = this.renderChairsTableRow.bind(this);
    this.renderChairsTableHeader = this.renderChairsTableHeader.bind(this);
    this.renderChairsTableFooter = this.renderChairsTableFooter.bind(this);
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
          >
            <Icon name="trash" />
            <Trans i18nKey="chairManagement-delete-chair-button" />
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    chairs: state.chair.chairs || []
  };
};

export default withTranslation()(connect(mapStateToProps)(ChairManagement));
