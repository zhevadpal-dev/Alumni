/**
 * Password Hashing Utility (Node.js Built-in crypto.scrypt)
 *
 * Provides memory-hard, per-user salted password hashing and timing-safe
 * verification using Node's native crypto module (zero native build dependencies).
 */

const crypto = require('crypto');

const SALT_BYTES = 16;
const KEY_LENGTH = 64;

/**
 * Hash a plaintext password with a random 128-bit salt using scrypt.
 *
 * @param {string} password - Plaintext password
 * @returns {Promise<string>} Formatted hash string: scrypt$<saltHex>$<hashHex>
 */
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(SALT_BYTES).toString('hex');
    crypto.scrypt(String(password), salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`scrypt$${salt}$${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * Verify a plaintext password against a stored scrypt hash using timingSafeEqual.
 *
 * @param {string} password - Plaintext password
 * @param {string} storedHash - Stored hash in format scrypt$<saltHex>$<hashHex>
 * @returns {Promise<boolean>}
 */
function verifyPassword(password, storedHash) {
  return new Promise((resolve, reject) => {
    if (!storedHash || typeof storedHash !== 'string') return resolve(false);
    const parts = storedHash.split('$');
    if (parts.length !== 3 || parts[0] !== 'scrypt') return resolve(false);

    const [, salt, keyHex] = parts;
    const keyBuffer = Buffer.from(keyHex, 'hex');

    crypto.scrypt(String(password), salt, KEY_LENGTH, (err, derivedKey) => {
      if (err) return reject(err);
      if (keyBuffer.length !== derivedKey.length) return resolve(false);
      resolve(crypto.timingSafeEqual(keyBuffer, derivedKey));
    });
  });
}

module.exports = {
  hashPassword,
  verifyPassword
};
