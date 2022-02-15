
export default function handler(req, res) {
  const returnTo = encodeURI('http://localhost:3000');
  res.redirect(
    `${process.env.AUTH0_ISSUER}/v2/logout?returnTo=${returnTo}&client_id=${process.env["AUTH0_CLIENT_ID"]}`,
  );
}
