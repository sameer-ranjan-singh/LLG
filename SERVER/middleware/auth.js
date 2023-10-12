const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET_KEY;  // This should be in an environment variable in a real application

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.userId = user._id;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  module.exports = {
    authenticateJwt,
    SECRET
  }