class Adress {
  constructor(addressValues) {
    this.city = addressValues.city || null;
    this.postCode = addressValues.postCode || null;
    this.street = addressValues.street || null;
    this.room = addressValues.room || null;
    this.email = addressValues.email || null;
    this.phoneNumber = addressValues.phoneNumber || null;
    this.phoneNumberMobile = addressValues.phoneNumberMobile || null;
  }
}

export default Adress;
