import Person from "../models/person";
class Account {
  constructor(accountValues) {
    this.id = accountValues.id;
    this.email = accountValues.email;
    this.admin = accountValues.admin;
    this.password = accountValues.password;
    this.person = new Person(accountValues.person);
  }

  isSuperAdmin() {
    return this.admin;
  }

  isEmployeeForChair(chairId) {
    console.log(this.person);
    console.log(chairId);

    return this.person.chairs.find(chair => {
      return chair.chairId === chairId;
    });
  }

  isAuthorOfPost(post) {
    return post.authorId === this.person.id;
  }
}

export default Account;
