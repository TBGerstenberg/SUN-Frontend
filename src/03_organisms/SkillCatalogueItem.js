import React from "react";
import { Rating, List, Button } from "semantic-ui-react";
import "./SkillCatalogueItem.css";

const SkillCatalogueItem = props => {
  return (
    <List.Item onClick={props.itemClickHandler} className="skillCatalogueItem">
      <List.Content floated="left">
        <div className="skillCatalogueItem-container">
          <span>{props.displayName}</span>
        </div>
      </List.Content>
      <List.Content floated="right">
        <Rating
          icon="star"
          defaultRating={0}
          maxRating={5}
          clearable
          onRate={props.itemRateHandler}
        />
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

export default SkillCatalogueItem;
