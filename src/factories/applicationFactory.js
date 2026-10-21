/**
 * Application Factory
 * 
 * Implements the Factory pattern to generate realistic mock Application objects
 * and batches for testing, development, and database seeding.
 * 
 * References: docs/ddd.md (Section 3.4, 4, 6.4)
 */

const STATUSES = [
  'Submitted',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Accepted',
  'Rejected',
  'Withdrawn'
];

const COVER_LETTERS = [
  'I am excited to apply for this role. With my background in software development and distributed systems, I am confident in contributing significantly to your engineering team.',
  'Having followed your company innovations closely, I believe my skills in full-stack web applications and cloud architecture align perfectly with this opening.',
  'I would love the opportunity to bring my hands-on problem solving, data engineering skills, and academic foundation to this position.',
  'As an active member of the alumni community with experience in modern web stacks, I am very enthusiastic about this opportunity and look forward to discussing my qualifications.',
  'My experience in containerized microservices and automated CI/CD pipelines makes me a strong fit for your team requirements.'
];

const NOTES = [
  'Referred via alumni network portal.',
  'Strong portfolio and GitHub profile attached.',
  'Candidate available for technical interview next week.',
  'Initial review positive; pending hiring manager evaluation.',
  'Candidate meets all core technical requirements.'
];

let applicationCounter = 0;

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Build a single mock Application object
 * 
 * @param {Object} [overrides={}] - Attributes to override
 * @returns {Object}
 */
function buildApplication(overrides = {}) {
  applicationCounter += 1;
  const applicantIndex = applicationCounter;

  return {
    userId: overrides.userId !== undefined ? overrides.userId : null,
    jobId: overrides.jobId !== undefined ? overrides.jobId : null,
    status: overrides.status || sample(STATUSES),
    coverLetter: overrides.coverLetter || sample(COVER_LETTERS),
    resumeUrl: overrides.resumeUrl !== undefined
      ? overrides.resumeUrl
      : `https://storage.alumni-portal.example.com/resumes/applicant-${applicantIndex}.pdf`,
    notes: overrides.notes !== undefined ? overrides.notes : sample(NOTES),
    ...overrides
  };
}

/**
 * Generate a batch of mock Application objects
 * 
 * @param {number} [count=5] - Number of applications to generate
 * @param {Object} [overrides={}] - Attributes to override across all objects
 * @returns {Array<Object>}
 */
function createApplications(count = 5, overrides = {}) {
  const applications = [];
  for (let i = 0; i < count; i += 1) {
    applications.push(buildApplication(overrides));
  }
  return applications;
}

module.exports = {
  buildApplication,
  createApplications,
  STATUSES
};
