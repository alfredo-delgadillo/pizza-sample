import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PizzaService } from 'src/app/core/services/http/pizza.service';
import { PizzaComponent } from './components/pizza/pizza.component';
import { ToppingComponent } from './components/topping/topping.component';

@NgModule({
  declarations: [PizzaListComponent, PizzaComponent, ToppingComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ],
  providers: [PizzaService]
})
export class OrderModule { }
