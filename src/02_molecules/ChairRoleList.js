import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { Button, Grid, List, Segment } from "semantic-ui-react";
import ChairSelectionDropdown from "../03_organisms/ChairSelectionDropdown";
import RoleSelectionDropdown from "../03_organisms/RoleSelectionDropdown";
import personChairRleationEnum from "../models/enumerations/personChairRelationEnum";

/**
 * Renders a List of relations a person can have towards a chair - when he/she is employed or has applied to them
 */
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

  /**
   * Adds a role to the list of personChairRelations rendered by this list
   */
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

            {this.props.itemsAddable && (
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
                  <Button onClick={this.handleAddRoleButtonClick} type="button">
                    {i18next.t("chairRoleList-add-role-button-label")}
                  </Button>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Segment>
      </div>
    );
  }

  /**
   * Renders the Items of this List
   * @param {Array of PersonChairRelations} items - PersonChairRleations
   */
  renderListItems(items) {
    if (Array.isArray(items)) {
      if (items.length === 0) {
        return <span> {i18next.t("chairRoleList-no-items-placeholder")} </span>;
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
            chair={
              chairWithId
                ? chairWithId.name
                : i18next.t("chairRoleList-chair-does-not-exist-label")
            }
          />
        );
      });
      return renderedListItems;
    }
  }

  /**
   * Adds a new Object to the list of personChairRelation
   * @param {Object} personChairRelationValues
   */
  addListItem(personChairRelationValues) {
    let mutatedPersonChairRelations = [...this.state.personChairRelations];

    const personChairRelation = {
      personId: personChairRelationValues.personId,
      chairId: personChairRelationValues.chairId,
      role: Number(personChairRelationValues.role),
      active: personChairRelationValues.active,
      chairAdmin: personChairRelationValues.chairAdmin
    };

    mutatedPersonChairRelations.push(personChairRelation);
    this.setState({ personChairRelations: mutatedPersonChairRelations });
    this.props.onChange(mutatedPersonChairRelations);
  }

  /**
   * Deletes an item at a given - zero based - index in this list
   * @param {Number} index - Index of the object that shall be deleted
   */
  deleteListItem(index) {
    let mutatedPersonChairRelations = [...this.state.personChairRelations];
    mutatedPersonChairRelations.splice(index, 1);
    this.props.onChange(mutatedPersonChairRelations);
    this.setState({ personChairRelations: mutatedPersonChairRelations });
  }

  /**
   * Finds a chair with a given ID in the list of personChairRelations
   * @param {*} id
   */
  _findChairWithId(id) {
    const chairWithId = this.state.chairs.find(chair => {
      return chair.id === id;
    });
    return chairWithId;
  }
}

/**
 * Component that renders an individual item in the list of personChairRelations
 */
const ChairRoleListItem = props => {
  return (
    <List.Item onClick={props.itemClickHandler} className="chairRoleListItem">
      <List.Content floated="left">
        <div className="chairRoleList-container">
          <span>{props.role}</span>
          <span> {i18next.t("chairRoleList-for-chair-label")} </span>
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
