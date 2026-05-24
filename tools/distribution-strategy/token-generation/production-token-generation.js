// production-token-generation.js
//
// Generates a production token using production.private.pem
//

const TokenGenerator = require('./token-generation.abstract');

class ProductionTokenGenerator extends TokenGenerator {
  constructor() {
    super('production');
  }

  generate() {
    this._generateToken();
  }
}

new ProductionTokenGenerator().generate();
