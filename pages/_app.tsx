import '../styles/globals.scss'
import "../styles/app.scss";
import "../styles/cart-page.scss";
import "../styles/checkout.scss";
import "../styles/cart-icon.scss";
import "../styles/sign-up.scss";

import type {AppProps} from 'next/app'
import Layout from "../components/layout/layout";
import CartContextProvider from "../context/cart-context";
import { AuthContextProvider } from "../context/auth-context";


import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env["STRIPE_PUBLIC_KEY"]);

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Elements stripe={stripePromise}>
          <div className={"app"}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </Elements>
      </CartContextProvider>
      </AuthContextProvider>
  )
}

export default MyApp;
