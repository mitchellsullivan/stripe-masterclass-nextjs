import React, {FunctionComponent, useContext} from 'react';
import FeaturedProduct from '../featured-product/featured-product';
import {GetStaticProps} from "next";
import {getFeaturedProducts, ShopProduct} from "../../lib/data-utils";
import {useRouter} from "next/router";

type FeaturedCollectionProps = {
  items: ShopProduct[]
}

const FeaturedCollection: FunctionComponent<FeaturedCollectionProps> = (props) => {

  const productItems = props.items.map(product => (
    <FeaturedProduct {...product} key={product.id} />
  ));

  return (
    <div className='featured-collection container'>
      <h2 className='featured-section-title'>
        Featured Collection
      </h2>
      <div className='products'>
        {
          productItems
        }
      </div>
    </div>
  );
}

export default FeaturedCollection;
