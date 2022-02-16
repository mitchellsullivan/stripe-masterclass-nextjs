import {NextApiRequest, NextApiResponse} from "next";
import stripeAPI from "../../lib/stripe-api";

const webHookHandlers = {
  'checkout.session.completed': (data) => {
    console.log('Checkout completed successfully', data);
  },
  'payment_intent.succeeded': (data) => {
    console.log('Payment succeeded', data);
  },
  'payment_intent.payment_failed': (data) => {
    console.log('Payment Failed', data);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req['rawBody'], sig, process.env.WEB_HOOK_SECRET);
  } catch(error) {
    return res.status(400).send(`Webhook error ${error.message}`);
  }

  if (webHookHandlers[event.type]) {
    webHookHandlers[event.type](event.data.object);
  }
}
