import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PizzaComponent } from './components/pizza/pizza.component';

const routes: Routes = [
  {     
    path: "",
    component: PizzaListComponent,
  },
  {
    path: "order-pizza/:id",
    component: PizzaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
