import React from "react";
import { withTranslation } from "react-i18next";
import { List, Segment, Button, Grid } from "semantic-ui-react";
import personChairRleationEnum from "../models/enumerations/personChairRelationEnum";
import ChairSelectionDropdown from "../03_organisms/ChairSelectionDropdown";
import RoleSelectionDropdown from "../03_organisms/RoleSelectionDropdown";

class ChairRoleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personChairRelations: props.items || [],
      chairs: props.chairs || [],
      userId: props.userId,
      currentlySelectedRole: null,
      currentlySelectedChair: null
    };

    this.handleAddRoleButtonClick = this.handleAddRoleButtonClick.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
  }

  handleAddRoleButtonClick() {
    const newPersonChairRelation = {
      personId: this.state.userId,
      chairId: this.state.currentlySelectedChair,
      role: this.state.currentlySelectedRole,
      active: true,
      chairAdmin: false
    };

    this.addListItem(newPersonChairRelation);
  }

  render() {
    console.log(this.state.currentlySelectedRole);
    return (
      <div className="chairRoleList-container">
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <List divided animated verticalAlign="middle">
                  {this.renderListItems(this.state.personChairRelations)}
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3} verticalAlign="bottom" textAlign="left">
              <Grid.Column width={6}>
                <RoleSelectionDropdown
                  onChange={role => {
                    this.setState({ currentlySelectedRole: role });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <ChairSelectionDropdown
                  chairs={this.props.chairs}
                  onChange={chair => {
                    this.setState({ currentlySelectedChair: chair });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                <Button onClick={this.handleAddRoleButtonClick}>
                  Hinzufügen
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }

  renderListItems(items) {
    if (Array.isArray(items)) {
      if (items.length === 0) {
        return <span> Keine Lehrstuhlzugehörigkeit angegeben. </span>;
      }

      let renderedListItems = items.map((personChairRelation, index) => {
        const chairWithId = this._findChairWithId(personChairRelation.chairId);
        return (
          <ChairRoleListItem
            itemClickHandler={() => {}}
            itemDeleteHandler={() => {
              this.deleteListItem(index);
            }}
            key={index}
            role={personChairRleationEnum[personChairRelation.role]}
            chair={chairWithId ? chairWithId.name : "Lehrstuhl nicht vorhanden"}
          />
        );
      });
      return renderedListItems;
    }
  }

  addListItem(personChairRelationValues) {
    let mutatedPersonChairRelations = [...this.state.personChairRelations];

    const personChairRelation = {
      personId: personChairRelationValues.personId,
      chairId: personChairRelationValues.chairId,
      role: personChairRelationValues.role,
      active: personChairRelationValues.active,
      chairAdmin: personChairRelationValues.chairAdmin
    };

    mutatedPersonChairRelations.push(personChairRelation);
    this.setState({ personChairRelations: mutatedPersonChairRelations });
    this.props.onChange(mutatedPersonChairRelations);
  }

  deleteListItem(index) {
    let mutatedPersonChairRelations = [...this.state.personChairRelations];
    mutatedPersonChairRelations.splice(index);
    this.props.onChange(mutatedPersonChairRelations);
    this.setState({ personChairRelations: mutatedPersonChairRelations });
  }

  _findChairWithId(id) {
    const chairWithId = this.state.chairs.find(chair => {
      return chair.id === id;
    });
    return chairWithId;
  }
}

const ChairRoleListItem = props => {
  return (
    <List.Item onClick={props.itemClickHandler} className="chairRoleListItem">
      <List.Content floated="left">
        <div className="chairRoleList-container">
          <span>{props.role}</span>
          <span> bei Lehrstuhl </span>
        </div>
      </List.Content>
      <List.Content floated="left">
        <span>{props.chair}</span>
      </List.Content>
      <List.Content floated="right">
        <Button
          floated="right"
          type="button"
          onClick={props.itemDeleteHandler}
          icon="trash"
          color="grey"
          size="tiny"
        />
      </List.Content>
    </List.Item>
  );
};

// extended main view with translate hoc
export default withTranslation()(ChairRoleList);
