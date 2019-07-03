class PersonChairRelation {
  constructor(chairRelationValues) {
    this.chairId = chairRelationValues.chairId;
    this.personid = chairRelationValues.personId;
    this.isActive = chairRelationValues.isActive || false;
    this.chairAdmin = chairRelationValues.chairAdmin || false;
    this.role = chairRelationValues.role;
  }
}

export default PersonChairRelation;
