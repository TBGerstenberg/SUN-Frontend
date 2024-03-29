import i18next from "i18next";
import React from "react";
import { List, Segment } from "semantic-ui-react";
import "./SkillCatalogue.css";
import SkillCatalogueItem from "./SkillCatalogueItem";

/**
 * Renders a list of Skill-Items and attaches a clickhandler to each one of them
 * @param skills - Array of Strings describing skils
 * @param onItemClickHandler - event-handler function that shall be called when an item is clicked. Signature clickhandlerFunction<index of the skill in catalogue that was clicked>)
 */
const renderListItems = (
  skills,
  onItemClickHandler,
  onItemDeleteHandler,
  onItemRateHandler
) => {
  if (Array.isArray(skills)) {
    if (skills.length === 0) {
      return (
        <span> {i18next.t("complete-profile-skill-input-no-skills-yet")}</span>
      );
    }

    let renderedListItems = skills.map((skill, index) => {
      const itemClickHandler = () => {
        return onItemClickHandler(skill);
      };

      const itemDeleteHandler = () => {
        return onItemDeleteHandler(skill);
      };

      const itemRateHandler = (itemProps, proposedRating) => {
        return onItemRateHandler(itemProps, proposedRating, skill);
      };

      return (
        <SkillCatalogueItem
          itemClickHandler={itemClickHandler}
          itemDeleteHandler={itemDeleteHandler}
          itemRateHandler={itemRateHandler}
          displayName={skill}
          key={index}
        />
      );
    });

    return renderedListItems;
  }
};

const SkillCatalogue = props => {
  return (
    <div className="skillCatalogue-container">
      <Segment>
        <List divided animated verticalAlign="middle">
          {renderListItems(
            props.items,
            props.onItemClicked,
            props.onItemDelete,
            props.onItemRate
          )}
        </List>
      </Segment>
    </div>
  );
};

export default SkillCatalogue;
