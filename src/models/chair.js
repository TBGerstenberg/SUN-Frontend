import Adress from "./adress";

class Chair {
  constructor(chairValues) {
    this.id = chairValues.id;
    this.name = chairValues.name || null;
    this.adress = new Adress(chairValues.address);
    this.persons = chairValues.persons;
  }
}

export default Chair;
