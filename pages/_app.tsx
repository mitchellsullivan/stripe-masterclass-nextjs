import '../styles/globals.scss'
import "../styles/app.scss";
import "../styles/cart-page.scss";
import "../styles/checkout.scss";
import "../styles/cart-icon.scss";

import type { AppProps } from 'next/app'
import Layout from "../components/layout/layout";
import CartContextProvider from "../context/cart-context";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env["STRIPE_PUBLIC_KEY"]);

console.log("STRIPE KEY: " + process.env["STRIPE_PUBLIC_KEY"]);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Elements stripe={stripePromise}>
        <div className={"app"}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </Elements>
    </CartContextProvider>
  )
}

export default MyApp;
