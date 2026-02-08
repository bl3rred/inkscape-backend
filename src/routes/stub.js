const express = require("express");
const { verifyJwt } = require("../middleware/auth");
const { requireRole } = require("../middleware/requireRole");
const { ROLES } = require("../constants/roles");
const { sendSuccess } = require("../utils/apiResponse");

const router = express.Router();

router.get("/auth/me", verifyJwt, (req, res) => {
  return sendSuccess(res, {
    auth0UserId: req.auth.payload.sub
  });
});

router.get("/artist/stub", verifyJwt, requireRole(ROLES.ARTIST), (req, res) => {
  return sendSuccess(res, {
    message: "Artist route access granted.",
    role: req.user.role
  });
});

router.get("/company/stub", verifyJwt, requireRole(ROLES.COMPANY), (req, res) => {
  return sendSuccess(res, {
    message: "Company route access granted.",
    role: req.user.role
  });
});

module.exports = router;
