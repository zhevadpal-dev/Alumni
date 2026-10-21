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

/**
 * Platform Domain Relations Definition
 * 
 * Documented according to relational database integrity constraints:
 * - 1 User -> Many Announcements (author_id -> users.id)
 * - 1 User -> Many JobPostings (poster_id -> users.id)
 * - 1 Announcement -> Belongs To User (author_id)
 * - 1 JobPosting -> Belongs To User (poster_id)
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
    ]
  }
};

module.exports = {
  UserModel,
  AnnouncementModel,
  JobPostingModel,
  RELATIONS
};
