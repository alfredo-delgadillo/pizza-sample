export class Topping {
    constructor(private _id: number, private _name: string) {    
    }
    get id(){
      return this._id;
    }
    get name(){
      return this._name;
    }
  }