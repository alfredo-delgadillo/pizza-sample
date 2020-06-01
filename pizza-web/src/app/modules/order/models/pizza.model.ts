import { Topping } from './topping.model';

export class Pizza {
  constructor(
    private _id: number,
    private _picture: string,
    private _name: string,
    private _description: string) {
  }

  get id() {
    return this._id;
  }

  get picture(): string {
    return this._picture;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }

  private _toppings: Topping[];
  get toppings(): Topping[] {
    if (!this._toppings)
      this._toppings = [];
    return this._toppings;
  }
}