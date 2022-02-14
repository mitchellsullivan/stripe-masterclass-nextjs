import classes from "./single-product.module.scss";
import React, {useContext} from "react";
import NoSsrWrapper from "../no-ssr-wrapper";
import {CartContext} from "../../context/cart-context";
import {isInCart} from "../../lib/helpers";


const AddToCartButtons: React.FC<any> = ({ product }) => {
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const itemInCart = isInCart(product, cartItems);

  return (
    <NoSsrWrapper>
      <div className={classes.addToCartBtns}>
        {
          !itemInCart &&
            <button
                className='button is-white nomad-btn'
                id='btn-white-outline'
                onClick={() => addProduct?.(product)}>
                ADD TO CART
            </button>
        }
        {
          itemInCart &&
            <button
                className='button is-white nomad-btn'
                id='btn-white-outline'
                onClick={()=> increase?.(product)}>
                ADD MORE
            </button>
        }
        <button className='button is-black nomad-btn' id='btn-white-outline'>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </NoSsrWrapper>
  )
}

export default AddToCartButtons;
