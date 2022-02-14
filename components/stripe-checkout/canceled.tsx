import {useRouter} from "next/router";
import {FC} from "react";

const Canceled: FC = () => {
  const router = useRouter();

  return (
      <div className='checkout'>
        <h1>Payment failed</h1>
        <p>Payment was not successful</p>
        <div>
          <button className='button is-black nomad-btn submit'
          onClick={() => router.push('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
  );
}

export default Canceled;
