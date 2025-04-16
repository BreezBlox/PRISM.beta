/**
 * PRISM Department Selector Component
 * Creates a reusable dropdown component for selecting departments
 * that will integrate with the existing PRISM application
 */

/**
 * DepartmentSelector - Creates and manages department selection dropdowns
 */
class DepartmentSelector {
  /**
   * Create a new department selector
   * @param {Object} options - Configuration options
   * @param {String} options.containerId - ID of the container element to insert the dropdown
   * @param {String} options.name - Input name attribute
   * @param {String} options.id - Input ID attribute
   * @param {String} options.label - Label text
   * @param {String} options.selectedValue - Initially selected value
   * @param {Function} options.onChange - Change event handler
   * @param {Boolean} options.required - Whether the selection is required
   */
  constructor(options = {}) {
    this.containerId = options.containerId || 'department-dropdown-container';
    this.name = options.name || 'department';
    this.id = options.id || 'department-select';
    this.label = options.label || 'Department';
    this.selectedValue = options.selectedValue || '';
    this.onChange = options.onChange || null;
    this.required = options.required || false;
    
    this.container = document.getElementById(this.containerId);
    
    if (!this.container) {
      console.error(`Container element with ID "${this.containerId}" not found.`);
      return;
    }
    
    this.render();
  }
  
  /**
   * Render the department dropdown
   */
  render() {
    // Get departments from the manager
    const departments = typeof departmentManager !== 'undefined' 
      ? departmentManager.getAllDepartments() 
      : this.getDefaultDepartments();
    
    // Create the dropdown element
    const dropdownHtml = `
      <div class="form-group">
        <label for="${this.id}">${this.label}${this.required ? ' *' : ''}</label>
        <select id="${this.id}" name="${this.name}" class="form-control" ${this.required ? 'required' : ''}>
          <option value="">Select a department</option>
          ${departments.map(dept => `
            <option value="${dept}" ${this.selectedValue === dept ? 'selected' : ''}>
              ${dept}
            </option>
          `).join('')}
        </select>
        <div class="department-actions">
          <a href="./settings.html" class="manage-departments-link" title="Manage Departments">
            <small>Manage Departments</small>
          </a>
        </div>
      </div>
    `;
    
    // Insert the dropdown HTML
    this.container.innerHTML = dropdownHtml;
    
    // Add event listener
    const selectElement = document.getElementById(this.id);
    if (selectElement && typeof this.onChange === 'function') {
      selectElement.addEventListener('change', (e) => {
        this.onChange(e.target.value, e);
      });
    }
  }
  
  /**
   * Get the current selected value
   * @returns {String} Selected department value
   */
  getValue() {
    const selectElement = document.getElementById(this.id);
    return selectElement ? selectElement.value : '';
  }
  
  /**
   * Set the dropdown value
   * @param {String} value - Value to select
   */
  setValue(value) {
    const selectElement = document.getElementById(this.id);
    if (selectElement) {
      selectElement.value = value;
      
      // Trigger change event
      if (typeof this.onChange === 'function') {
        this.onChange(value, { target: selectElement });
      }
    }
  }
  
  /**
   * Update the dropdown options
   */
  update() {
    this.render();
  }
  
  /**
   * Fallback departments list if departmentManager is not available
   * @returns {Array} Default departments array
   */
  getDefaultDepartments() {
    return [
      "Engineering",
      "Quality Control",
      "Production",
      "Assembly",
      "Finishing",
      "Packaging",
      "Maintenance",
      "Logistics"
    ];
  }
}

/**
 * Initialize department selectors on the page
 * This function can be called to refresh all selectors after department changes
 */
function initDepartmentSelectors() {
  // Look for containers with the data-department-selector attribute
  const containers = document.querySelectorAll('[data-department-selector]');
  
  containers.forEach(container => {
    // Clear existing content first to ensure fresh rendering
    container.innerHTML = '';
    
    const id = container.id;
    const name = container.getAttribute('data-name') || 'department';
    const label = container.getAttribute('data-label') || 'Department';
    const required = container.getAttribute('data-required') === 'true';
    const selectedValue = container.getAttribute('data-selected') || '';
    
    new DepartmentSelector({
      containerId: id,
      name: name,
      id: `${id}-select`,
      label: label,
      selectedValue: selectedValue,
      required: required
    });
  });
}

// Initialize all department selectors when the document is ready
// This is now handled in index.html where both scripts are properly loaded
// document.addEventListener('DOMContentLoaded', () => {
//   // If the departmentManager is not available, load it dynamically
//   if (typeof departmentManager === 'undefined') {
//     const script = document.createElement('script');
//     script.src = './static/js/department-manager.js';
//     script.onload = initDepartmentSelectors;
//     document.head.appendChild(script);
//   } else {
//     initDepartmentSelectors();
//   }
// });
