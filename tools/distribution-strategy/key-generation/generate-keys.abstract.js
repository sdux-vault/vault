// KeyGenerator.js
//
// Abstract-style class (CommonJS)
// Safe: will NOT overwrite existing keys
// Usage:
//   class ProdKeyGen extends KeyGenerator {}
//   new ProdKeyGen("production").generate();
//
//   class DevKeyGen extends KeyGenerator {}
//   new DevKeyGen("development").generate();
//

const fs = require('fs');
const path = require('path');
const { generateKeyPairSync } = require('crypto');

class KeyGeneratorAbstract {
  constructor(keyType) {
    if (new.target === KeyGeneratorAbstract) {
      throw new Error(
        'KeyGenerator is an abstract class and cannot be instantiated directly.'
      );
    }

    if (!keyType || typeof keyType !== 'string') {
      throw new Error('keyType (pro | development | enterprise) is required.');
    }

    this.keyType = keyType.toLowerCase();

    if (
      !(
        this.keyType === 'pro' ||
        this.keyType === 'development' ||
        this.keyType === 'enterprise'
      )
    ) {
      throw new Error(
        `Invalid keyType "${keyType}". Must be "pro", "development" or "enterprise".`
      );
    }

    this.keysDir = path.resolve(process.cwd(), 'keys');

    // Resolve paths dynamically based on keyType
    this.pubPath = path.join(this.keysDir, `${this.keyType}.public.pem`);
    this.privPath = path.join(this.keysDir, `${this.keyType}.private.pem`);
  }

  // Enforces override if needed later
  generate() {
    throw new Error('generate() must be implemented in subclass.');
  }

  //
  // Protected utility method for subclasses:
  //
  _generateKeys() {
    // Ensure directory exists
    if (!fs.existsSync(this.keysDir)) {
      fs.mkdirSync(this.keysDir, { recursive: true });
      console.info('Created ./keys directory');
    }

    const pubExists = fs.existsSync(this.pubPath);
    const privExists = fs.existsSync(this.privPath);

    // Stop if keys already exist
    if (pubExists || privExists) {
      console.info('⚠️  Key generation aborted.');
      if (pubExists && privExists) {
        console.info('✔ Existing public and private keys found.');
      } else {
        console.info(
          '❗ One key exists but not the other — refusing to overwrite to prevent mismatched pairs.'
        );
      }
      console.info('No new keys were created.');
      return;
    }

    // Generate fresh pair
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    fs.writeFileSync(this.pubPath, publicKey);
    fs.writeFileSync(this.privPath, privateKey);

    const privBase64Path = path.join(
      this.keysDir,
      `${this.keyType}.private.base64.txt`
    );
    const pubBase64Path = path.join(
      this.keysDir,
      `${this.keyType}.public.base64.txt`
    );

    fs.writeFileSync(
      privBase64Path,
      Buffer.from(privateKey).toString('base64')
    );
    fs.writeFileSync(pubBase64Path, Buffer.from(publicKey).toString('base64'));

    console.info(`✔ Public key written to ${this.pubPath}`);
    console.info(`✔ Private key written to ${this.privPath}`);
    console.info(`✔ Private key (base64) written to ${privBase64Path}`);
    console.info(`✔ Public key (base64) written to ${pubBase64Path}`);
    console.info('Key generation complete.');
  }
}

module.exports = KeyGeneratorAbstract;
