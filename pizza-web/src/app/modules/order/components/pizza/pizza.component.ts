import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaService } from 'src/app/core/services/http/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { PizzaError } from 'src/app/core/errors/pizzaerror.mode';
import { ProgressService } from 'src/app/core/services/ui/progress.service';

@Component({
  selector: 'order-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  private _pizza: Pizza;
  private _availableToppings: Topping[];
  private _selectedToppings: Topping[];

  isSavingOrder: boolean = false;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private service: PizzaService,
    private progress: ProgressService,
    vcr: ViewContainerRef) {
    progress.viewContainerRef = vcr;
  }

  ngOnInit() {
    const id: number = +this.activeRouter.snapshot.paramMap.get("id");
    this.service.getPizza(id)
      .subscribe(
        data => {
          this._pizza = data;
          this._selectedToppings = [];
          this.service.getPizzaToppings(this._pizza)
            .subscribe(
              data => this._availableToppings = data
            );
        }
      );
  }

  get pizza() {
    if (this._pizza)
      return this._pizza;
    else
      return new Pizza(0, null, "Not Defined", "");
  }

  get pizzaToppings(): Observable<Topping[]> {
    if (this._selectedToppings)
      return of(this._selectedToppings);
    else
      return of(Array<Topping>());
  }

  get toppings(): Observable<Topping[]> {
    return of(this._availableToppings);
  }

  addTopping(event: MouseEvent, id: number) {
    event.preventDefault();
    if (this._selectedToppings) {
      let data: Topping = this.findTopping(id);
      this.addToppingImpl(data);
    }
  }

  removeTopping(event: MouseEvent, id: number) {
    event.preventDefault();
    if (this._selectedToppings) {
      let data: Topping = this.findTopping(id);
      this.removeToppingImpl(data);
    }
  }

  findTopping(id: number): Topping {
    let data: Topping;
    this.toppings
      .pipe(map(t => t.find(d => d.id === id)))
      .subscribe(
        found => data = found);
    return data;
  }

  addToppingImpl(topping: Topping) {
    if (topping) {
      this._selectedToppings.push(topping);
    } else {
      //Notify console when passed empty topping.
      console.error('Error! addTopping not allowed for an empty object!');
    }
  }

  removeToppingImpl(topping: Topping) {
    if (topping) {
      const index = this._selectedToppings.indexOf(topping, 0);
      if (index > -1) {
        this._selectedToppings.splice(index, 1);
      }
    } else {
      //Notify console when passed empty topping.
      console.error('Error! removeTopping not allowed for an empty object!');
    }
  }

  saverOrder() {
    this.progress.showProgress();
    this.service.orderPizza(this._pizza, this._selectedToppings)
      .subscribe(res => {
        this.progress.hideProgress();
        this.progress.showMessage("Order placed successfully");
        this.router.navigateByUrl('/order');
      },
        (err: PizzaError) => {
          this.progress.hideProgress();
          this.progress.showMessage(err.message, true);
        });
  }
}