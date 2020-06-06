import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PizzaService } from 'src/app/core/services/http/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { PizzaError } from 'src/app/core/errors/pizzaerror.mode';
import { ProgressService } from 'src/app/core/services/ui/progress.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  pizzas: Observable<Array<Pizza>>;

  constructor(private service: PizzaService,
    private progress: ProgressService,
    private vcr: ViewContainerRef) {
      progress.viewContainerRef = vcr;
  }

  ngOnInit() {
  }

  listPizzas() {
    this.progress.showProgress();
    this.service.getPizzas()
      .subscribe(response => {
        this.progress.hideProgress();
        this.pizzas = of(response);
      },
        (err: PizzaError) => {
          this.progress.hideProgress();
          this.progress.showMessage(err.message, true);
        });
  }

}
