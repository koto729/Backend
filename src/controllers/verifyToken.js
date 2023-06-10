const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = req.header('auth-token');

  if (token == null) {
    return res.status(401).send('Access Denied');
  }

  jwt.verify(token, 'qweasd12zx', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

