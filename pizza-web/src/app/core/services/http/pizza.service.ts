import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, find } from 'rxjs/operators';
import { Pizza } from 'src/app/modules/order/models/pizza.model';
import { Topping } from 'src/app/modules/order/models/topping.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  pizzas: Observable<Array<Pizza>>;
  private baseUrl: string = "api/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //'Authorization': 'token'
    })
  };

  constructor(private http: HttpClient) {
    /*let list = [
      new Pizza(1, `${this.baseUrl}/270000/t2/pizza-1532881335pCX.jpg`, "Hawaiian", "Description"),
      new Pizza(2, `${this.baseUrl}/300000/t2/pizza-1557512546UWH.jpg`, "Peperoni", "Description"),
      new Pizza(3, `${this.baseUrl}/120000/t2/pizza-1431957490WiY.jpg`, "Irish", "Description"),
      new Pizza(4, `${this.baseUrl}/40000/t2/fresh-pizza.jpg`, "Strogonoff", "Description"),
      new Pizza(5, `${this.baseUrl}/340000/t2/pizza-food-picture-1589652491vsj.jpg`, "Corn", "Description"),
      new Pizza(6, `${this.baseUrl}/10000/t2/pizza-topping-87127713332743Vt.jpg`, "Hotdog", "Description")];
    this.pizzas = of(list);*/
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      console.error(error);
      return of(result as T);
    };
  }

  public getPizzas(): Observable<Pizza[]> {
    const url = `${this.baseUrl}pizzas`;
    return this.http.get<Pizza[]>(url)
      .pipe(
        catchError(this.handleError<Pizza[]>(`getPizzas`, []))
      );
  }

  public getPizza(id: number): Observable<Pizza> {
    const url = `${this.baseUrl}pizzas/${id}`;
    return this.http.get<Pizza>(url)
      .pipe(
        catchError(this.handleError<Pizza>(`getPizza`, null))
      );
  }

  public getPizzaToppings(pizza: Pizza): Observable<Array<Topping>> {
    const url = `${this.baseUrl}pizzas/${pizza.id}/toppings`;
    return this.http.get<Topping[]>(url)
      .pipe(
        catchError(this.handleError<Topping[]>(`getPizzaToppings`, []))
      );
  }
  
  public orderPizza(pizza: Pizza, selectedToppings: Topping[]): Observable<boolean> {
    const url = `${this.baseUrl}orders`;
    const body = { pizza: pizza, toppings: selectedToppings };
    return this.http.post<boolean>(url, body, this.httpOptions)
      .pipe(
        map(d=>d),
        catchError(this.handleError<boolean>(`orderPizza`, false))
      );
  }
}
