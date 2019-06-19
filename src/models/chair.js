import Adress from "./adress";

class Chair {
  constructor(chairValues) {
    this.name = chairValues.name;
    this.adress = new Adress(chairValues.adress);
  }
}

export default Chair;
