// TokenGenerator.js
//
// Abstract-style class (CommonJS)
// Requires a string type: "production" | "development"
// Token creation still requires a command-line email
//

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class TokenGenerator {
  constructor(type) {
    if (new.target === TokenGenerator) {
      throw new Error(
        'TokenGenerator is an abstract class and cannot be instantiated directly.'
      );
    }

    if (!type || typeof type !== 'string') {
      throw new Error(
        'TokenGenerator requires a type: production | development'
      );
    }

    this.type = type.toLowerCase();

    if (this.type !== 'production' && this.type !== 'development') {
      throw new Error(
        `Invalid token generator type "${type}". Expected "production" or "development".`
      );
    }

    // Key path: ../key-generation/keys/<type>.private.pem
    this.privateKeyPath = path.resolve(
      __dirname,
      '../key-generation/keys',
      `${this.type}.private.pem`
    );
  }

  generate() {
    throw new Error('generate() must be implemented in subclass.');
  }

  //
  // Protected utility method for subclasses
  //
  _generateToken() {
    // --- Get email from CLI ---
    const email = process.argv[2];
    if (!email) {
      console.error(
        '❌ Error: You must provide an email.\nUsage: node <script> user@example.com'
      );
      process.exit(1);
    }

    // Sanitize email
    const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '-');

    // --- Read private key ---
    if (!fs.existsSync(this.privateKeyPath)) {
      console.error('❌ Private key not found at:', this.privateKeyPath);
      process.exit(1);
    }

    const privateKey = fs.readFileSync(this.privateKeyPath, 'utf-8');

    // --- Build token payload ---
    const payload = {
      email,
      issuedAt: new Date().toISOString(),
      type: this.type
    };

    const payloadString = JSON.stringify(payload);

    // --- Sign token ---
    const signature = crypto.sign('sha256', Buffer.from(payloadString), {
      key: privateKey
    });

    const token = {
      payload,
      signature: signature.toString('base64')
    };

    // --- Write token file ---
    const tokensDir = path.resolve(process.cwd(), 'tokens');
    if (!fs.existsSync(tokensDir)) {
      fs.mkdirSync(tokensDir, { recursive: true });
    }

    const clientDir = path.join(tokensDir, safeEmail);
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }

    const tokenFile = path.join(clientDir, `${this.type}-token.json`);
    fs.writeFileSync(tokenFile, JSON.stringify(token, null, 2));

    console.info(`✔ Token generated for ${email}`);
    console.info(`✔ Saved to: ${tokenFile}`);
  }
}

module.exports = TokenGenerator;
