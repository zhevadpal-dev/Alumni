/**
 * Announcement Model (In-Memory Data Access & Entity Layer)
 * 
 * Provides an in-memory data store simulating a database table for announcements
 * without requiring an external database connection.
 * Implements complete CRUD (Create, Read, Update, Delete) operations, schema validation,
 * query filtering, and data consistency safeguards.
 */

// Initial seed data for development, testing, and initial bootstrap
const initialSeedAnnouncements = [
  {
    id: 1,
    title: 'Annual Alumni Homecoming 2026',
    content: 'We are thrilled to welcome all alumni back to campus for the Annual Homecoming Weekend featuring networking dinners, department tours, and the alumni award ceremony.',
    author: 'Alumni Relations Office',
    category: 'Event',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: 'Spring 2026 Mentorship Program Applications Open',
    content: 'Connect with current undergraduate students to provide career mentorship, portfolio reviews, and industry guidance. Applications are open until the end of the month.',
    author: 'Career Development Center',
    category: 'Career',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: 'Alumni Spotlight: Tech Innovations in Artificial Intelligence',
    content: 'Join our upcoming webinar with distinguished alumni pioneers discussing recent breakthroughs in AI systems, ethical machine learning, and practical production engineering.',
    author: 'Faculty of Engineering',
    category: 'Academic',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// In-memory array data store (mutable state)
let announcements = JSON.parse(JSON.stringify(initialSeedAnnouncements));

class AnnouncementModel {
  /**
   * Allowed announcement categories
   */
  static CATEGORIES = ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'];

  // ==========================================
  // READ (R)
  // ==========================================

  /**
   * Retrieve all announcements with optional filtering, search, and pagination.
   * 
   * @param {Object} [filter={}] - Query options
   * @param {string} [filter.category] - Filter by category (e.g. 'Event', 'Career')
   * @param {string} [filter.search] - Search substring in title, content, or author
   * @param {string} [filter.q] - Alternative search parameter
   * @param {string} [filter.author] - Filter by author
   * @param {number|string} [filter.limit] - Limit maximum returned records
   * @param {number|string} [filter.page=1] - Page number for pagination
   * @returns {Array<Object>} Cloned array of matching announcement records
   */
  static getAll(filter = {}) {
    let result = [...announcements];

    // Filter by category
    if (filter.category) {
      const targetCategory = String(filter.category).trim().toLowerCase();
      result = result.filter(a => a.category && a.category.toLowerCase() === targetCategory);
    }

    // Filter by author
    if (filter.author) {
      const targetAuthor = String(filter.author).trim().toLowerCase();
      result = result.filter(a => a.author && a.author.toLowerCase().includes(targetAuthor));
    }

    // Search in title, content, or author
    const searchQuery = filter.search || filter.q;
    if (searchQuery) {
      const queryLower = String(searchQuery).trim().toLowerCase();
      result = result.filter(a =>
        (a.title && a.title.toLowerCase().includes(queryLower)) ||
        (a.content && a.content.toLowerCase().includes(queryLower)) ||
        (a.author && a.author.toLowerCase().includes(queryLower))
      );
    }

    // Default sort: newest first (by id or createdAt descending)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    if (filter.limit) {
      const limit = Math.max(1, parseInt(filter.limit, 10));
      const page = filter.page ? Math.max(1, parseInt(filter.page, 10)) : 1;
      const startIndex = (page - 1) * limit;
      result = result.slice(startIndex, startIndex + limit);
    }

    return result.map(a => ({ ...a }));
  }

  /**
   * Find an announcement by its numeric ID.
   * 
   * @param {number|string} id - Announcement ID
   * @returns {Object|null} Matching announcement or null if not found
   */
  static getById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const announcement = announcements.find(a => a.id === numericId);
    return announcement ? { ...announcement } : null;
  }

  // ==========================================
  // CREATE (C)
  // ==========================================

  /**
   * Create and persist a new announcement in memory.
   * 
   * @param {Object} data - Announcement attributes
   * @param {string} data.title - Title (required)
   * @param {string} data.content - Body content (required)
   * @param {string} [data.author='Alumni Relations'] - Author / publishing department
   * @param {string} [data.category='General'] - Category
   * @returns {Object} Newly created announcement
   * @throws {Error} If validation fails
   */
  static create(data) {
    const validation = this.validate(data, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const nextId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
    const now = new Date().toISOString();

    const newAnnouncement = {
      id: nextId,
      title: data.title.trim(),
      content: data.content.trim(),
      author: data.author && data.author.trim() ? data.author.trim() : 'Alumni Relations Office',
      category: data.category && this.CATEGORIES.map(c => c.toLowerCase()).includes(data.category.trim().toLowerCase())
        ? this.CATEGORIES.find(c => c.toLowerCase() === data.category.trim().toLowerCase())
        : 'General',
      createdAt: now,
      updatedAt: now
    };

    announcements.push(newAnnouncement);
    return { ...newAnnouncement };
  }

  // ==========================================
  // UPDATE (U)
  // ==========================================

  /**
   * Update an existing announcement by ID.
   * 
   * @param {number|string} id - Announcement ID
   * @param {Object} data - Updated attributes
   * @returns {Object|null} Updated announcement or null if not found
   * @throws {Error} If validation fails
   */
  static update(id, data) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const index = announcements.findIndex(a => a.id === numericId);
    if (index === -1) return null;

    const validation = this.validate(data, true);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const existing = announcements[index];
    const updatedAnnouncement = {
      ...existing,
      title: data.title !== undefined && data.title.trim() ? data.title.trim() : existing.title,
      content: data.content !== undefined && data.content.trim() ? data.content.trim() : existing.content,
      author: data.author !== undefined && data.author.trim() ? data.author.trim() : existing.author,
      category: data.category && this.CATEGORIES.map(c => c.toLowerCase()).includes(data.category.trim().toLowerCase())
        ? this.CATEGORIES.find(c => c.toLowerCase() === data.category.trim().toLowerCase())
        : existing.category,
      updatedAt: new Date().toISOString()
    };

    announcements[index] = updatedAnnouncement;
    return { ...updatedAnnouncement };
  }

  // ==========================================
  // DELETE (D)
  // ==========================================

  /**
   * Delete an existing announcement by ID.
   * 
   * @param {number|string} id - Announcement ID
   * @returns {Object|null} Deleted announcement or null if not found
   */
  static delete(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const index = announcements.findIndex(a => a.id === numericId);
    if (index === -1) return null;

    const [deleted] = announcements.splice(index, 1);
    return { ...deleted };
  }

  // ==========================================
  // UTILITIES & VALIDATION
  // ==========================================

  /**
   * Validate announcement input fields.
   * 
   * @param {Object} data - Attributes to validate
   * @param {boolean} [isPartial=false] - Whether partial fields are allowed (update)
   * @returns {{isValid: boolean, errors: Array<string>}}
   */
  static validate(data, isPartial = false) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Request body must be a valid JSON object.'] };
    }

    if (!isPartial) {
      if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
        errors.push('Field "title" is required and cannot be empty.');
      }
      if (!data.content || typeof data.content !== 'string' || !data.content.trim()) {
        errors.push('Field "content" is required and cannot be empty.');
      }
    } else {
      if (data.title !== undefined && (typeof data.title !== 'string' || !data.title.trim())) {
        errors.push('Field "title" cannot be empty.');
      }
      if (data.content !== undefined && (typeof data.content !== 'string' || !data.content.trim())) {
        errors.push('Field "content" cannot be empty.');
      }
    }

    if (data.category) {
      const cleanCat = String(data.category).trim().toLowerCase();
      const valid = this.CATEGORIES.some(c => c.toLowerCase() === cleanCat);
      if (!valid) {
        errors.push(`Field "category" must be one of: ${this.CATEGORIES.join(', ')}.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if an announcement with the specified ID exists.
   * 
   * @param {number|string} id - Announcement ID
   * @returns {boolean}
   */
  static exists(id) {
    return this.getById(id) !== null;
  }

  /**
   * Return the total count of announcements matching optional filter criteria.
   * 
   * @param {Object} [filter={}] - Filter criteria
   * @returns {number}
   */
  static count(filter = {}) {
    return this.getAll(filter).length;
  }

  /**
   * Reset in-memory store to initial seed dataset (useful for testing & resets).
   */
  static reset() {
    announcements = JSON.parse(JSON.stringify(initialSeedAnnouncements));
  }
}

// Aliases for compatibility
AnnouncementModel.findAll = AnnouncementModel.getAll;
AnnouncementModel.findById = AnnouncementModel.getById;
AnnouncementModel.remove = AnnouncementModel.delete;

module.exports = AnnouncementModel;
