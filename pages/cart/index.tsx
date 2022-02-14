import React, {Fragment, useContext} from 'react';
import {CartContext, useCartContext} from '../../context/cart-context';
import CartItem from '../../components/cart/cart-item';
import Total from "../../components/cart/total";
import {NextPage} from "next";
import NoSsrWrapper from "../../components/no-ssr-wrapper";


const CartPage: NextPage = () => {
  const {
    cartItems,
    itemCount,
    total,
    increase,
    decrease,
    removeProduct,
    clearCart
  } = useCartContext();

  const funcs = { increase, decrease, removeProduct }

  return (
      <Fragment>
        <h1>Cart</h1>
        <NoSsrWrapper>
          {
            cartItems.length === 0 ?
              <div className='empty-cart'>Your Cart is empty</div>
              :
              <div className='cart-page'>
                <div className='cart-item-container'>
                  {
                    cartItems.map(item  => <CartItem { ...item } key={item.id} { ...funcs }/>)
                  }
                </div>
                <Total itemCount={itemCount} total={total} clearCart={clearCart} />
              </div>
          }
        </NoSsrWrapper>
      </Fragment>
  );
}

export default CartPage;
