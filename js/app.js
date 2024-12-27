// Array of society committee members
var societyMembers ;
var societyMembersrulesList ;
var servicesLogs;

const usersApiUrl = "https://6761aa4246efb37323728d99.mockapi.io/api/residence/users";
const rulesApiUrl = "https://6761aa4246efb37323728d99.mockapi.io/api/residence/rules";
const serviceLogApiUrl = "https://676ee985b353db80c3219c00.mockapi.io/api/residence/servicesLogs";


async function getAPICalls(apiUrl){
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    }
    catch (error) {
        console.error("Error fetching call :" + apiUrl, error);
    }
}

getAPICalls(rulesApiUrl).then(data=> rulesList = data);
getAPICalls(usersApiUrl).then(data=> societyMembers = data);;
getAPICalls(serviceLogApiUrl).then(data=> servicesLogs = data);;

 function displayServiceLogData(){
    const servicesLogTable = document.getElementById('servicesLogData');

    // Clear existing content
    servicesLogTable.innerHTML = '';

    // Render each entry as a card
    servicesLogs.forEach((serviceLog) => {
        const entry = document.createElement('tr');
        entry.innerHTML = `
    <td>${serviceLog.serviceName}</td>
    <td>${serviceLog.logs[serviceLog.logs.length-1].serviceDate}</td>
    <td>${addToDate(new Date(serviceLog.logs[serviceLog.logs.length-1].serviceDate), serviceLog.frequency)}</td>
`;
         servicesLogTable.appendChild(entry);
    });
    }

 function displayRules() {
            const rulesContainer = document.getElementById('rulesContainer');

            // Clear existing content
            rulesContainer.innerHTML = '';

            // Render each rule as a card
            rulesList.forEach((rule, index) => {
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

 function displayViolationsLog(){
        const violationsLogsTable = document.getElementById('violationsLogs');

        // Clear existing content
        violationsLogsTable.innerHTML = '';
        let violationsLog = JSON.parse(localStorage.getItem('ownerDetails')).violations;
        // Render each entry as a card
        violationsLog.forEach((violation) => {
            const entry = document.createElement('tr');
            entry.innerHTML = `
        <td>${violation.date}</td>
        <td>${violation.violation}</td>
        <td>${violation.penalty}</td>
    `;
         violationsLogsTable.appendChild(entry);
        });
    }

    function addToDate(date, value) {
        const newDate = new Date(date); // Clone the given date to avoid modifying the original
    
        // Extract the numeric value and the unit (e.g., '1M', '2W', '10D')
        const match = value.match(/^(\d+)([MDW])$/i);
    
        if (!match) {
            throw new Error("Invalid format. Use values like '1M', '1W', or '1D'.");
        }
    
        const amount = parseInt(match[1], 10); // Numeric value
        const unit = match[2].toUpperCase(); // Unit ('M', 'D', 'W')
    
        switch (unit) {
            case 'D': // Days
                newDate.setDate(newDate.getDate() + amount);
                break;
            case 'W': // Weeks
                newDate.setDate(newDate.getDate() + amount * 7);
                break;
            case 'M': // Months
                newDate.setMonth(newDate.getMonth() + amount);
                break;
            default:
                throw new Error("Invalid unit. Use 'M' for months, 'W' for weeks, or 'D' for days.");
        }
    
        // Format the date as yyyy-dd-mm
        const yyyy = newDate.getFullYear();
        const dd = String(newDate.getDate()).padStart(2, '0'); // Ensure 2 digits
        const mm = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    
        return `${yyyy}-${dd}-${mm}`;
    }
    
    function generatePaymentLink(payee,flatNumber,ammount){
        const paymentContainer = document.getElementById('paymentLink');
    
        // Clear existing content
        paymentContainer.innerHTML = '';
        const paylink = document.createElement('div');
        paylink.innerHTML = `
    <a href="upi://pay?pa=7709034069@ybl&pn=${flatNumber+" "+payee}&tn=Monthly Rent Flat ${flatNumber} Payment&am=${ammount}&cu=INR"
                        class="btn btn-primary btn-lg">
                        Pay ₹${ammount} Maintenance via PhonePe
                    </a>
    `;
    
    paymentContainer.appendChild(paylink);
    }

    function enableAdminButton(isAdmin){
        if(isAdmin){
        const appSections = document.getElementById('appSections');

        // Clear existing content
        appSections.innerHTML =   `  <li class="nav-item">
                        <a class="nav-link active" href="admin.html">Admin Page</a>
                    </li>` +  appSections.innerHTML;
        }
    }
