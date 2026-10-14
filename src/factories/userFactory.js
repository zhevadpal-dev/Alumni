/**
 * User Factory
 * 
 * Implements the Factory pattern to generate realistic mock User objects
 * and batches for testing, development, and database seeding.
 */

const FIRST_NAMES = [
  'Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Emre', 'Can', 'Deniz', 'Elif',
  'Burak', 'Selin', 'Barış', 'Gamze', 'Onur', 'Merve', 'Kaan', 'Ezgi',
  'Kerem', 'Zeynep', 'Berk', 'Derya', 'Tolga', 'Sinem', 'Cem', 'Büşra'
];

const LAST_NAMES = [
  'Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Yıldırım', 'Öztürk',
  'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara',
  'Koç', 'Kurt', 'Özkan', 'Şimşek', 'Polat', 'Korkmaz', 'Erdoğan', 'Yavuz'
];

const ROLES = ['alumni', 'student', 'teacher'];

const DEPARTMENTS = [
  'Computer Engineering',
  'Software Engineering',
  'Electrical & Electronics Engineering',
  'Industrial Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Systems & Technologies',
  'Data Science & Artificial Intelligence',
  'Business Administration',
  'Economics'
];

let userCounter = 0;

/**
 * Pick a random item from an array
 * @param {Array} arr 
 * @returns {*}
 */
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const toAscii = (str) =>
  str
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');

/**
 * Build a single realistic mock user object
 * 
 * @param {Object} [overrides={}] - Custom attributes to override defaults
 * @returns {Object} Mock user object
 */
function buildUser(overrides = {}) {
  userCounter += 1;
  const firstName = sample(FIRST_NAMES);
  const lastName = sample(LAST_NAMES);
  const name = `${firstName} ${lastName}`;
  const timestamp = Date.now().toString().slice(-4);
  const cleanFirst = toAscii(firstName);
  const cleanLast = toAscii(lastName);
  const email = `${cleanFirst}.${cleanLast}${userCounter}${timestamp}@example.edu`;
  const role = sample(ROLES);
  const department = sample(DEPARTMENTS);
  const graduationYear = role === 'student' ? randomInt(2025, 2028) : randomInt(2010, 2024);

  return {
    name,
    email,
    role,
    department,
    graduationYear,
    ...overrides
  };
}

/**
 * Generate a batch of mock users
 * 
 * @param {number} [count=5] - Number of users to generate
 * @param {Object} [overrides={}] - Optional attributes to apply across the batch
 * @returns {Array<Object>} Array of mock user objects
 */
function createUsers(count = 5, overrides = {}) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(buildUser(overrides));
  }
  return users;
}

module.exports = {
  buildUser,
  createUsers,
  ROLES,
  DEPARTMENTS
};
