import {GetStaticProps, NextPage} from "next";
import {getFeaturedProducts, ShopProduct} from "../lib/data-utils";
import {Fragment} from "react";
import Header from "../components/layout/header";
import FeaturedCollection from "../components/featured-collection/featured-collection";
import Hero from "../components/hero/hero";
import MainSection from "../components/main-section/main-section";


export type HomePageProps = {
  featuredProducts: ShopProduct[];
}

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <Fragment>
      <Hero />
      <MainSection/>
      <FeaturedCollection items={props.featuredProducts}/>
    </Fragment>
  )
}

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = (ctx) => {
  const products = getFeaturedProducts();
  return {
    props: {
      featuredProducts: products
    }
  }
}
