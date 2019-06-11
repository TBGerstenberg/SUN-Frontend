import { skillCatalogueConstants } from "../_constants";

/**
 * Adds a Skill to the skillcatalogue in Redux
 * @param {String} skill - name of the skill
 */
function addSkill(skill) {
  return { type: skillCatalogueConstants.ADD_SKILL, skill: skill };
}

/**
 * Removes a Skill from the skillcatalogue
 * @param {String} skill - name of the skill
 */
function removeSkill(skill) {
  return { type: skillCatalogueConstants.REMOVE_SKILL, skill: skill };
}

function selectSkill(skill) {
  return { type: skillCatalogueConstants.SELECT_SKILL, skill: skill };
}

function rateSkill(skill, rating) {
  return {
    type: skillCatalogueConstants.RATE_SKILL,
    skill: skill,
    rating: rating
  };
}

const skillCatalogueActions = {
  addSkill,
  removeSkill,
  selectSkill,
  rateSkill
};

export default skillCatalogueActions;
