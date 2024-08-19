// Initialize date for updates
const nextUpdateDates = {
    1: new Date('2024-08-26T00:00:00Z'), // Week 1 Update
    2: new Date('2024-09-02T00:00:00Z'), // Week 2 Update
    3: new Date('2024-09-09T00:00:00Z'), // Week 3 Update
    4: new Date('2024-09-16T00:00:00Z'), // Week 4 Update
    5: new Date('2024-09-23T00:00:00Z'), // Week 5 Update
    6: new Date('2024-09-30T00:00:00Z'), // Week 6 Update
    7: new Date('2024-10-07T00:00:00Z')  // Week 7 Update
};

// Initial stats
let dayCount = 1;
let energy = 100;
let hunger = 100;
let happiness = 100;
let money = 1000;
let homeLevel = 1; // Starting level of the home
let homeInventory = []; // Array to keep track of items in the home
let realEstate = []; // Array to keep track of owned properties
let investments = []; // Array to keep track of investments
let weekNumber = parseInt(localStorage.getItem('weekNumber') || '1', 10); // Start from saved week or week 1

// Basic actions
function work() {
    energy -= 10;
    hunger -= 10;
    happiness -= 5;
    money += 100; // Earn money when working
    updateStats();
}

function eat() {
    hunger += 20;
    energy -= 5;
    updateStats();
}

function sleep() {
    energy += 30;
    hunger -= 10;
    updateStats();
}

// Update stats on screen
function updateStats() {
    document.getElementById('dayCount').textContent = dayCount;
    document.getElementById('energy').textContent = energy;
    document.getElementById('hunger').textContent = hunger;
    document.getElementById('happiness').textContent = happiness;
    document.getElementById('money').textContent = money;
    document.getElementById('homeLevel').textContent = homeLevel;
    document.getElementById('homeInventory').innerHTML = homeInventory.join('<br>');
    document.getElementById('realEstate').innerHTML = realEstate.join('<br>');
    document.getElementById('investments').innerHTML = investments.join('<br>');

    if (energy <= 0 || hunger <= 0) {
        if (window.self === window.top) {
            alert('You have died. Restarting the game...');
        } else {
            console.log('Game Over: You have died.');
        }
        resetGame();
    }
}

// Reset the game
function resetGame() {
    dayCount = 1;
    energy = 100;
    hunger = 100;
    happiness = 100;
    money = 1000;
    homeLevel = 1;
    homeInventory = [];
    realEstate = [];
    investments = [];
    weekNumber = 1; // Restart the week number
    localStorage.setItem('weekNumber', weekNumber); // Save the week number
    updateStats();
}

// Weekly update system
function checkForUpdate() {
    const currentDate = new Date();
    const nextUpdateDate = nextUpdateDates[weekNumber] || new Date(currentDate);

    updateCountdown(nextUpdateDate);

    if (currentDate >= nextUpdateDate) {
        releaseUpdate(weekNumber);
        weekNumber++;
        localStorage.setItem('weekNumber', weekNumber);
    }
}

// Update the countdown timer
function updateCountdown(nextUpdateDate) {
    const now = new Date();
    const timeDiff = nextUpdateDate - now;
    if (timeDiff <= 0) {
        document.getElementById('countdown').textContent = 'Update Available!';
        return;
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    document.getElementById('countdown').textContent = `Next Update In: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Release a new update based on the week number
function releaseUpdate(weekNumber) {
    let updateContent = '';

    switch(weekNumber) {
        case 2:
            unlockRelationships();
            updateContent = `Week 2 Update: Relationships unlocked! You can now interact with other characters.`;
            break;
        case 3:
            unlockJobSystem();
            updateContent = `Week 3 Update: Job system unlocked! You can now choose a career path.`;
            break;
        case 4:
            unlockHomeManagement();
            updateContent = `Week 4 Update: Home management unlocked! You can now customize and upgrade your home.`;
            break;
        case 5:
            unlockShopping();
            updateContent = `Week 5 Update: Shopping unlocked! Buy items to enhance your life.`;
            break;
        case 6:
            unlockHousesAndRealEstate();
            updateContent = `Week 6 Update: Houses & Real Estate unlocked! Buy, sell, and invest in properties.`;
            break;
        case 7:
            unlockInvestmentsAndMoneyMakingIdeas();
            updateContent = `Week 7 Update: Investments unlocked! Grow your wealth through smart investments.`;
            break;
        default:
            updateContent = `Week ${weekNumber} Update: New content unlocked!`;
    }

    document.getElementById('update-content').textContent = updateContent;
    document.getElementById('weekly-update').classList.remove('hidden');
}

// Functions to unlock features
function unlockRelationships() {
    console.log('Relationships feature unlocked!');
    // Add relationships feature logic here
}

function unlockJobSystem() {
    console.log('Job system feature unlocked!');
    // Add job system feature logic here
}

function unlockHomeManagement() {
    console.log('Home management feature unlocked!');
    setupHomeManagementUI();
}

function unlockShopping() {
    console.log('Shopping feature unlocked!');
    setupShoppingUI();
}

function unlockHousesAndRealEstate() {
    console.log('Houses & Real Estate feature unlocked!');
    setupRealEstateUI();
}

function unlockInvestmentsAndMoneyMakingIdeas() {
    console.log('Investments feature unlocked!');
    setupInvestmentsUI();
}

// Setup Home Management UI
function setupHomeManagementUI() {
    const homeManagementContainer = document.createElement('div');
    homeManagementContainer.id = 'home-management';
    homeManagementContainer.classList.remove('hidden');
    homeManagementContainer.innerHTML = `
        <h2>Home Management</h2>
        <p>Home Level: <span id="homeLevel">${homeLevel}</span></p>
        <button onclick="upgradeHome()">Upgrade Home</button>
        <h3>Inventory:</h3>
        <ul id="homeInventory"></ul>
        <button onclick="addItemToHome('New Furniture')">Add Furniture</button>
    `;
    document.getElementById('game-container').appendChild(homeManagementContainer);
}

// Upgrade home
function upgradeHome() {
    if (money >= 500) {
        money -= 500;
        homeLevel++;
        updateStats();
    } else {
        alert('Not enough money to upgrade the home!');
    }
}

// Add item to home inventory
function addItemToHome(item) {
    homeInventory.push(item);
    updateStats();
}

// Setup Shopping UI
function setupShoppingUI() {
    const shoppingContainer = document.createElement('div');
    shoppingContainer.id = 'shopping';
    shoppingContainer.classList.remove('hidden');
    shoppingContainer.innerHTML = `
        <h2>Shopping</h2>
        <button onclick="buyItem('Furniture', 200)">Buy Furniture - $200</button>
        <button onclick="buyItem('Electronics', 500)">Buy Electronics - $500</button>
        <h3>Your Inventory:</h3>
        <ul id="shoppingInventory"></ul>
    `;
    document.getElementById('game-container').appendChild(shoppingContainer);
}

// Buy item
function buyItem(item, cost) {
    if (money >= cost) {
        money -= cost;
        homeInventory.push(item);
        updateStats();
    } else {
        alert('Not enough money to buy this item!');
    }
}

// Setup Real Estate UI
function setupRealEstateUI() {
    const realEstateContainer = document.createElement('div');
    realEstateContainer.id = 'real-estate';
    realEstateContainer.classList.remove('hidden');
    realEstateContainer.innerHTML = `
        <h2>Real Estate</h2>
        <button onclick="buyProperty('Small House', 1000)">Buy Small House - $1000</button>
        <button onclick="buyProperty('Large House', 5000)">Buy Large House - $5000</button>
        <h3>Owned Properties:</h3>
        <ul id="realEstate"></ul>
    `;
    document.getElementById('game-container').appendChild(realEstateContainer);
}

// Buy property
function buyProperty(property, cost) {
    if (money >= cost) {
        money -= cost;
        realEstate.push(property);
        updateStats();
    } else {
        alert('Not enough money to buy this property!');
    }
}

// Setup Investments UI
function setupInvestmentsUI() {
    const investmentsContainer = document.createElement('div');
    investmentsContainer.id = 'investments-section';
    investmentsContainer.classList.remove('hidden');
    investmentsContainer.innerHTML = `
        <h2>Investments</h2>
        <button onclick="makeInvestment('Stocks', 1000)">Invest in Stocks - $1000</button>
        <button onclick="makeInvestment('Business', 3000)">Invest in Business - $3000</button>
        <h3>Your Investments:</h3>
        <ul id="investments"></ul>
    `;
    document.getElementById('game-container').appendChild(investmentsContainer);
}

// Make an investment
function makeInvestment(investment, cost) {
    if (money >= cost) {
        money -= cost;
        investments.push(investment);
        updateStats();
    } else {
        alert('Not enough money to make this investment!');
    }
}

// Game loop
setInterval(() => {
    dayCount++;
    checkForUpdate();
    updateStats();
}, 60000); // Simulate a day passing every 60 seconds

// Initial call to update stats and timer
updateStats();
checkForUpdate();
