class Account {
  constructor(accountValues, person) {
    this.email = accountValues.email;
    this.admin = accountValues.admin;
    this.password = accountValues.password;
    this.person = person;
  }
}

export default Account;
