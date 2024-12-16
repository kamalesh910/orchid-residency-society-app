// Array of society committee members
const societyCommittee = [
    { 
        "ownerName": "Shriram Deshpande", 
        "flatNumber": 108, 
        "responsibility": "All Society Garbage",
        "flatStatus": "Owned", 
        "contact": "91770903469", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Srinivas", 
        "flatNumber": 205, 
        "responsibility": "Water and Drainage Tanker Work", 
        "flatStatus": "Owned", 
        "contact": "9876543210", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Kumar Shinde", 
        "flatNumber": null, 
        "responsibility": "All Chamber Work", 
        "flatStatus": "N/A", 
        "contact": "N/A", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Paresh Kale", 
        "flatNumber": 105, 
        "responsibility": "Watchman and Parking", 
        "flatStatus": "Rented", 
        "contact": "9837456123", 
        "tenantName": "Ravi Kumar", 
        "tenantContact": "9123456789"
    },
    { 
        "ownerName": "Suraj Anbhule", 
        "flatNumber": 202, 
        "responsibility": "Lift", 
        "flatStatus": "Owned", 
        "contact": "9328456721", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Shyam Patil", 
        "flatNumber": null, 
        "responsibility": "Society Cashier", 
        "flatStatus": "N/A", 
        "contact": "N/A", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Waghmare", 
        "flatNumber": 501, 
        "responsibility": "Terrace Cleaning and Plant Maintenance", 
        "flatStatus": "Rented", 
        "contact": "9156781234", 
        "tenantName": "Anjali Patel", 
        "tenantContact": "9198765432"
    },
    { 
        "ownerName": "Devkate", 
        "flatNumber": 107, 
        "responsibility": "Maintenance of Lower and Upper Water Tanks", 
        "flatStatus": "Owned", 
        "contact": "9112233445", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Mayur Nag", 
        "flatNumber": 304, 
        "responsibility": "CCTV Maintenance", 
        "flatStatus": "Owned", 
        "contact": "9937456789", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Ravindra Pawar", 
        "flatNumber": 309, 
        "responsibility": "Safety Tank", 
        "flatStatus": "Owned", 
        "contact": "7709034069", 
        "tenantName": "", 
        "tenantContact": ""
    },
    { 
        "ownerName": "Dudhbate", 
        "flatNumber": 303, 
        "responsibility": "Maintenance of All Floor and Parking Lights", 
        "flatStatus": "Rented", 
        "contact": "9876543211", 
        "tenantName": "Karan Kumar", 
        "tenantContact": "9136547890"
    },
    { 
        "ownerName": "Amar Rajgire", 
        "flatNumber": 302, 
        "responsibility": "Floor Cleaning", 
        "flatStatus": "Owned", 
        "contact": "9801122334", 
        "tenantName": "", 
        "tenantContact": ""
    }
];


// Event Listener for Login Form Submit
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const flatNumber = document.getElementById('flatNumber').value;
    if(flatNumber=='admin123'){
        window.location.href = 'admin.html';
    }
    else{
    const ownerDetails = societyCommittee.find(member => member.flatNumber == flatNumber);

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
