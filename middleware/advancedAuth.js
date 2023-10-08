import { auth } from "express-oauth2-jwt-bearer";

const authMiddleware = auth({
  audience: "https://book-store-api",
  issuerBaseURL: `https://dev-xv5xjqn12brasz2i.us.auth0.com/`,
});

export default authMiddleware;
