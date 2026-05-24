// generate-development-keys.js
//
// Generates development.public.pem and development.private.pem
//

const KeyGenerator = require('./generate-keys.abstract');

class DevelopmentKeyGenerator extends KeyGenerator {
  constructor() {
    super('development');
  }

  generate() {
    this._generateKeys();
  }
}

new DevelopmentKeyGenerator().generate();
