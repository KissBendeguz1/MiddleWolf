/**
 * Fetches available employees (private profile type not in employees table)
 * and populates the recruitment modal dropdown
 */
function loadAvailableEmployees() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "http://78.92.125.103:6969/api/availableEmployees/private",
    true,
  );
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);

        if (response.success && response.users && response.users.length > 0) {
          populateEmployeesDropdown(response.users);
        } else {
          const select = document.getElementById("available-employees");
          if (select) {
            // Clear options except first one
            while (select.options.length > 1) {
              select.remove(1);
            }
            // Add no employees option
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "-- Nincs elérhető alkalmazott --";
            option.disabled = true;
            select.appendChild(option);
          }
        }
      } else {
        console.error("Error loading available employees:", xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify({}));
}

/**
 * Validates recruitment form inputs
 * @returns {Object} - Validation result with isValid boolean and errorMessage string
 */
function validateRecruitmentForm() {
  const employeeSelect = document
    .getElementById("available-employees")
    .value.trim();
  const position = document.getElementById("recruitment-position").value.trim();

  // Check if employee is selected
  if (!employeeSelect) {
    return {
      isValid: false,
      errorMessage: "Kérjük válasszon egy alkalmazottat a legördülő menüből",
    };
  }

  // Check if position is empty
  if (!position) {
    return {
      isValid: false,
      errorMessage: "Kérjük adja meg a munkakört",
    };
  }

  // Check minimum position length
  if (position.length < 2) {
    return {
      isValid: false,
      errorMessage: "A munkakör legalább 2 karakter hosszú kell, hogy legyen",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
}

/**
 * Validates position change form inputs
 * @returns {Object} - Validation result with isValid boolean and errorMessage string
 */
function validatePositionForm() {
  const position = document.getElementById("new-position").value.trim();

  // Check if position is empty
  if (!position) {
    return {
      isValid: false,
      errorMessage: "Kérjük adja meg az új munkakört",
    };
  }

  // Check minimum position length
  if (position.length < 2) {
    return {
      isValid: false,
      errorMessage: "A munkakör legalább 2 karakter hosszú kell, hogy legyen",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
}

/**
 * Populates the available employees dropdown
 * @param {Array} employees - Array of employee objects with id, name properties
 * @example
 * populateEmployeesDropdown([
 *   { ID: 1, name: "John Doe" },
 *   { ID: 2, name: "Jane Smith" }
 * ])
 */
function populateEmployeesDropdown(employees) {
  const select = document.getElementById("available-employees");
  if (!select) return;

  // Clear existing options except the first one
  while (select.options.length > 1) {
    select.remove(1);
  }

  // Add employee options
  employees.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee.ID || employee.id;
    option.textContent = employee.name || employee.Name || "Unknown";
    select.appendChild(option);
  });
}

/**
 * Gets the selected employee ID from recruitment modal
 * @returns {string} - The selected employee ID
 */
function getSelectedEmployeeId() {
  return document.getElementById("available-employees").value;
}

/**
 * Gets the position from recruitment modal
 * @returns {string} - The position value
 */
function getRecruitmentPosition() {
  return document.getElementById("recruitment-position").value.trim();
}

/**
 * Gets the new position from position change modal
 * @returns {string} - The new position value
 */
function getNewPosition() {
  return document.getElementById("new-position").value.trim();
}

/**
 * Open recruitment modal
 */
function openRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) {
    modal.style.display = "flex";
    document.getElementById("recruitment-form").reset();
    loadAvailableEmployees();
  }
}

/**
 * Close recruitment modal
 */
function closeRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) {
    modal.style.display = "none";
    document.getElementById("recruitment-form").reset();
  }
}

/**
 * Open position change modal
 */
function openPositionModal() {
  const modal = document.getElementById("position-modal");
  if (modal) {
    modal.style.display = "flex";
    document.getElementById("position-form").reset();
  }
}

/**
 * Close position change modal
 */
function closePositionModal() {
  const modal = document.getElementById("position-modal");
  if (modal) {
    modal.style.display = "none";
    document.getElementById("position-form").reset();
  }
}

/**
 * Close modal when clicking outside of modal content
 */
window.addEventListener("click", function (event) {
  const recruitmentModal = document.getElementById("recruitment-modal");
  const positionModal = document.getElementById("position-modal");

  if (event.target === recruitmentModal) {
    closeRecruitmentModal();
  }

  if (event.target === positionModal) {
    closePositionModal();
  }
});
