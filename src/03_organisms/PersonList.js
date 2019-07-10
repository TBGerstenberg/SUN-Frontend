import i18next from "i18next";
import React, { Component } from "react";
import {
  Button,
  Card,
  Checkbox,
  Confirm,
  Icon,
  Image,
  List
} from "semantic-ui-react";
import maleAvatarImageSource from "../assets/images/christian.jpg";
import unsetGenderAvatarImageSource from "../assets/images/daniel.jpg";
import otherAvatarImageSource from "../assets/images/matt.jpg";
import femaleAvatarImageSource from "../assets/images/rachel.png";
import personChairRelationEnum from "../models/enumerations/personChairRelationEnum";

/**
 * A list of Persons that are currently employed or have applied to a chair.
 */
class PersonList extends Component {
  constructor(props) {
    super(props);

    const imageSources = [
      unsetGenderAvatarImageSource,
      maleAvatarImageSource,
      femaleAvatarImageSource,
      otherAvatarImageSource
    ];

    this.state = {
      confirmModalOpen: false,
      indexOfAppointedChairAdmin: null,
      imageSources: imageSources
    };
    this.deleteListItem = this.deleteListItem.bind(this);
    this.acceptListItem = this.acceptListItem.bind(this);
    this.changeListItem = this.changeListItem.bind(this);
    this.handleItemChangeConfirmed = this.handleItemChangeConfirmed.bind(this);
    this.handleItemChangeAborted = this.handleItemChangeAborted.bind(this);
    this.openConfirmModal = this.openConfirmModal.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
    this.renderConfirmModalHeader = this.renderConfirmModalHeader.bind(this);
    this.renderConfirmModalContent = this.renderConfirmModalContent.bind(this);
  }

  render() {
    const shallRenderPersons = this.props.persons;

    return (
      <>
        <Card color="blue" fluid>
          <Card.Content>
            <List floated="left" style={{ width: "100%" }}>
              {shallRenderPersons
                ? this.props.persons.map((item, index) => {
                    return (
                      <PersonListItem
                        imageSource={
                          this.state.imageSources[item.person.gender] || null
                        }
                        acceptable={this.props.itemsAcceptable}
                        removeable={this.props.itemsRemoveable}
                        changeable={this.props.itemsChangeable}
                        defaultChecked={item.chairAdmin}
                        item={item}
                        key={index}
                        itemId={index}
                        onAccept={index => {
                          this.acceptListItem(index);
                        }}
                        onDelete={index => {
                          this.deleteListItem(index);
                        }}
                        onChange={(index, confirmationCallback) => {
                          this.openConfirmModal(index);
                          this.setState({
                            indexOfItemWaitingForChangeConfirmation: index,
                            currentConfirmationCallback: confirmationCallback
                          });
                        }}
                      />
                    );
                  })
                : i18next.t("personList-no-items-placehodler")}
            </List>
          </Card.Content>
        </Card>

        <Confirm
          onConfirm={this.handleItemChangeConfirmed}
          onCancel={this.handleItemChangeAborted}
          onClose={this.handleItemChangeAborted}
          confirmButton={i18next.t(
            "personList-confirm-chairAdmin-change-button-label"
          )}
          cancelButton={i18next.t(
            "personList-cancel-chairAdmin-change-button-label"
          )}
          header={this.renderConfirmModalHeader()}
          content={this.renderConfirmModalContent()}
          open={this.state.confirmModalOpen}
        />
      </>
    );
  }

  /**
   * Opens a confirm modal to confirm the the change of checkbox on each Person in this list
   * Currently this component is being used to control chair-administration rights, which have
   * to be confirmed when changed.
   */
  openConfirmModal(indexOfAppointedChairAdmin) {
    this.setState({
      confirmModalOpen: true,
      indexOfAppointedChairAdmin: indexOfAppointedChairAdmin
    });
  }

  /**
   * Closes the modal to confirm the appointment or removal of chairAdmin Status
   * on a person.
   */
  closeConfirmModal() {
    this.setState({ confirmModalOpen: false });
  }

  /**
   * Fired when the confirmModal finishes with a positive result
   */
  handleItemChangeConfirmed() {
    const changingItemConfirmed = true;
    this.state.currentConfirmationCallback(changingItemConfirmed);
    this.changeListItem(this.state.indexOfAppointedChairAdmin);
    this.closeConfirmModal();
  }

  /**
   * Fired when the confirmModal finishes with a negative result
   */
  handleItemChangeAborted() {
    this.closeConfirmModal();
  }

  /**
   * Renders the header of the modal that asks for confirmation before appointing someone to be chairAdmin.
   */
  renderConfirmModalHeader() {
    if (
      this.props.persons &&
      this.props.persons.length > 0 &&
      this.state.indexOfAppointedChairAdmin != null
    ) {
      const personWasChairAdminBeforeBeingChanged = this.props.persons[
        this.state.indexOfAppointedChairAdmin
      ].chairAdmin;

      if (!personWasChairAdminBeforeBeingChanged) {
        return (
          i18next.t("personList-confirm-chairAdmin-appointed-content-1") +
          this.props.persons[this.state.indexOfAppointedChairAdmin].person
            .firstName +
          " " +
          this.props.persons[this.state.indexOfAppointedChairAdmin].person
            .lastName +
          " " +
          i18next.t("personList-confirm-chairAdmin-appointed-content-2")
        );
      } else {
        return (
          i18next.t("personList-confirm-chairAdmin-removed-content-1") +
          this.props.persons[this.state.indexOfAppointedChairAdmin].person
            .firstName +
          " " +
          this.props.persons[this.state.indexOfAppointedChairAdmin].person
            .lastName +
          " " +
          i18next.t("personList-confirm-chairAdmin-removed-content-2")
        );
      }
    } else {
      return null;
    }
  }

  /**
   * Renders personalized content for each inidividual that is being granted
   * chairAdmin rights. This notice contains messages to explain the ramifications
   * of appointing someone to be a chairAdmin.
   */
  renderConfirmModalContent() {
    if (
      this.props.persons &&
      this.props.persons.length > 0 &&
      this.state.indexOfAppointedChairAdmin != null
    ) {
      const personWasChairAdminBeforeBeingChanged = this.props.persons[
        this.state.indexOfAppointedChairAdmin
      ].chairAdmin;
      if (!personWasChairAdminBeforeBeingChanged) {
        return i18next.t("personList-confirm-chairAdmin-appointed-content-3");
      } else {
        return i18next.t("personList-confirm-chairAdmin-removed-content-3");
      }
    } else {
      return null;
    }
  }

  /**
   * Fired when an person in this list is "accepted" - currently used to "accept" a person as an employee.
   * @param {*} index - index of the person that was accepted within this list
   */
  acceptListItem(index) {
    let mutatedPersonChairRelations = [...this.props.persons];
    mutatedPersonChairRelations[index].active = true;
    this.props.onItemAdded(mutatedPersonChairRelations);
  }

  /**
   * Fired when an person in this list is "rejected" - currently used to "reject" a person as an applicant or remove employee-rights.
   * @param {*} index - index of the person that was rejected within this list
   */
  deleteListItem(index) {
    let mutatedPersonChairRelations = [...this.props.persons];
    mutatedPersonChairRelations.splice(index, 1);
    this.props.onItemDeleted(mutatedPersonChairRelations);
  }

  /**
   * Fired when an item in this list was confirmed to be modified. Currently used to set a chairAdmin
   * status on a person in this list.
   * @param {*} index - index of the person that was rejected within this list
   */
  changeListItem(index) {
    let mutatedPersonChairRelations = [...this.props.persons];
    mutatedPersonChairRelations[
      index
    ].chairAdmin = !mutatedPersonChairRelations[index].chairAdmin;
    this.props.onItemChanged(mutatedPersonChairRelations);
  }
}

/**
 * An Listitem representating a person that is employed or has applied to a chair.
 */
class PersonListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxChecked: props.defaultChecked
    };
  }

  render() {
    const props = this.props;
    return (
      <List.Item style={{ width: "100%" }}>
        {props.item.person.gender != null && (
          <List.Content floated="left">
            <Image avatar src={props.imageSource} />
          </List.Content>
        )}

        <List.Content verticalAlign="middle">
          <List.Content floated="left" verticalAlign="middle">
            <List.Content as="a" href={"/profile/" + props.item.personId}>
              {props.item.person.firstName} {props.item.person.lastName}
            </List.Content>
            <List.Content>
              {personChairRelationEnum[props.item.role]}
            </List.Content>
            <List.Content>
              {props.item.person.address ? props.item.person.address.email : ""}
            </List.Content>
          </List.Content>

          <List.Content
            floated="right"
            style={{ marginTop: "0px" }}
            verticalAlign="middle"
          >
            {props.changeable && (
              <span
                style={{
                  marginRight: "20px"
                }}
              >
                <Checkbox
                  label={i18next.t("personList-chairAdmin-checkbox-label")}
                  onClick={() => {
                    console.log(props.itemId);
                    props.onChange(props.itemId, () => {
                      this.setState({
                        checkboxChecked: !this.state.checkboxChecked
                      });
                    });
                  }}
                  onChange={(e, { value }) => {}}
                  checked={this.state.checkboxChecked}
                />
              </span>
            )}

            {props.removeable && (
              <Button
                icon
                size="small"
                color="red"
                circular
                onClick={() => {
                  props.onDelete(props.itemId);
                }}
              >
                <Icon name="trash" />
              </Button>
            )}
            {props.acceptable && (
              <Button
                icon
                size="small"
                color="green"
                circular
                onClick={() => {
                  props.onAccept(props.itemId);
                }}
              >
                <Icon name="check" />
              </Button>
            )}
          </List.Content>
        </List.Content>
      </List.Item>
    );
  }
}

export default PersonList;
