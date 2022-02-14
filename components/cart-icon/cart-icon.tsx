import {FC, useContext, useEffect, useState} from 'react';
import {CartContext} from "../../context/cart-context";
import { useRouter } from "next/router";
import NoSsrWrapper from "../no-ssr-wrapper";

const CartIcon: FC = () => {
  const router = useRouter();

  const { itemCount } = useContext(CartContext);

  const badgeClass = () => {
    if (itemCount === 0) return "cart-count-zero";
    if (itemCount < 10) return "cart-count-single-digit";
    return "cart-count-two-digit";
  }

  return (
    <div className={"cart-container"} onClick={() => router.push('/cart')}>
      <img src={"/images/shopping-bag.png"} alt='shopping-cart-icon'/>
      <NoSsrWrapper>
        <span className={badgeClass()}>
          { itemCount }
        </span>
      </NoSsrWrapper>
    </div>
  );
}

export default CartIcon;
