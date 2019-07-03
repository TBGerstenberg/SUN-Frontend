import React, { Component } from "react";
import { Card, Image, List } from "semantic-ui-react";
import personChairRelationEnum from "../models/enumerations/personChairRelationEnum";

class PersonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: props.persons || []
    };
  }

  render() {
    return (
      <Card color="blue">
        <Card.Content>
          <List floated="left">
            {this.state.persons.map((item, index) => {
              return <PersonListItem item={item} key={index} />;
            })}
          </List>
        </Card.Content>
      </Card>
    );
  }
}

const PersonListItem = props => {
  return (
    <List.Item>
      <Image
        avatar
        src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
      />
      <List.Content>
        <List.Header as="a" href={"/profile/" + props.item.personId}>
          {props.item.person.firstName} {props.item.person.lastName}
        </List.Header>
        <List.Description>
          {personChairRelationEnum[props.item.role]}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default PersonList;
