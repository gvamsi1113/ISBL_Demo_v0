"use strict";

var _require = require("jsonwebtoken"),
    sign = _require.sign,
    verify = _require.verify;

var createTokens = function createTokens(user) {
  var accessToken = sign({
    username: user.username,
    id: user.id
  }, "jwtsecretplschange");
  return accessToken;
};

var validateToken = function validateToken(req, res, next) {
  var accessToken = req.cookies["access-token"];
  if (!accessToken) return res.status(400).json({
    error: "User not Authenticated!"
  });

  try {
    var validToken = verify(accessToken, "jwtsecretplschange");

    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

module.exports = {
  createTokens: createTokens,
  validateToken: validateToken
};