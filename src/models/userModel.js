/**
 * User Model (In-Memory Data Access Layer)
 * Manages user records, entity validations, and state mutations.
 */

// In-memory data store (simulating database table)
const users = [
  {
    id: 1,
    name: 'Sample Alumni',
    email: 'alumni@example.com',
    role: 'alumni',
    department: 'Computer Science',
    graduationYear: 2023,
    createdAt: new Date().toISOString()
  }
];

class UserModel {
  /**
   * Retrieve all user records
   * @returns {Array<Object>}
   */
  static findAll() {
    return users;
  }

  /**
   * Find a user record by its unique numeric ID
   * @param {number} id
   * @returns {Object|undefined}
   */
  static findById(id) {
    return users.find(u => u.id === id);
  }

  /**
   * Find a user record by its email address (case-insensitive)
   * @param {string} email
   * @returns {Object|undefined}
   */
  static findByEmail(email) {
    if (!email) return undefined;
    return users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  /**
   * Create and persist a new user record
   * @param {Object} userData
   * @returns {Object} Newly created user
   */
  static create(userData) {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: userData.name.trim(),
      email: userData.email.trim(),
      role: userData.role ? userData.role.trim() : 'alumni',
      department: userData.department ? userData.department.trim() : null,
      graduationYear: userData.graduationYear ? Number(userData.graduationYear) : null,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    return newUser;
  }

  /**
   * Completely replace/update an existing user record (PUT)
   * @param {number} id
   * @param {Object} updateData
   * @returns {Object|null}
   */
  static update(id, updateData) {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    users[userIndex] = {
      ...users[userIndex],
      name: updateData.name.trim(),
      email: updateData.email.trim(),
      role: updateData.role ? updateData.role.trim() : 'alumni',
      department: updateData.department ? updateData.department.trim() : null,
      graduationYear: updateData.graduationYear ? Number(updateData.graduationYear) : null,
      updatedAt: new Date().toISOString()
    };

    return users[userIndex];
  }

  /**
   * Partially update an existing user record (PATCH)
   * @param {number} id
   * @param {Object} patchData
   * @returns {Object|null}
   */
  static patch(id, patchData) {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    const user = users[userIndex];
    if (patchData.name !== undefined) user.name = patchData.name.trim();
    if (patchData.email !== undefined) user.email = patchData.email.trim();
    if (patchData.role !== undefined) user.role = patchData.role.trim();
    if (patchData.department !== undefined) user.department = patchData.department.trim();
    if (patchData.graduationYear !== undefined) user.graduationYear = Number(patchData.graduationYear);
    user.updatedAt = new Date().toISOString();

    return user;
  }

  /**
   * Delete a user record by ID
   * @param {number} id
   * @returns {Object|null} Deleted user object or null
   */
  static delete(id) {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;

    const [deletedUser] = users.splice(userIndex, 1);
    return deletedUser;
  }
}

module.exports = UserModel;
