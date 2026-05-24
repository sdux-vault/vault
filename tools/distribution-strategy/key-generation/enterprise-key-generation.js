// generate-enterprise-keys.js
//
// Generates enterprise.public.pem and enterprise.private.pem
//

const KeyGenerator = require('./generate-keys.abstract');

class EnterpriseKeyGenerator extends KeyGenerator {
  constructor() {
    super('enterprise');
  }

  generate() {
    this._generateKeys();
  }
}

new EnterpriseKeyGenerator().generate();
