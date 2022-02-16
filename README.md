### Goal 

This project is for learning purposes, and the goal is to convert the code for the Udemy course
"Stripe Masterclass with React.js and Node.js" to Next.js with TypeScript.

The original course's code can be found at in the following repos:

https://github.com/cagarweyne/stripe-masterclass
<br/>
https://github.com/cagarweyne/stripe-masterclass-server

The Firebase SDK is changed from 8 to 9. Most resources and tutorials for 
the Firebase SDK use version 8, and there were several breaking changes. 
Inspiration was found here:

https://github.com/official-carledwardfp/nextjs-firebase-auth-starter.git

### Findings 
- Client-Server mismatch. 
  - Any rendering logic that relies on state from React's Context API still works,
  but will throw warnings in the console about a mismatch between the client and 
  server. 
  - Officially in Next.js, anything that should be executed on the client
  should occur with the `useEffect` hook.
  - No warning is thrown if a component has internal state and sets from the
  context provider within `useEffect`, but this results in duplicate code.
  - Instead, you can create a "No SSR" wrapper component and selectively surround 
  the specific logic within a component or page that relies on Context state.

    
- Problems **fully** logging out of Oauth (specifically Auth0, possibly KeyCloak)
with popular `next-auth` package. 
  - I tried Oauth instead of Firebase just for fun. Signing out followed by 
  clicking a Sign In link would sign me back in without a challenge. 
  - Next Auth's `signOut` function wasn't calling the Auth0's `logout` API to 
  invalidate the session.
  - What worked was combining `signOut` function with a call to the 
  identity provider's API via the `callbackUrl` option of `signOut`.

```typescript jsx
// In component, add callback URL of custom handler:
<li onClick={() => signOut({ callbackUrl: "/api/logout-auth0"})}>
  Sign Out
</li>

// In pages/api/auth/logout-auth0.ts, redirect to logout API:
export default function handler(req, res) {
  const returnTo = encodeURI('http://localhost:3000');
  res.redirect(
    `${process.env.AUTH0_ISSUER}/v2/logout?returnTo=${returnTo}&client_id=${process.env["AUTH0_CLIENT_ID"]}`,
  );
}
```
