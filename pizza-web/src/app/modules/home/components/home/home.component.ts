import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/core/services/http/pizza.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(service: PizzaService) { 
    service.getPizzas();
  }

  ngOnInit() {
  }

}
