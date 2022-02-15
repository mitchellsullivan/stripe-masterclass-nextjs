import {CartAction, CartActionKind, CartState} from "./cart-context";
import {ShopProduct} from "../lib/data-utils";
import Shop from "../pages/shop";

const storeCartItems = (cartItems) => {
  if (typeof window !== "undefined") {
    const cart = cartItems.length > 0 ? cartItems : [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

export const sumItems = (cartItems: ShopProduct[]): { itemCount: number; total: number } => {
  storeCartItems(cartItems);
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity , 0),
    total: cartItems.reduce((total, prod) => total + (prod.price * prod.quantity), 0)
  }
}

export function cartReducer(state: CartState, action: CartAction) {
  const {type, payload} = action;

  switch(type) {
    case CartActionKind.ADD_ITEM: {
      console.log("called add");
      // check if item is in cart
      if (!state.cartItems.find(item => item.id === payload?.id)) {
        state.cartItems.push({
          ...payload,
          quantity: 1,
        })
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems)
      }
    }
    case CartActionKind.INCREASE: {

      const cartItems = [...state.cartItems];
      const increaseIndex = cartItems.findIndex(item => item.id === payload?.id);
      const newItem = {...cartItems[increaseIndex]};
      newItem.quantity = newItem.quantity + 1;
      cartItems[increaseIndex] = newItem;

      console.log(cartItems);

      return {
        ...state,
        cartItems,
        ...sumItems(cartItems),
      }
    }
    case CartActionKind.DECREASE: {

      const cartItems = [...state.cartItems];
      const increaseIndex = cartItems.findIndex(item => item.id === payload?.id);
      const newItem = {...cartItems[increaseIndex]};

      if (newItem.quantity > 1) {
        newItem.quantity = newItem.quantity - 1;
      }

      cartItems[increaseIndex] = newItem;

      return {
        ...state,
        cartItems,
        ...sumItems(cartItems),
      }
    }

    case CartActionKind.REMOVE_ITEM:
      console.log("removing");
      let cartItems = [...state.cartItems];
      cartItems = cartItems.filter(item => item.id !== payload?.id);

      return {
        ...state,
        cartItems,
        ...sumItems(cartItems),
      }

    case CartActionKind.CLEAR:
      localStorage.removeItem('cart');
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      }

    default:
      return state;
  }
}

export default cartReducer;
