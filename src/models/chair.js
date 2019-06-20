import Adress from "./adress";

class Chair {
  constructor(chairValues) {
    console.log(chairValues);
    this.id = chairValues.id;
    this.name = chairValues.name || null;
    this.adress = new Adress(chairValues.address);
  }
}

export default Chair;
