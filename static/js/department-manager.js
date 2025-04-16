/**
 * PRISM Department Management Module
 * Handles the storage and retrieval of custom department titles
 */

// Default departments to use if no custom ones exist
const DEFAULT_DEPARTMENTS = [
  "Engineering",
  "Quality Control",
  "Production",
  "Assembly",
  "Finishing",
  "Packaging",
  "Maintenance",
  "Logistics"
];

/**
 * DepartmentManager - Manages department data for PRISM
 */
class DepartmentManager {
  constructor() {
    this.storageKey = 'prism_departments';
    this.departments = this.loadDepartments();
  }

  /**
   * Load departments from localStorage or use defaults
   * @returns {Array} Array of department titles
   */
  loadDepartments() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
      return [...DEFAULT_DEPARTMENTS]; // Return a copy of defaults
    } catch (err) {
      console.error('Error loading departments:', err);
      return [...DEFAULT_DEPARTMENTS]; // Return a copy of defaults on error
    }
  }

  /**
   * Save departments to localStorage
   * @returns {Boolean} Success status
   */
  saveDepartments() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.departments));
      return true;
    } catch (err) {
      console.error('Error saving departments:', err);
      return false;
    }
  }

  /**
   * Get all departments
   * @returns {Array} Array of department titles
   */
  getAllDepartments() {
    // Always reload from localStorage to get latest changes
    this.departments = this.loadDepartments();
    return [...this.departments]; // Return a copy to prevent accidental modification
  }

  /**
   * Add a new department
   * @param {String} title - Department title to add
   * @returns {Boolean} Success status
   */
  addDepartment(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return false;
    }

    // Prevent duplicates (case-insensitive)
    const normalizedTitle = title.trim();
    const exists = this.departments.some(
      dept => dept.toLowerCase() === normalizedTitle.toLowerCase()
    );

    if (exists) {
      return false;
    }

    this.departments.push(normalizedTitle);
    return this.saveDepartments();
  }

  /**
   * Update an existing department
   * @param {Number} index - Index of department to update
   * @param {String} newTitle - New department title
   * @returns {Boolean} Success status
   */
  updateDepartment(index, newTitle) {
    if (
      index < 0 || 
      index >= this.departments.length || 
      !newTitle || 
      typeof newTitle !== 'string' || 
      newTitle.trim() === ''
    ) {
      return false;
    }

    // Prevent duplicates (case-insensitive)
    const normalizedTitle = newTitle.trim();
    const existingIndex = this.departments.findIndex(
      dept => dept.toLowerCase() === normalizedTitle.toLowerCase()
    );

    if (existingIndex !== -1 && existingIndex !== index) {
      return false;
    }

    this.departments[index] = normalizedTitle;
    return this.saveDepartments();
  }

  /**
   * Remove a department
   * @param {Number} index - Index of department to remove
   * @returns {Boolean} Success status
   */
  removeDepartment(index) {
    if (index < 0 || index >= this.departments.length) {
      return false;
    }

    this.departments.splice(index, 1);
    return this.saveDepartments();
  }

  /**
   * Reset departments to default values
   * @returns {Boolean} Success status
   */
  resetToDefaults() {
    this.departments = [...DEFAULT_DEPARTMENTS];
    return this.saveDepartments();
  }
}

// Export a singleton instance
const departmentManager = new DepartmentManager();

// Make departments available to the React application via a global variable
window.PRISM_DEPARTMENTS = departmentManager.getAllDepartments();

// Override methods to keep the global variable in sync
const originalAddDepartment = departmentManager.addDepartment;
departmentManager.addDepartment = function(title) {
  const result = originalAddDepartment.call(this, title);
  if (result) {
    window.PRISM_DEPARTMENTS = this.getAllDepartments();
  }
  return result;
};

const originalUpdateDepartment = departmentManager.updateDepartment;
departmentManager.updateDepartment = function(index, newTitle) {
  const result = originalUpdateDepartment.call(this, index, newTitle);
  if (result) {
    window.PRISM_DEPARTMENTS = this.getAllDepartments();
  }
  return result;
};

const originalRemoveDepartment = departmentManager.removeDepartment;
departmentManager.removeDepartment = function(index) {
  const result = originalRemoveDepartment.call(this, index);
  if (result) {
    window.PRISM_DEPARTMENTS = this.getAllDepartments();
  }
  return result;
};

const originalResetToDefaults = departmentManager.resetToDefaults;
departmentManager.resetToDefaults = function() {
  const result = originalResetToDefaults.call(this);
  if (result) {
    window.PRISM_DEPARTMENTS = this.getAllDepartments();
  }
  return result;
};
