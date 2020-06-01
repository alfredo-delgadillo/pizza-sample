import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PizzaService } from 'src/app/core/services/http/pizza.service';
import { Router } from '@angular/router';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  private _showPanel: boolean = false;
  pizzas: Observable<Array<Pizza>>;

  constructor(private service: PizzaService, private router: Router) {
  }

  ngOnInit() {
  }

  get isPlacingOrder() {
    return this._showPanel;
  }

  placeOrder() {
    this.pizzas = this.service.getPizzas();
  }

  order(pizza: Pizza) {
    this._showPanel = true;
    this.router.navigateByUrl('/order/order-pizza', { state: pizza });
  }
}
