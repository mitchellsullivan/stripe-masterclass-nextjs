import React, {useContext, useEffect, useState} from 'react';
import classes from './featured-product.module.scss';
import {useRouter} from "next/router";
import {CartContext} from "../../context/cart-context";
import {isInCart} from "../../lib/helpers";
import {ShopProduct} from "../../lib/data-utils";
import NoSsrWrapper from "../no-ssr-wrapper";

type FeaturedProductProps = {

}

const FeaturedProduct = (props) => {
  const router = useRouter();

  const { title, imageUrl, price, id, quantity } = props;
  const product = { title, imageUrl, price, id, quantity } as ShopProduct;

  const { addProduct, cartItems, increase } = useContext(CartContext);

  // const [isItemInCart, setIsItemInCart] = useState(false);
  //
  // useEffect(() => {
  //   setIsItemInCart(isInCart(product, cartItems))
  // }, [cartItems]);
  //

  return (
    <div className={classes.featuredProduct}>
      <div className='featured-image'
           onClick={() => router.push(`/product/${product.id}`)}>
        <img src={imageUrl} alt='product' />
      </div>
      <div className='name-price'>
        <h3>{title}</h3>
        <p>$ {price}</p>
        <NoSsrWrapper>
          {
            !isInCart(product, cartItems) ?
              (<button
                className='button is-black nomad-btn'
                onClick={() => addProduct?.(product)}>
                ADD TO CART
              </button>)
              :
              (<button
                className='button is-white nomad-btn'
                id='btn-white-outline'
                onClick={()=> increase?.(product)}>
                ADD MORE
              </button>)
          }
        </NoSsrWrapper>
      </div>
    </div>
  );
}

export default FeaturedProduct;
