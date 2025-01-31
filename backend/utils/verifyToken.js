const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");



async function verifyToken(req, res, next) {
  const access_token = req.cookies.access_token;
  if(!access_token) next(errorHandler(401, "Unauthorized"));
  jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decode) => {
    if(err) next(errorHandler(403, "Forbidden"));
    req.verifyUserId = decode.id;
    next();
  });
}

module.exports = verifyToken;