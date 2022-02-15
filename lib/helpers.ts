import {RequestInit} from "next/dist/server/web/spec-extension/request";

export const isInCart = (product, cartItems) => {
  return cartItems.find(item => item.id === product.id);
}

export async function fetchFromAPI(endpoint: string, opts: any = {}) {
  const method = "POST";

  if (opts.body) {
    opts.body = JSON.stringify(opts.body);
  }

  // const user = auth.currentUser;
  // const token = user && (await user.getIdToken());
  const res = await fetch(`/api/${endpoint}`, {
    method,
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}
