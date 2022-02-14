import {createContext, FC, useContext, useEffect, useMemo, useReducer} from "react";
import cartReducer, {sumItems} from './cart-reducer';
import {ShopProduct} from "../lib/data-utils";
import Shop from "../pages/shop";

export enum CartActionKind {
  ADD_ITEM = "ADD_ITEM",
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR = "CLEAR",
  LOAD_STORED_CART = "LOAD_STORED_CART"
}

export interface CartAction {
  type: CartActionKind;
  payload: ShopProduct | null;
}

export type CartState = {
  cartItems: ShopProduct[];
  itemCount: number;
  total: number;
};

export type CartContext = CartState & {
  addProduct?: (p: ShopProduct) => void;
  increase?: (p: ShopProduct) => void;
  removeProduct?: (p: ShopProduct) => void;
  decrease?: (p: ShopProduct) => void;
  clearCart?: () => void,
  loadFromStorage?: () => void,
  getItemCount?: () => number
};

const loadStoredItems = (): ShopProduct[] => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('cart') ?
      JSON.parse(localStorage.getItem('cart')) :
      []
  } else {
     return [];
  }
}


const initialState: CartState = {
  cartItems: loadStoredItems(),
  ...sumItems(loadStoredItems())
};

export const CartContext = createContext<CartContext>({
  ...initialState
});


const CartContextProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const loadFromStorage = () => {
    dispatch({
      type: CartActionKind.LOAD_STORED_CART,
      payload: null
    });
  }

  const addProduct = (product: ShopProduct) =>
    dispatch({
      type: CartActionKind.ADD_ITEM,
      payload: product
    });

  const increase = (product: ShopProduct) =>
    dispatch({
      type: CartActionKind.INCREASE,
      payload: product
    });

  const decrease = (product) =>
    dispatch({
      type: CartActionKind.DECREASE,
      payload: product
    });

  const removeProduct = (product) => dispatch({
    type: CartActionKind.REMOVE_ITEM,
    payload: product
  });

  const clearCart = () => dispatch({
    type: CartActionKind.CLEAR,
    payload: null
  });

  const contextValues = {
    ...state,
    addProduct,
    increase,
    decrease,
    removeProduct,
    clearCart,
    loadFromStorage
  }

  const contextValue = useMemo(() => {
    return { ...contextValues, dispatch };
  }, [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>
      {
        children
      }
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  return useContext(CartContext);
}

export default CartContextProvider;
