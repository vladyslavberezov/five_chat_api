const ms = require('ms')
const JwtService = require('./jwt-service')
const env = require('../../lib/env')

class AccessTokenService extends JwtService {
  constructor() {
    super({
      secret: env.ACCESS_TOKEN_SECRET,
    });
  }

  /**
   * @param payload - { userId } object
   * @returns {Promise<{expiresAt: Date, token: string}>}
   * expiresAt is a date when the token expires
   */
  async generate(payload) {
    const token = await this.sign(payload, env.ACCESS_TOKEN_EXPIRES);

    const expiresInMs = ms(env.ACCESS_TOKEN_EXPIRES);
    const expiresAt = new Date(Date.now() + expiresInMs);

    return { token, expiresAt };
  }

  verify(token) {
    return this.verify(token);
  }
}

module.exports = new AccessTokenService();
