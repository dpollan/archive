const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config').jwtSecret;

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized, access denied!' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.account = decoded.account;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid Token' });
  }
};
