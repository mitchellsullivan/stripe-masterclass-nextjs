import stripeApi from "./stripe-api";
import { db } from "./firebase-admin";

export async function createCustomer(userId) {
  const userSnapshot = await db
    .collection('users')
    .doc(userId)
    .get();

  const { email } = userSnapshot.data();

  const customer = await stripeApi.customers.create({
    email,
    metadata: {
      firebaseUID: userId,
    }
  });

  await userSnapshot.ref.update({ stripeCustomerId: customer.id });
  return customer;
}

export async function getCustomer(userId) {
  const userSnapshot = await db
    .collection('users')
    .doc(userId)
    .get();

  const { stripeCustomerId } = userSnapshot.data();

  if (!stripeCustomerId) {
    return createCustomer(userId);
  }

  const customer = await stripeApi.customers.retrieve(stripeCustomerId);
  return customer;
}
