import {auth} from "./firebase-admin";
import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";

// https://dev.to/dingran/next-js-firebase-authentication-and-middleware-for-api-routes-29m1
export const withAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).end('Not authenticated. No Auth header');
  }

  const token = authHeader.split(' ')[1];


  let decodedToken;

  try {
    decodedToken = await auth.verifyIdToken(token);
    if (!decodedToken || !decodedToken.uid)
      return res.status(401).end('Not authenticated');
    // req.uid = decodedToken.uid;

    req["currentUser"] = decodedToken;

  } catch (error) {
    console.log(error.errorInfo);
    const errorCode = error.errorInfo.code;
    error.status = 401;
    if (errorCode === 'auth/internal-error') {
      error.status = 500;
    }

    return res.status(error.status).json({ error: errorCode });
  }

  return handler(req, res);
}
