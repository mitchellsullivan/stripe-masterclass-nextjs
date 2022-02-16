// import NextAuth from "next-auth"
// import Auth0Provider from "next-auth/providers/auth0";
//
// export default NextAuth({
//   providers: [
//     Auth0Provider({
//       clientId: process.env["AUTH0_CLIENT_ID"],
//       clientSecret: process.env["AUTH0_CLIENT_SECRET"],
//       issuer: process.env["AUTH0_ISSUER"]
//     })
//   ],
//   callbacks: {
//     session: async ({ session, user }) => {
//       session.userId = user.id;
//       return Promise.resolve(session);
//     }
//   }
// })

export default 1;
