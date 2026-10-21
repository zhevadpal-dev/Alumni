/**
 * Centralized Model & Relational Registry
 * 
 * Aggregates all database entity models and defines the relational mapping
 * (1-to-Many, Belongs-To) between User, Announcement, and JobPosting entities.
 * 
 * References: docs/ddd.md (Section 3, 4, 6, 8)
 */

const UserModel = require('./userModel');
const AnnouncementModel = require('./announcementModel');
const JobPostingModel = require('./jobPostingModel');
const ApplicationModel = require('./applicationModel');

/**
 * Platform Domain Relations Definition
 * 
 * Documented according to relational database integrity constraints:
 * - 1 User -> Many Announcements (author_id -> users.id)
 * - 1 User -> Many JobPostings (poster_id -> users.id)
 * - 1 User -> Many Applications (user_id -> users.id)
 * - 1 User <-> Many JobPostings (Many-to-Many through applications)
 * - 1 Announcement -> Belongs To User (author_id)
 * - 1 JobPosting -> Belongs To User (poster_id)
 * - 1 JobPosting -> Many Applications (job_id -> job_postings.id)
 * - 1 Application -> Belongs To User (user_id)
 * - 1 Application -> Belongs To JobPosting (job_id)
 */
const RELATIONS = {
  User: {
    hasMany: [
      {
        target: 'Announcement',
        model: AnnouncementModel,
        foreignKey: 'authorId',
        as: 'announcements',
        onDelete: 'SET NULL',
        accessor: 'getAnnouncements'
      },
      {
        target: 'JobPosting',
        model: JobPostingModel,
        foreignKey: 'posterId',
        as: 'jobPostings',
        onDelete: 'SET NULL',
        accessor: 'getJobPostings'
      },
      {
        target: 'Application',
        model: ApplicationModel,
        foreignKey: 'userId',
        as: 'applications',
        onDelete: 'CASCADE',
        accessor: 'getApplications'
      }
    ],
    manyToMany: [
      {
        target: 'JobPosting',
        through: 'Application',
        model: JobPostingModel,
        as: 'appliedJobs',
        accessor: 'getAppliedJobs'
      }
    ]
  },
  Announcement: {
    belongsTo: [
      {
        target: 'User',
        model: UserModel,
        foreignKey: 'authorId',
        as: 'authorUser',
        accessor: 'getAuthor'
      }
    ]
  },
  JobPosting: {
    belongsTo: [
      {
        target: 'User',
        model: UserModel,
        foreignKey: 'posterId',
        as: 'poster',
        accessor: 'getPoster'
      }
    ],
    hasMany: [
      {
        target: 'Application',
        model: ApplicationModel,
        foreignKey: 'jobId',
        as: 'applications',
        onDelete: 'CASCADE',
        accessor: 'getApplications'
      }
    ],
    manyToMany: [
      {
        target: 'User',
        through: 'Application',
        model: UserModel,
        as: 'applicants',
        accessor: 'getApplicants'
      }
    ]
  },
  Application: {
    belongsTo: [
      {
        target: 'User',
        model: UserModel,
        foreignKey: 'userId',
        as: 'applicant',
        accessor: 'getApplicant'
      },
      {
        target: 'JobPosting',
        model: JobPostingModel,
        foreignKey: 'jobId',
        as: 'jobPosting',
        accessor: 'getJobPosting'
      }
    ]
  }
};

module.exports = {
  UserModel,
  AnnouncementModel,
  JobPostingModel,
  ApplicationModel,
  RELATIONS
};

