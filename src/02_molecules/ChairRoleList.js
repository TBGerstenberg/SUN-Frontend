import React from "react";
import { withTranslation } from "react-i18next";
import { List, Segment, Button } from "semantic-ui-react";
import personChairRleationEnum from "../models/enumerations/personChairRelationEnum";
import ChairSelectionDropdown from "../03_organisms/ChairSelectionDropdown";

class ChairRoleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personChairRelations: props.personChairRelations
    };
  }

  renderListItems(items, onItemClickHandler, onItemDeleteHandler) {
    if (Array.isArray(items)) {
      if (items.length === 0) {
        return <span> Keine Lehrstuhlzugehörigkeit angegeben. </span>;
      }

      let renderedListItems = items.map((personChairRelation, index) => {
        return (
          <ChairRoleListItem
            itemClickHandler={() => {}}
            itemDeleteHandler={() => {
              let mutatedpersonChairRelations = this.state.personChairRelations;
              mutatedpersonChairRelations[index] = null;
              this.setState({
                personChairRelations: mutatedpersonChairRelations
              });
            }}
            personChairRelation={personChairRelation}
            key={index}
          />
        );
      });

      return renderedListItems;
    }
  }

  render() {
    const props = this.props;
    return (
      <div className="skillCatalogue-container">
        <Segment>
          <List divided animated verticalAlign="middle">
            {this.renderListItems(
              props.items,
              props.onItemClicked,
              props.onItemDelete
            )}
          </List>

          <ChairSelectionDropdown />
          <Button />
        </Segment>
      </div>
    );
  }
}

const ChairRoleListItem = props => {
  console.log(props);
  return (
    <List.Item onClick={props.itemClickHandler} className="skillCatalogueItem">
      <List.Content floated="left">
        <div className="chairRoleList-container">
          <span>{personChairRleationEnum[props.personChairRelation.role]}</span>
        </div>
      </List.Content>
      <List.Content floated="right">
        {props.personChairRelation.chair}
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
