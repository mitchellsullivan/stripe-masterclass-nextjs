import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cart-context';
import StripeCheckout from "../../components/stripe-checkout/stripe-checkout";
import ShippingAddress from '../../components/custom-checkout/shipping-address';
import CustomCheckout from '../../components/custom-checkout/custom-checkout';
import NoSsrWrapper from "../../components/no-ssr-wrapper";

const CheckoutPage = () => {
  const { itemCount, total, cartItems } = useContext(CartContext);

  const [shipping, setShipping] = useState(null);
  const addressShown = {
    display: (shipping ? 'none' : 'block')
  }

  const cardShown = {
    display: (shipping ? 'block' : 'none')
  }

  return (
      <NoSsrWrapper>
        <div className='checkout'>
          <h2>Checkout Summary</h2>
          <h3>{`Total Items: ${itemCount}`}</h3>
          <h4>{`Amount to Pay: $${total}`}</h4>
          <div style={addressShown}>
            <ShippingAddress setShipping={setShipping} />
          </div>
          <div style={cardShown}>
            <CustomCheckout { ...{ shipping, cartItems } }/>
          </div>
          {/*<StripeCheckout/>*/}
        </div>
      </NoSsrWrapper>
  );
}

export default CheckoutPage;
