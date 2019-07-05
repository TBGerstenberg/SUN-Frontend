import i18next from "i18next";
import React, { Component } from "react";
import { Button, Card, Icon, Image, List } from "semantic-ui-react";
import personChairRelationEnum from "../models/enumerations/personChairRelationEnum";

class PersonList extends Component {
  constructor(props) {
    super(props);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.acceptListItem = this.acceptListItem.bind(this);
  }

  render() {
    const shallRenderPersons = this.props.persons;

    console.log("Rerendering personlist");
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
                        item={item}
                        key={index}
                        itemId={index}
                        onAccept={index => {
                          this.acceptListItem(index);
                        }}
                        onDelete={index => {
                          this.deleteListItem(index);
                        }}
                      />
                    );
                  })
                : i18next.t("personList-no-items-placehodler")}
            </List>
          </Card.Content>
        </Card>
      </>
    );
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
}

const PersonListItem = props => {
  return (
    <List.Item verticalAlign="middle" style={{ width: "100%" }}>
      <List.Content floated="left">
        <Image
          avatar
          src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
        />
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
        <List.Content floated="right" style={{ marginTop: "0px" }}>
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
