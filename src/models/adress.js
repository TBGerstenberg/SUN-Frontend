class Adress {
  constructor(addressValues) {
    console.log(addressValues);
    this.city = addressValues.city || null;
    this.postCode = addressValues.postCode || null;
    this.street = addressValues.street || null;
    this.room = addressValues.room || null;
    this.email = addressValues.email || null;
  }
}

export default Adress;
