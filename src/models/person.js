import Adress from "./adress";
import personChairRelationEnum from "./enumerations/personChairRelationEnum";
import StudentStatus from "./studentStatus";

/**
 * Class representing a person as defined by the domain model.
 */
class Person {
  /**
   * Constructs a person from a given set of profileValues
   * @param {Object} accountValues - Object containting and id (Number), email (String), admin (boolean), password (string) and person(object @see models/person) key.
   * @returns constructed instance.
   */
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
    this.chairs = profileValues.chairs;
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

  /**
   * Checks wether or not a person is an employee in at least one chair
   */
  isEmployee() {
    return this.chairs.length !== 0;
  }

  /**
   * Statically wether a given person is an employee in at least one chair
   */
  static isEmployee(person) {
    const personActivelyWorksForChair = person.chairs.find(chairRelation => {
      return chairRelation.active === true;
    });

    return person.chairs.length > 0 && personActivelyWorksForChair;
  }

  /**
   * Checks wether or not a person is a student
   */
  isStudent() {
    return this.studentStatus != null;
  }

  /**
   * Checks wether or not a person is a student
   */
  hasAddress() {
    return this.address != null;
  }

  /**
   * Contructs a link to
   */
  static getProfileLinkForId(personId) {
    return "/profile/" + personId;
  }
}

export default Person;
