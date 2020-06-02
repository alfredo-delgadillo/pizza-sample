import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {     
    path: "order",
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
  },
  {     
    path: "home",
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
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
