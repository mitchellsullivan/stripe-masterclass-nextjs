import {FIREBASE_APP} from "../context/auth-context";
import {getAuth} from "@firebase/auth";

export const isInCart = (product, cartItems) => {
  return cartItems.find(item => item.id === product.id);
}

export async function fetchFromAPI(endpoint: string, opts: any = {}) {
  const method = "POST";

  if (opts.body) {
    opts.body = JSON.stringify(opts.body);
  }

  const auth = getAuth(FIREBASE_APP);
  const user = auth?.currentUser;
  console.log("USER:", user);
  const token = user && (await user.getIdToken());

  let authorization = {};
  if (token) {
    authorization = { Authorization: `Bearer ${token}`};
  }

  const res = await fetch(`/api/${endpoint}`, {
    method,
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...authorization
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    console.log("ERROR: " + res.statusText);
    throw new Error(res.statusText);
  }
}


