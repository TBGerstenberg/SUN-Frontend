/**
 * Class representing an Address - as defined by the domain model.
 * merely serving as a data-container in this client.
 */
class Adress {
  /**
   * Constructs an Address-Object
   * @param {object} addressValues - Object containing a city (String), postCode (String), street (String), room (String), email (String), phoneNumber (String), phoneNumberMobile (String)
   * @returns constructed instance.
   */
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
