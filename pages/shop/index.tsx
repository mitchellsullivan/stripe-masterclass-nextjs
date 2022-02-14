import React, { useContext } from 'react';
import Layout from '../../components/layout/layout';
import FeaturedProduct from "../../components/featured-product/featured-product";
import classes from './shop.module.scss';
import {GetStaticProps, NextPage} from "next";
import {getAllProducts, ShopProduct} from "../../lib/data-utils";
import {useRouter} from "next/router";
import productId from "../product/[productId]";

type ShopPageProps = {
  products: ShopProduct[]
}

const ShopPage: NextPage<ShopPageProps> = (props) => {
  const allProducts = props.products.map(product => (
    <FeaturedProduct { ...product }
                     key={product.id}/>
  ));

  return (
    <div className={classes.productListContainer}>
      <h2 className={classes.productListTitle}>Shop</h2>
      <div className={classes.productList}>
        {
          allProducts
        }
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ShopPageProps> = () => {
  const products = getAllProducts();
  return {
    props: {
      products
    },
    revalidate: 60
  }
}

export default ShopPage;
