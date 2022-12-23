const jwt = require('jsonwebtoken');

class JwtService {
  secret;

  constructor({ secret }) {
    this.secret = secret;
  }

  sign = (payload, expiresIn) => {
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, this.secret, { expiresIn }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      })
    })
  }

  verify = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  }
}

module.exports = JwtService;

