import { skillCatalogueConstants } from "../_constants";

const initialState = {
  skills: [],
  ratings: []
};

/**
 * Reducer that reacts to (inter) actions with the skillcatalogue-widget and decides how incoming actions like "ADD_SKILL" or "RATE_SKILL" shall
 * be written into the redux store.
 * @param {} state
 * @param {*} action
 */
const skillCatalogueReducer = (state = initialState, action) => {
  switch (action.type) {
    case skillCatalogueConstants.ADD_SKILL: {
      const extendedSkills = state.skills.concat([action.skill]);
      const extendedRatings = state.ratings.concat(["UNRATED"]);
      return {
        ...state,
        skills: extendedSkills,
        ratings: extendedRatings
      };
    }

    case skillCatalogueConstants.REMOVE_SKILL:
      {
        const index = state.skills.indexOf(action.skill);
        if (index > -1) {
          const skillsCopy = [...state.skills];
          const ratingsCopy = [...state.ratings];
          skillsCopy.splice(index, 1);
          ratingsCopy.splice(index, 1);
          return {
            ...state,
            skills: skillsCopy,
            ratings: ratingsCopy
          };
        }
      }
      break;

    case skillCatalogueConstants.RATE_SKILL:
      {
        const indexOfSkill = state.skills.indexOf(action.skill);
        if (indexOfSkill > -1) {
          const changedRatings = state.ratings.copyWithin(
            0,
            state.ratings.length
          );
          changedRatings[indexOfSkill] = action.rating;
          return { ...state, ratings: changedRatings };
        }
      }
      break;

    case skillCatalogueConstants.SELECT_SKILL:
      return {
        ...state,
        currentlySelectedSkill: action.skill
      };
    default:
      return state;
  }
};

export default skillCatalogueReducer;
