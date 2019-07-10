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
import unsetGenderAvatarImageSource from "../assets/images/chair_avatar.png";
import maleAvatarImageSource from "../assets/images/christian.jpg";
import otherAvatarImageSource from "../assets/images/matt.jpg";
import femaleAvatarImageSource from "../assets/images/rachel.png";
import personChairRelationEnum from "../models/enumerations/personChairRelationEnum";

class PersonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmModalOpen: false,
      indexOfAppointedChairAdmin: null
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

const PersonListItem = props => {
  console.log(props.item);
  return (
    <List.Item style={{ width: "100%" }}>
      <List.Content floated="left">
        {
          // Person has not set its gender, render a placeholder
        }
        {props.item.person.gender && props.item.person.gender === 0 && (
          <Image avatar src={unsetGenderAvatarImageSource} />
        )}
        {
          // Person is male, display a male avatar
        }
        {props.item.person.gender && props.item.person.gender === 1 && (
          <Image avatar src={maleAvatarImageSource} />
        )}
        {
          // Person is male, display a female avater
        }
        {props.item.person.gender && props.item.person.gender === 2 && (
          <Image avatar src={femaleAvatarImageSource} />
        )}
        {
          // Person has selected "other" as his / her gender, display a more neutral avatar
        }
        {props.item.person.gender && props.item.person.gender === 3 && (
          <Image avatar src={otherAvatarImageSource} />
        )}
      </List.Content>

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
};

export default PersonList;
