/**
 * Announcement Factory
 * 
 * Implements the Factory pattern to generate realistic mock Announcement objects
 * and batches for testing, development, and database seeding.
 */

const CATEGORIES = ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'];

const AUTHORS = [
  'Alumni Relations Office',
  'Career Development Center',
  'Dean of Engineering',
  'Alumni Association',
  'Department of Computer Engineering',
  'Student Affairs Office',
  'University Rectorate'
];

const TEMPLATES = [
  {
    title: 'Global Tech Leadership Summit 2026',
    content: 'Join fellow alumni and industry pioneers for our flagship tech summit exploring distributed systems, cloud computing, and AI architectures.',
    category: 'Event'
  },
  {
    title: 'Spring Campus Recruitment Drive & Networking',
    content: 'Over 40 leading engineering and technology companies are recruiting on campus for full-time graduate positions and summer internships.',
    category: 'Career'
  },
  {
    title: 'Undergraduate Research Fellowship Grants',
    content: 'The Faculty of Engineering announces new research fellowships open to current students in collaboration with alumni mentors.',
    category: 'Academic'
  },
  {
    title: 'Alumni Homecoming Weekend & Gala Dinner',
    content: 'We invite all graduating classes back to campus for an unforgettable weekend of reconnection, panel discussions, and our annual alumni award banquet.',
    category: 'Event'
  },
  {
    title: 'Campus Infrastructure & Library Modernization Update',
    content: 'The central university library and computing clusters have completed major upgrades with expanded 24/7 collaborative study spaces.',
    category: 'News'
  },
  {
    title: 'Urgent: Registration Deadline for Spring Graduation Ceremony',
    content: 'All graduating seniors and masters candidates must finalize their graduation applications through the student portal by Friday.',
    category: 'Urgent'
  },
  {
    title: 'Alumni Mentorship Network: Now Accepting Applications',
    content: 'Share your professional expertise with prospective graduates. Apply to be an alumni mentor for the upcoming academic semester.',
    category: 'Career'
  },
  {
    title: 'Distinguished Alumni Lecture Series: Clean Energy Horizons',
    content: 'Dr. Selin Yılmaz (Class of 2012) will deliver an inspiring keynote on modern sustainable power systems and grid technology.',
    category: 'Academic'
  }
];

let announcementCounter = 0;

/**
 * Pick a random item from an array
 * @param {Array} arr 
 * @returns {*}
 */
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Build a single realistic mock announcement object
 * 
 * @param {Object} [overrides={}] - Custom attributes to override defaults
 * @returns {Object} Mock announcement object
 */
function buildAnnouncement(overrides = {}) {
  announcementCounter += 1;
  const template = sample(TEMPLATES);
  const author = sample(AUTHORS);
  const title = announcementCounter > TEMPLATES.length
    ? `${template.title} #${announcementCounter}`
    : template.title;

  return {
    title,
    content: template.content,
    author,
    category: template.category,
    ...overrides
  };
}

/**
 * Generate a batch of mock announcements
 * 
 * @param {number} [count=5] - Number of announcements to generate
 * @param {Object} [overrides={}] - Optional attributes to apply across the batch
 * @returns {Array<Object>} Array of mock announcement objects
 */
function createAnnouncements(count = 5, overrides = {}) {
  const announcements = [];
  for (let i = 0; i < count; i++) {
    announcements.push(buildAnnouncement(overrides));
  }
  return announcements;
}

module.exports = {
  buildAnnouncement,
  createAnnouncements,
  CATEGORIES,
  AUTHORS
};
