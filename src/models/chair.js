import Adress from "./adress";

/**
 * Class representing a chair
 */
class Chair {
  /**
   * Constructs a chair object from a given set of chairValues
   * @param {Object} chairValues - Object containting and id (Number), name ( name of the chair - String), adress (@see /src/models/adress ) and persons (array of persons @see /src/models/person ,
   * @returns constructed instance.
   */
  constructor(chairValues) {
    this.id = chairValues.id;
    this.name = chairValues.name || null;
    this.adress = new Adress(chairValues.address);
    this.persons = chairValues.persons;
  }

  /**
   * Constructs a URL fragment linking to the chair with a given ID
   */
  static getChairPageLinkForId(chairId) {
    return "/chair/" + chairId;
  }
}

export default Chair;
