const respone = require('../helpers/respone');
const jwt = require('jsonwebtoken');

const validateToken = {};

validateToken.admin = (req, res, next) => {
  const { auth_token } = req.headers;

  if (!auth_token) {
    return respone(res, 401, { msg: 'silahkan login dulu' });
  }

  jwt.verify(auth_token, process.env.JWT_KEYS, (err, decode) => {
    req.user = decode;
    if (req.user == null) {
      return respone(res, 401, 'token expired, login again');
    } else {
      const role = req.user.role;

      if (err || role !== 'admin') {
        return respone(res, 401, 'log in as admin!');
      }

      next();
    }
  });
};

validateToken.user = (req, res, next) => {
  const { auth_token } = req.headers;

  if (!auth_token) {
    return respone(res, 401, { msg: 'silahkan login dulu' });
  }

  jwt.verify(auth_token, process.env.JWT_KEYS, (err, decode) => {
    req.user = decode;
    if (req.user == null) {
      return respone(res, 401, 'token expired, login again');
    } else {
      const role = req.user.role;

      next();
    }
  });
};
module.exports = validateToken;
