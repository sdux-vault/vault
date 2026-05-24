// generate-pro-keys.js
//
// Generates pro.public.pem and pro.private.pem
//

const KeyGenerator = require('./generate-keys.abstract');

class ProKeyGenerator extends KeyGenerator {
  constructor() {
    super('pro');
  }

  generate() {
    this._generateKeys();
  }
}

new ProKeyGenerator().generate();
