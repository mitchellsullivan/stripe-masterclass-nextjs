import {withAuth} from "../../lib/middleware";
import {NextApiHandler} from "next";
import {getCustomer} from "../../lib/server-helpers";
import stripeApi from "../../lib/stripe-api";

const updatePaymentIntent: NextApiHandler = async (req, res) => {
  const {body: {paymentIntentId}} = req;
  const currentUser = req["currentUser"];

  const customer = await getCustomer(currentUser.uid);
  let paymentIntent;

  try {
    paymentIntent = await stripeApi.paymentIntents.update(
      paymentIntentId,
      {customer: customer.id,}
    );

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "unable to update payment intent"
    });
  }
}

export default withAuth(updatePaymentIntent);
