// Array of society committee members
var societyMembers ;

const usersApiUrl = "https://6761aa4246efb37323728d99.mockapi.io/api/residence/users";
const rulesApiUrl = "https://6761aa4246efb37323728d99.mockapi.io/api/residence/rules";

// Function to fetch and display data
async function loadSocietyMembers() {
    try {
        const response = await fetch(usersApiUrl);
        const data = await response.json();
        societyMembers=data;
    }
    catch (error) {
        console.error("Error fetching societyMembers:", error);
    }
}

loadSocietyMembers();

async function loadRules() {
        try {
            const response = await fetch(rulesApiUrl);
            const rules = await response.json();
            const rulesContainer = document.getElementById('rulesContainer');

            // Clear existing content
            rulesContainer.innerHTML = '';

            // Render each rule as a card
            rules.forEach((rule, index) => {
                const ruleCard = document.createElement('div');
                ruleCard.className = "card rule-card mb-3";
                ruleCard.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${index + 1}. ${rule.title}</h5>
            <p>${rule.description}</p>
        </div>
    `;
                rulesContainer.appendChild(ruleCard);
            });
        } catch (error) {
            console.error("Error fetching rules:", error);
        }
    };


// Event Listener for Login Form Submit
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const flatNumber = document.getElementById('flatNumber').value;
    if(flatNumber=='admin123'){
        window.location.href = 'admin.html';
    }
    else{
    const ownerDetails = societyMembers.find(member => member.flatNumber == flatNumber);

    if (ownerDetails) {
        // Save owner details in localStorage
        localStorage.setItem('ownerDetails', JSON.stringify(ownerDetails));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert("Flat number not found or invalid. Please try again.");
    }
}
});

// Fetch owner details when on the dashboard page
if (window.location.pathname.includes("dashboard.html")) {
    const ownerDetails = JSON.parse(localStorage.getItem('ownerDetails'));

    if (ownerDetails) {
        document.getElementById('ownerName').textContent = `${ownerDetails.ownerName}`;
        document.getElementById('flatNumber').innerHTML = `<strong>Flat Number:</strong> ${ownerDetails.flatNumber}`;
        document.getElementById('responsibility').innerHTML = `<strong>Responsibility:</strong> ${ownerDetails.responsibility}`;
        document.getElementById('flatStatus').innerHTML = `<strong>Flat Status:</strong> ${ownerDetails.flatStatus}`;
        document.getElementById('contact').innerHTML = `<strong>Contact:</strong> ${ownerDetails.contact}`;
        if (ownerDetails.tenantName) {
            document.getElementById('tenantDetails').innerHTML = `<strong>Tenant:</strong> ${ownerDetails.tenantName} (Contact: ${ownerDetails.tenantContact})`;
        } else if(ownerDetails.flatStatus=='Rented') {
            document.getElementById('tenantDetails').innerHTML = "No tenant information available.";
        }
    } else {
        alert("No owner details found.");
    }
}



// // document.addEventListener('DOMContentLoaded', () => {
// //     const loginForm = document.getElementById('loginForm');

// //     // Mock Login Functionality
// //     loginForm.addEventListener('submit', (e) => {
// //         e.preventDefault();
// //         const email = document.getElementById('email').value;
// //         const password = document.getElementById('password').value;

// //         // Mock Authentication
// //         if (email === "kdhage910@gmail.com" && password === "7709034069") {
// //             window.location.href = "dashboard.html";
// //         } else {
// //             alert("Invalid email or password.");
// //         }
// //     });
// // });


// // Load Violations
// fetch('data/violations.json')
//     .then(response => response.json())
//     .then(data => {
//         const tableBody = document.querySelector('#violations tbody');
//         tableBody.innerHTML = ''; // Clear existing rows
//         data.forEach(violation => {
//             const row = `
//                 <tr>
//                     <td>${violation.date}</td>
//                     <td>${violation.violation}</td>
//                     <td>${violation.status}</td>
//                 </tr>
//             `;
//             tableBody.innerHTML += row;
//         });
//     });

// // Load Committee Members
// fetch('data/committee.json')
//     .then(response => response.json())
//     .then(data => {
//         const list = document.querySelector('#committee .list-group');
//         list.innerHTML = ''; // Clear existing list
//         data.forEach(member => {
//             const listItem = `
//                 <li class="list-group-item">
//                     ${member.role}: ${member.name} (${member.contact})
//                 </li>
//             `;
//             list.innerHTML += listItem;
//         });
//     });

// // Load Services
// fetch('data/services.json')
//     .then(response => response.json())
//     .then(data => {
//         const tableBody = document.querySelector('#services tbody');
//         tableBody.innerHTML = ''; // Clear existing rows
//         data.forEach(service => {
//             const row = `
//                 <tr>
//                     <td>${service.service}</td>
//                     <td>${service.last_maintenance}</td>
//                     <td>${service.next_scheduled}</td>
//                 </tr>
//             `;
//             tableBody.innerHTML += row;
//         });
//     });
