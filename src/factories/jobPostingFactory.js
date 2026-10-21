/**
 * Job Posting Factory
 * 
 * Implements the Factory pattern to generate realistic mock JobPosting objects
 * and batches for testing, development, and database seeding.
 * 
 * References: docs/ddd.md (Section 3.3, 4, 6.3)
 */

const JOB_TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'];
const STATUSES = ['Active', 'Closed', 'Draft', 'Expired'];

const COMPANIES = [
  'TechCorp Solutions',
  'FinTech Innovations',
  'CloudScale Systems',
  'Nexus Data Labs',
  'CyberShield Security',
  'Global Telecom Network',
  'BioHealth Dynamics',
  'Apex Robotics AI'
];

const LOCATIONS = [
  'Remote',
  'Istanbul / Remote',
  'Ankara / Hybrid',
  'Izmir / On-site',
  'London, UK / Remote',
  'Berlin, Germany / Hybrid',
  'New York, NY / Remote'
];

const JOB_TEMPLATES = [
  {
    title: 'Senior Backend Engineer',
    jobType: 'Full-Time',
    description: 'Lead backend microservice development, optimize relational database performance, and maintain event-driven systems.',
    requirements: 'Strong experience with Node.js, PostgreSQL, Redis, Docker, and distributed architectural patterns.',
    salaryRange: '$85,000 - $115,000'
  },
  {
    title: 'Frontend Engineer (React / TypeScript)',
    jobType: 'Full-Time',
    description: 'Design responsive web applications, component libraries, and interactive analytical dashboards for enterprise clients.',
    requirements: 'Proficiency in React, Next.js, TypeScript, TailwindCSS, and state management.',
    salaryRange: '$75,000 - $100,000'
  },
  {
    title: 'DevOps & Site Reliability Engineer',
    jobType: 'Full-Time',
    description: 'Automate CI/CD delivery pipelines, manage Kubernetes clusters on AWS/GCP, and ensure 99.99% system availability.',
    requirements: 'Experience with Terraform, Docker, Kubernetes, Prometheus, and multi-region cloud networks.',
    salaryRange: '$90,000 - $125,000'
  },
  {
    title: 'Data Platform Engineer',
    jobType: 'Full-Time',
    description: 'Build real-time ETL streaming pipelines, maintain analytics data lakes, and design automated reporting frameworks.',
    requirements: 'Hands-on background with Python, SQL, Apache Kafka, Spark, and PostgreSQL.',
    salaryRange: '$80,000 - $110,000'
  },
  {
    title: 'Machine Learning Research Intern',
    jobType: 'Internship',
    description: 'Conduct experiments on generative models, assist in prompt evaluation benchmarks, and prepare academic reports.',
    requirements: 'Current graduate or senior undergraduate in Computer Engineering. Familiarity with PyTorch and Python.',
    salaryRange: '$2,500 / month stipend'
  },
  {
    title: 'Cybersecurity Analyst',
    jobType: 'Contract',
    description: 'Perform penetration testing, audit identity/access management protocols, and coordinate SOC incident responses.',
    requirements: 'Knowledge of OWASP top 10, network protocols, ISO 27001 compliance, and SIEM monitoring tools.',
    salaryRange: '$60 - $85 / hour'
  }
];

let jobCounter = 0;

/**
 * Pick a random element from an array
 * @param {Array} arr 
 * @returns {*}
 */
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Build a single mock JobPosting object
 * 
 * @param {Object} [overrides={}] - Attributes to override
 * @returns {Object}
 */
function buildJobPosting(overrides = {}) {
  jobCounter += 1;
  const template = sample(JOB_TEMPLATES);
  const company = overrides.company || sample(COMPANIES);
  const companySlug = company.toLowerCase().replace(/[^a-z0-9]/g, '');

  return {
    title: overrides.title || template.title,
    company,
    location: overrides.location || sample(LOCATIONS),
    jobType: overrides.jobType || template.jobType,
    description: overrides.description || template.description,
    requirements: overrides.requirements !== undefined ? overrides.requirements : template.requirements,
    salaryRange: overrides.salaryRange !== undefined ? overrides.salaryRange : template.salaryRange,
    applicationUrl: overrides.applicationUrl || `https://careers.${companySlug}.example.com/apply/${jobCounter}`,
    contactEmail: overrides.contactEmail || `jobs@${companySlug}.example.com`,
    posterId: overrides.posterId !== undefined ? overrides.posterId : null,
    status: overrides.status || 'Active',
    deadline: overrides.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    ...overrides
  };
}

/**
 * Generate a batch of mock JobPostings
 * 
 * @param {number} [count=5] - Number of job postings to create
 * @param {Object} [overrides={}] - Attributes to override on every item
 * @returns {Array<Object>}
 */
function createJobPostings(count = 5, overrides = {}) {
  const postings = [];
  for (let i = 0; i < count; i += 1) {
    postings.push(buildJobPosting(overrides));
  }
  return postings;
}

module.exports = {
  buildJobPosting,
  createJobPostings,
  JOB_TYPES,
  STATUSES,
  COMPANIES,
  LOCATIONS
};
