import stripeApi from "../../lib/stripe-api";
import { getCustomer } from "../../lib/server-helpers";
import {NextApiHandler} from "next";
import {withAuth} from "../../lib/middleware";

const getCards: NextApiHandler = async (req, res) => {
  const currentUser = req["currentUser"];

  const customer = await getCustomer(currentUser.uid);

  let cards;

  try {
    cards = await stripeApi.paymentMethods.list({
      customer: customer.id,
      type: "card",
    });
    res.status(200).json(cards.data);
  } catch(error) {
    console.log(error);
    res.status(400).json({
      error: "an error occured, unable to get cards"
    });
  }
}

export default withAuth(getCards);
