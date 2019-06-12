import personChairRelationEnum from "./enumerations/personChairRelationEnum";

class Profile {
  constructor(profileValues) {
    this.userId = profileValues.userId;
    this.title = profileValues.title;
    this.gender = profileValues.gender;
    this.firstName = profileValues.firstName;
    this.lastName = profileValues.lastName;
    this.birthDate = profileValues.birthDate;
    this.address = profileValues.address;
    this.studentStatus = profileValues.studentStatus;
    this.employeeStatus = profileValues.employeeStatus;
    this.chairs = this.buildPersonChairRelations(profileValues.chairs);
    this.skills = profileValues.skills;
  }

  /**
   * Creates an array of person-chair-relation Objects from a given set of chair-Ids
   * @param chairIds - Array of chair-ids that this person belongs to
   */
  buildPersonChairRelations(chairIds) {
    const personChairRelations = [];

    chairIds.forEach((element, index) => {
      personChairRelations.push({
        personId: this.userId,
        chairId: chairIds[index],
        role: personChairRelationEnum.OTHER,
        active: false,
        chairAdmin: false
      });
    });

    this.chairs = personChairRelations;
  }
}

export default Profile;
