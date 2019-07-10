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
                        onChange={index => {
                          this.openConfirmModal(index);
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
          content={this.renderConfirmModalContent()}
          open={this.state.confirmModalOpen}
        />
      </>
    );
  }

  openConfirmModal(indexOfAppointedChairAdmin) {
    this.setState({
      confirmModalOpen: true,
      indexOfAppointedChairAdmin: indexOfAppointedChairAdmin
    });
  }

  closeConfirmModal() {
    this.setState({ confirmModalOpen: false });
  }

  handleItemChangeConfirmed(index) {
    this.changeListItem(index);
    this.closeConfirmModal();
  }

  handleItemChangeAborted() {
    this.closeConfirmModal();
  }

  renderConfirmModalContent() {
    if (
      this.props.persons &&
      this.props.persons.length > 0 &&
      this.state.indexOfAppointedChairAdmin
    ) {
      return (
        i18next.t("personList-confirm-chairAdmin-content-1") +
        this.props.persons[this.state.indexOfAppointedChairAdmin].name +
        i18next.t("personList-confirm-chairAdmin-content-2")
      );
    } else {
      return null;
    }
  }

  acceptListItem(index) {
    let mutatedPersonChairRelations = [...this.props.persons];
    mutatedPersonChairRelations[index].active = true;
    this.props.onItemAdded(mutatedPersonChairRelations);
  }

  deleteListItem(index) {
    let mutatedPersonChairRelations = [...this.props.persons];
    mutatedPersonChairRelations.splice(index, 1);
    this.props.onItemDeleted(mutatedPersonChairRelations);
  }

  changeListItem(index) {
    let mutatedPersonChairRelations = [...this.props.persons];
    mutatedPersonChairRelations[
      index
    ].chairAdmin = !mutatedPersonChairRelations[index].chairAdmin;
    this.props.onItemChanged(mutatedPersonChairRelations);
  }
}

class PersonListItem extends React.Component {
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
                  onClick={() => {}}
                  onChange={(e, { value }) => {
                    props.onChange(props.itemId, value);
                  }}
                  defaultChecked={props.defaultChecked}
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
