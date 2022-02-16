import React, {useState, useEffect, useContext} from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import {useAuth} from '../../context/auth-context';
import {fetchFromAPI} from '../../lib/client-helpers';
import {useRouter} from "next/router";

const CustomCheckout = ({shipping, cartItems}) => {
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [cards, setCards] = useState(null);
  const [payment, setPaymentCard] = useState('');
  const [saveCard, setSavedCard] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  useEffect(() => {
    const items = cartItems.map(item => ({
      price: item.price,
      quantity: item.quantity
    }));

    if (user) {
      try {
        fetchFromAPI('get-payment-methods', {
          method: 'GET',
        }).then(data => {
          setCards(data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (shipping) {
      const body = {
        cartItems: items,
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address
          }
        },
        description: 'payment intent for nomad shop',
        receipt_email: shipping.email,
      }

      fetchFromAPI('create-payment-intent', {
        body
      }).then(({clientSecret, id}) => {
        setClientSecret(clientSecret)
        setPaymentIntentId(id);
      });
    }
  }, [shipping, cartItems]);


  const handleCheckout = async () => {
    setProcessing(true);
    let si;
    // check if user has selcted to save card
    if (saveCard) {
      // make to create a setup intent
      si = await fetchFromAPI('save-payment-method');
    }
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
    } else {
      if (saveCard && si) {
        // send the customers card details to be saved with stripe
        await stripe.confirmCardSetup(si.client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement)
          }
        });
        await router.push('/checkout/success');
      } else {
        await router.push('/checkout/success');
      }
    }
  }

  const savedCardCheckout = async () => {
    setProcessing(true);

    // update the payment intent to include the customer parameter
    const {clientSecret} = await fetchFromAPI('update-payment-intent', {
      body: {
        paymentIntentId
      },
      method: 'PUT',
    });

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: payment,
    });

    if (payload.error) {
      setError(`Payment Failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      await router.push('/checkout/success');
    }
  }

  const cardHandleChange = event => {
    const {error} = event;
    setError(error ? error.message : '');
  }

  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: 'Roboto, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#606060",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  let cardOption;

  if (cards) {
    cardOption = cards.map(card => {
      const {card: {brand, last4, exp_month, exp_year}} = card;
      return (
        <option key={card.id} value={card.id}>
          {`${brand}/ **** **** **** ${last4} ${exp_month}/${exp_year}`}
        </option>
      );
    });
    cardOption.unshift(
      <option key='Select a card' value=''>Select A Card</option>
    );
  }

  return (
    <div>
      {
        user && (cards && cards.length > 0) &&
          <div>
              <h4>Pay with saved card</h4>
              <select value={payment} onChange={e => setPaymentCard(e.target.value)}>
                {cardOption}
              </select>
              <button
                  type='submit'
                  disabled={processing || !payment}
                  className='button is-black nomad-btn submit saved-card-btn'
                  onClick={() => savedCardCheckout()}
              >
                {processing ? 'PROCESSING' : 'PAY WITH SAVED CARD'}
              </button>
          </div>
      }
      <h4>Enter Payment Details</h4>
      <div className='stripe-card'>
        <CardNumberElement
          className='card-element'
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className='stripe-card'>
        <CardExpiryElement
          className='card-element'
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      <div className='stripe-card'>
        <CardCvcElement
          className='card-element'
          options={cardStyle}
          onChange={cardHandleChange}
        />
      </div>
      {
        user &&
          <div className='save-card'>
              <label>Save Card</label>
              <input
                  type='checkbox'
                  checked={saveCard}
                  onChange={e => setSavedCard(e.target.checked)}
              />
          </div>
      }
      <div className='submit-btn'>
        <button
          disabled={processing}
          className='button is-black nomad-btn submit'
          onClick={() => handleCheckout()}
        >
          {processing ? 'PROCESSING' : 'PAY'}
        </button>
      </div>
      {
        error && (<p className='error-message'>{error}</p>)
      }
    </div>
  );
}

export default CustomCheckout;
