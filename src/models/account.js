import Person from "../models/person";
class Account {
  constructor(accountValues) {
    this.id = accountValues.id;
    this.email = accountValues.email;
    this.admin = accountValues.admin;
    this.password = accountValues.password;
    this.person = new Person(accountValues.person);
  }

  /** Checks wether or not an account is super-admin for the system  */
  isSuperAdmin() {
    return this.admin;
  }

  /** Checks wether of not a person is employed at a chair */
  isEmployeeForChair(chairId) {
    return this.person.chairs.find(chair => {
      return chair.chairId === chairId && chair.isActive === true;
    });
  }

  /** Checks wether of not a person is employed at a chair, without having to instantiate an account-object  */
  static isEmployeeForChair(person, chairId) {
    return person.chairs.find(chair => {
      return chair.chairId === chairId && chair.isActive === true;
    });
  }

  /** Checks wether or not a person is author of a post */
  isAuthorOfPost(post) {
    return post.authorId === this.person.id;
  }

  /** Checks wether or not a person is admin of a chair */
  isChairAdmin(chairId) {
    const personChairRelationExists = this.person.chairs.find(
      personChairRelation => {
        return (personChairRelation.chairId = chairId);
      }
    );

    return (
      personChairRelationExists && personChairRelationExists.chairAdmin === true
    );
  }
}

export default Account;
