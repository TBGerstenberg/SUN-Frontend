import Person from "../models/person";
class Account {
  constructor(accountValues, person) {
    this.id = accountValues.id;
    this.email = accountValues.email;
    this.admin = accountValues.admin;
    this.password = accountValues.password;
    this.person = new Person(accountValues.person);
  }
}

export default Account;
