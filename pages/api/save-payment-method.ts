import {NextApiHandler} from "next";
import stripeApi from "../../lib/stripe-api";
import { getCustomer } from "../../lib/server-helpers";
import {withAuth} from "../../lib/middleware";

const setupIntent: NextApiHandler = async (req, res) => {
  const currentUser = req["currentUser"];

  // get stripe customer
  const customer = await getCustomer(currentUser.uid);
  let setupIntent;

  try {
    setupIntent = await stripeApi.setupIntents.create({
      customer: customer.id
    });
    res.status(200).json(setupIntent);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "an error occured, unable to create setup intent"
    });
  }
}

export default withAuth(setupIntent);
