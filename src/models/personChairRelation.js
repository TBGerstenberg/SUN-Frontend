/**
 * Class representing a relation between a person and a chair
 * NODE: Currently only used as a data container
 */
class PersonChairRelation {
  /**
   * Constructs a personChairRelation from a given set of values.
   * @param {Object} chairRelationValues - Object containting a  chairId (Number, unique ID of the chair), perosnId (Number, UniqueID of the person that has a relation of the chair, )
   * @returns constructed instance.
   */
  constructor(chairRelationValues) {
    this.chairId = chairRelationValues.chairId;
    this.personid = chairRelationValues.personId;
    this.isActive = chairRelationValues.isActive || false;
    this.chairAdmin = chairRelationValues.chairAdmin || false;
    this.role = chairRelationValues.role;
  }
}

export default PersonChairRelation;
