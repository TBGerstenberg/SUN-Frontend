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

/**
 * Marks a skill as being selected
 */
function selectSkill(skill) {
  return { type: skillCatalogueConstants.SELECT_SKILL, skill: skill };
}

/**
 * Assigns a rting to a skill
 * @param {String} skill  - Skill to be rated
 * @param {Number} rating - Number describing the proficency level for that particular skill.
 */
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
