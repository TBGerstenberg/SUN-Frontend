import personChairRelationEnum from "./enumerations/personChairRelationEnum";
import Adress from "./adress";
import StudentStatus from "./studentStatus";

class Person {
  constructor(profileValues) {
    this.userId = profileValues.userId;
    this.id = profileValues.id;
    this.title = profileValues.title;
    this.gender = profileValues.gender;
    this.firstName = profileValues.firstName;
    this.lastName = profileValues.lastName;
    this.birthDate = profileValues.birthDate;
    this.address = new Adress(profileValues.address);
    this.studentStatus = new StudentStatus(profileValues.studentStatus);
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

  isEmployee() {
    return this.chairs.length !== 0;
  }

  isStudent() {
    return this.studentStatus != null;
  }

  hasAddress() {
    return this.address != null;
  }

  static getProfileLinkForId(personId) {
    return "/profile/" + personId;
  }
}

export default Person;
