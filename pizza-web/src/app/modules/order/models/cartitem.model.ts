export interface CartItem {
  id?: number;
  remove?: boolean;
}

export interface StateTree {
    store: CartItem[];
    cart: CartItem[];
    checkout: boolean;
  };