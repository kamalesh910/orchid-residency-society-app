// Predefined Data
let tenants = [];
let payments = [
    { flatNumber: 201, amount: 1500, status: "Pending", screenshot: "https://via.placeholder.com/300" },
    { flatNumber: 202, amount: 2000, status: "Verified", screenshot: "https://via.placeholder.com/300" },
    { flatNumber: 203, amount: 1000, status: "Rejected", screenshot: "https://via.placeholder.com/300" }
];
let violations = [
    { flatNumber: 101, detail: "Noise Complaint", penalty: 500 },
    { flatNumber: 102, detail: "Unauthorized Parking", penalty: 1000 }
];

// Modal Data
let currentEditItem = null;
let currentEditType = null;

// Toggle Visibility of Sections
function toggleVisibility(sectionId) {
    $('.section').fadeOut();
    $(`#${sectionId}`).fadeIn();
    filterTenants('all');
    filterPayments('all');
    populateViolations();
    renderRulesTable();
}

// Tenant Management
function filterTenants(filter) {
    const table = document.getElementById("tenantTable");
    table.innerHTML = ""; // Clear the table

    tenants = societyMembers.filter(member=> {return member.flatStatus=="Rented"})

    tenants
        .filter(tenant => 
            filter === 'all' || 
            (filter === 'verified' && tenant.tenantVerification) || 
            (filter === 'unverified' && !tenant.tenantVerification)
        )
        .forEach(tenant => {
            table.innerHTML += `
                <tr>
                    <td>${tenant.flatNumber} ${tenant.ownerName}</td>
                    <td>${tenant.tenantName || "Not Verified"}</td>
                    <td>${tenant.tenantContact || "-"}</td>
                    <td>${tenant.tenantVerification ? "Verified" : "Unverified"}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editTenant(${tenant.flatNumber})">Edit</button>
                    </td>
                </tr>
            `;
        });
}

function editTenant(flatNumber) {
    currentEditType = 'tenant';
    currentEditItem = tenants.find(tenant => tenant.flatNumber === flatNumber);

    if (currentEditItem) {
        document.getElementById("modalInput").value = JSON.stringify({
            tenantName: currentEditItem.tenantName,
            contact: currentEditItem.contact
        });
        $('#editModal').modal('show');
    }
}

// Payment Management
function filterPayments(filter) {
    const table = document.getElementById("paymentTable");
    table.innerHTML = ""; // Clear the table

    payments
        .filter(payment => filter === 'all' || payment.status.toLowerCase() === filter)
        .forEach(payment => {
            table.innerHTML += `
                <tr>
                    <td>${payment.flatNumber}</td>
                    <td>${payment.amount}</td>
                    <td>${payment.status}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewScreenshot('${payment.screenshot}')">View</button>
                        <button class="btn btn-success btn-sm" onclick="updatePaymentStatus(${payment.flatNumber}, 'Verified')">Verify</button>
                        <button class="btn btn-danger btn-sm" onclick="updatePaymentStatus(${payment.flatNumber}, 'Rejected')">Reject</button>
                    </td>
                </tr>
            `;
        });
}

function viewScreenshot(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

function updatePaymentStatus(flatNumber, status) {
    const payment = payments.find(p => p.flatNumber === flatNumber);
    if (payment) {
        payment.status = status;
        filterPayments('all'); // Refresh the table
    }
}

// Violation Management
function addViolation() {
    const flatNumber = document.getElementById("violationFlat").value;
    const detail = document.getElementById("violationDetail").value;
    const penalty = document.getElementById("violationPenalty").value;

    if (flatNumber && detail && penalty) {
        violations.push({ flatNumber, detail, penalty });
        populateViolations();
        document.getElementById("addViolationForm").reset(); // Clear the form
    }
}

function populateViolations() {
    const table = document.getElementById("violationTable");
    table.innerHTML = ""; // Clear the table

    violations.forEach((violation, index) => {
        table.innerHTML += `
            <tr>
                <td>${violation.flatNumber}</td>
                <td>${violation.detail}</td>
                <td>${violation.penalty}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteViolation(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function deleteViolation(index) {
    violations.splice(index, 1);
    populateViolations();
}

// Modal Save Changes
document.getElementById("saveChangesBtn").addEventListener("click", () => {
    const updatedValue = document.getElementById("modalInput").value;

    if (currentEditType === 'tenant' && currentEditItem) {
        const updatedDetails = JSON.parse(updatedValue);
        currentEditItem.tenantName = updatedDetails.tenantName;
        currentEditItem.contact = updatedDetails.contact;
        currentEditItem.verified = true; // Mark as verified after edit
        filterTenants('all'); // Refresh the tenant list
    } else if (currentEditType === 'rule' && currentEditItem) {
        currentEditItem.text = updatedValue;
        populateRules(); // Refresh the rules list
    }

    $('#editModal').modal('hide');
});

// Initialize Tables
filterTenants('all');
filterPayments('all');
populateViolations();

// Function to Populate the Rules Table
function renderRulesTable() {
    const tableBody = document.getElementById("rules-table-body");
    tableBody.innerHTML = ""; // Clear existing rows
    rulesList.forEach((rule,index) => {
        const row = `
            <tr>
                <td>${index+1}</td>
                <td>${rule.title}</td>
                <td>${rule.description}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="openEditModal(${rule.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRule(${rule.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to Open Edit Modal
function openEditModal(ruleId) {
    const rule = rulesList.find(r => r.id === ruleId);
    if (rule) {
        document.getElementById("ruleId").value = rule.id;
        document.getElementById("ruleTitle").value = rule.title;
        document.getElementById("ruleDescription").value = rule.description;
        const editModal = new bootstrap.Modal(document.getElementById("editRuleModal"));
        editModal.show();
    }
}

// Function to Save Edited Rule
document.getElementById("editRuleForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const ruleId = parseInt(document.getElementById("ruleId").value, 10);
    const updatedTitle = document.getElementById("ruleTitle").value;
    const updatedDescription = document.getElementById("ruleDescription").value;

    // Update Rule in the Array
    const ruleIndex = rules.findIndex(r => r.id === ruleId);
    if (ruleIndex !== -1) {
        rulesList[ruleIndex].title = updatedTitle;
        rulesList[ruleIndex].description = updatedDescription;
    }

    // Close Modal and Re-render Table
    const editModal = bootstrap.Modal.getInstance(document.getElementById("editRuleModal"));
    editModal.hide();
    renderRulesTable();
});

// Function to Delete Rule
function deleteRule(ruleId) {
    rulesList = rulesList.filter(rule => rule.id !== ruleId); // Remove the rule by ID
    renderRulesTable();
}