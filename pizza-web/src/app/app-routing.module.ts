import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {     
    path: "order",
    loadChildren: "./modules/order/order.module#OrderModule"
  },
  {     
    path: "home",
    loadChildren: "./modules/home/home.module#HomeModule"
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //, { enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
