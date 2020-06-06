import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, merge, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, retry, startWith, scan, switchMap, combineLatest, debounceTime, tap, shareReplay } from 'rxjs/operators';
import { Pizza } from 'src/app/modules/order/models/pizza.model';
import { Topping } from 'src/app/modules/order/models/topping.model';
import { CartItem, StateTree } from 'src/app/modules/order/models/cartitem.model';
import { PizzaError } from '../../errors/pizzaerror.mode';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  pizzas: Observable<Array<Pizza>>;
  private baseUrl: string = "api/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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

  private stateTree$ = new BehaviorSubject<StateTree>(null);
  private checkoutTrigger$ = new BehaviorSubject<boolean>(false);
  private cartAdd$ = new Subject<CartItem>();
  private cartRemove$ = new Subject<CartItem>();

  private get cart$(): Observable<CartItem[]> {
    return merge(this.cartAdd$, this.cartRemove$).pipe(
      startWith([]),
      scan((acc: CartItem[], item: CartItem) => {
        if (item) {
          if (item.remove) {
            return [...acc.filter(i => i.id !== item.id)];
          }
          return [...acc, item];
        }
      })
    );
  }

  state$: Observable<StateTree> = this.stateTree$.pipe(
    switchMap(() => this.getOrders().pipe(
      combineLatest([this.cart$, this.checkoutTrigger$]),
      debounceTime(0),
    )),
    map(([store, cart, tot, checkout]: any) => ({ store, cart, tot, checkout })),
    tap(state => {
      if (state.checkout) {
        console.log('checkout', state);
      }
    }),

    // notify all components listening
    shareReplay(1)
  );

  public handleError<T>(err = null, result?: T) {
    if (err) {
      console.log(err);
      let message: string = 'Service Error';
      if (err instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        message = err.message;
        console.log('An error occurred:', err.message);
      } else if (err instanceof HttpErrorResponse) {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        message = err.error;
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }

      throw new PizzaError(message);
    }

    return empty();
  }

  //HTTP METHOD HELPERS
  private get<T>(url): Observable<T> {
    return this.http
      .get<T>(url)
      .pipe(
        retry(1), // optionally add the retry
        catchError(this.handleError));
  }  

  private post<T>(url: string, body: any, result?: T): Observable<T> {
    return this.http.post<T>(url, body, this.httpOptions)
      .pipe(
        retry(1),
        catchError(e => this.handleError<T>(e, result)));
  }

  //GET METHODS
  public getPizzas(): Observable<Pizza[]> {
    const url = `${this.baseUrl}pizzas`;
    return this.get<Pizza[]>(url);
  }

  public getPizza(id: number): Observable<Pizza> {
    const url = `${this.baseUrl}pizzas/${id}`;
    return this.http.get<Pizza>(url);
  }

  public getPizzaToppings(pizza: Pizza): Observable<Array<Topping>> {
    const url = `${this.baseUrl}pizzas/${pizza.id}/toppings`;
    return this.http.get<Topping[]>(url);
  }

  private getOrders(): Observable<CartItem[]> {
    const url = `${this.baseUrl}orders`;
    return this.get<CartItem[]>(url);
  }

  //POST METHODS
  public orderPizza(pizza: Pizza, selectedToppings: Topping[]): Observable<boolean> {
    const url = `${this.baseUrl}orders`;
    const body = { pizza: pizza, toppings: selectedToppings };
    return this.post<boolean>(url, body, false);
  }
}
