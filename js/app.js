// Array of society committee members
var societyMembers ;
var rulesList ;

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

async function fetchRules(){
    try {
       const response = await fetch(rulesApiUrl);
       rulesList = await response.json();
    } catch (error) {
       console.error("Error fetching rules:", error);
    }
}

fetchRules();

 function loadRules() {
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
    };

  function displayCommitee() {
        try {
            const committeesContainer = document.getElementById('committees');
            // Clear existing content
            committeesContainer.innerHTML = '';
            // Render each rule as a card

      let committeeMembers = societyMembers.filter(function(member){return member.responsibility!="N/A" })
      console.log(committeeMembers)
            // <li class="list-group-item"><strong>1. All Society Garbage:</strong> Shriram Deshpande (Flat 108)</li>
            committeeMembers.forEach((committeeMember, index) => {
                const ruleCard = document.createElement('li');
                ruleCard.className = "list-group-item";
                ruleCard.innerHTML = `
                <strong>${index + 1}. ${committeeMember.responsibility}:</strong> ${committeeMember.ownerName} (Flat ${committeeMember.flatNumber})`;
                committeesContainer.appendChild(ruleCard);
            });
        } catch (error) {
            console.error("Error fetching rules:", error);
        }
    };


// Event Listener for Login Form Submit
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const flatNumber = document.getElementById('flatNumber').value;
    if(flatNumber=='12345'){
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