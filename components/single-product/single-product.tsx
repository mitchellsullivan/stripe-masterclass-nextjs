import React, {useContext, useState, useEffect} from 'react';
import classes from './single-product.module.scss';
import {ShopProduct} from "../../lib/data-utils";
import {CartContext} from "../../context/cart-context";
import {isInCart} from "../../lib/client-helpers";
import AddToCartButtons from "./add-to-cart-buttons";

type SingleProductProps = {
  product: ShopProduct
}

const SingleProduct: React.FC<SingleProductProps> = (props) => {
  const {imageUrl, title, price, description} = props.product;

  return (
    <div className={classes.singleProductContainer}>
      <div className={classes.productImage}>
        <img src={imageUrl} alt='product' />
      </div>
      <div className={classes.productDetails}>
        <div className={classes.namePrice}>
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
          <AddToCartButtons product={props.product}/>
        </div>
        <div className={classes.productDescription}>
          <p>
            {description}
          </p>
        </div>
      </div>
  );
}

export default SingleProduct;
