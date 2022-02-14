import {GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage} from "next";
import {getAllProducts, getProductById, ShopProduct} from "../../lib/data-utils";
import SingleProduct from "../../components/single-product/single-product";
import dynamic from "next/dynamic";
import NoSsrWrapper from "../../components/no-ssr-wrapper";

type SingleProductPageProps = {
  product: ShopProduct
}

const SingleProductPage: NextPage<SingleProductPageProps> = (props) => {
  return (
      <SingleProduct product={props.product}/>
  )
}

export default SingleProductPage;

export const getStaticProps: GetStaticProps<SingleProductPageProps> = (ctx) => {
  const productId = +ctx.params["productId"];
  const product = getProductById(productId);

  return {
    props: {
      product
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const events = getAllProducts();
  const paths = events.map(p => ({ params: { productId: p.id.toString()}}));
  const ret: GetStaticPathsResult = {
    fallback: 'blocking',
    paths
  }
  return ret;
}
