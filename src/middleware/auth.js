const { auth } = require("express-oauth2-jwt-bearer");
const { env, hasAuth0Config } = require("../config/env");

let hasShownStubNotice = false;

const auth0JwtMiddleware = hasAuth0Config
  ? auth({
      audience: env.auth0Audience,
      issuerBaseURL: `https://${env.auth0Domain}/`,
      tokenSigningAlg: "RS256"
    })
  : null;

function stubJwtMiddleware(req, _res, next) {
  const subjectFromHeader = req.get("x-dev-user-sub");
  const fallbackSubject = "dev|local-user";

  req.auth = {
    payload: {
      sub: subjectFromHeader || fallbackSubject
    }
  };

  next();
}

function verifyJwt(req, res, next) {
  if (process.env.DEV_AUTH === "true") {
    return stubJwtMiddleware(req, res, next);
  }

  if (auth0JwtMiddleware) {
    return auth0JwtMiddleware(req, res, next);
  }

}


module.exports = {
  verifyJwt
};
