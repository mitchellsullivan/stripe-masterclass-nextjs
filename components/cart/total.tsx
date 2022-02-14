import {useRouter} from "next/router";

const Total = ({ itemCount, total, clearCart }) => {
  const router = useRouter();

  return (
    <div className='total-container'>
      <div className='total'>
        <p>Total Items: {itemCount}</p>
        <p>{`Total: $${total}`}</p>
      </div>
      <div className='checkout'>
        <button
          className='button is-black'
          onClick={() => router.push('/checkout')}>CHECKOUT</button>
        <button className='button is-white' onClick={clearCart}>CLEAR</button>
      </div>
    </div>
  );
}

export default Total;
