// development-token-generation.js
//
// Generates a development token using development.private.pem
//

const TokenGenerator = require('./token-generation.abstract');

class DevelopmentTokenGenerator extends TokenGenerator {
  constructor() {
    super('development');
  }

  generate() {
    this._generateToken();
  }
}

new DevelopmentTokenGenerator().generate();
