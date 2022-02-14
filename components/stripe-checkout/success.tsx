import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart-context';
import {useRouter} from "next/router";

const Success = () => {
  const router = useRouter();

  const { clearCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    if (cartItems.length !==0) { clearCart() }
  }, [clearCart, cartItems]);

  return (
      <div className='checkout'>
        <h1>Thank you for your order</h1>
        <p>We are currently processing your order and
          will send you a confirmation email shortly
        </p>
        <div>
          <button className='button is-black nomad-btn submit'
          onClick={() => router.push('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
  );
}

export default Success;
