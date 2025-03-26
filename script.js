// Questions and answers database (unchanged)
const scenarios = [
    {
        question: "Name something you do in the morning",
        answers: [
            { text: "Brush teeth", percentage: 41, keywords: ["brush", "teeth"] },
            { text: "Eat breakfast", percentage: 25, keywords: ["eat", "breakfast"] },
            { text: "Take a shower", percentage: 15, keywords: ["take", "shower", "bath"] },
            { text: "Check your phone", percentage: 10, keywords: ["phone", "cell", "cellphone"] },
            { text: "Make coffee", percentage: 9, keywords: ["coffee"] },
        ],
    },
    {
        question: "Name something people do when they want to unwind after a long day",
        answers: [
            { text: "Watch TV/movies", percentage: 27, keywords: ["TV", "movie", "television", "movies", "video", "videos"] },
            { text: "Read a book", percentage: 20, keywords: ["read", "book", "novel", "magazine", "newspaper"] },
            { text: "Take a bath", percentage: 18, keywords: ["shower", "bath"] },
            { text: "Go for a walk", percentage: 15, keywords: ["walk", "run", "stroll", "hike", "jog"] },
            { text: "Listen to music", percentage: 10, keywords: ["music", "podcast", "headphones"] },
            { text: "Have a drink", percentage: 7, keywords: ["cocktail", "drink", "beer", "wine", "liquor"] },
            { text: "Meditate/yoga", percentage: 3, keywords: ["zen", "breath", "innerpeace", "yoga", "exercise", "Meditate", "pray", ] },
            { text: "Spend time with friends/family", percentage: 9, keywords: ["friends", "family", "kids"] },
        ],
    },
    {
        question: "Name a popular flavor of ice cream",
        answers: [
            { text: "Vanilla", percentage: 27, keywords: ["vanilla"] },
            { text: "Chocolate", percentage: 20, keywords: ["chocolate"] },
            { text: "Strawberry", percentage: 9, keywords: ["strawberry"] },
            { text: "Mint Chocolate Chip", percentage: 9, keywords: ["mint"] },
            { text: "Cookies and Cream", percentage: 9, keywords: ["cookies", "cream"] },
            { text: "Rocky Road", percentage: 9, keywords: ["rocky", "road"] },
            { text: "Pistachio", percentage: 8, keywords: ["pistachio"] },
            { text: "Coffee", percentage: 8, keywords: ["coffee"] },
        ],
    },
    {
        question: "Name something people often do on a vacation",
        answers: [
            { text: "Relax on a beach", percentage: 23, keywords: ["beach"] },
            { text: "Explore new places", percentage: 20, keywords: ["explore", "new places"] },
            { text: "Try local food", percentage: 15, keywords: ["food", "cuisine", "restaurants"] },
            { text: "Take photos", percentage: 15, keywords: ["photo", "photos", "photography"] },
            { text: "Go shopping", percentage: 14, keywords: ["shopping", "spend money", "souvenirs"] },
            { text: "Visit attractions", percentage: 13, keywords: ["sightseeing", "tours", "landmarks", "landmark", "tour", "attractions", "sightsee"] },
        ],
    },
    {
        question: "Name a popular type of cuisine that people enjoy",
        answers: [
            { text: "Italian", percentage: 40, keywords: ["italian"] },
            { text: "Mexican", percentage: 36, keywords: ["mexican"] },
            { text: "Chinese", percentage: 14, keywords: ["chinese"] },
            { text: "American", percentage: 10, keywords: ["american"] },
        ],
    },
    {
        question: "Name a common reason people go to the beach",
        answers: [
            { text: "Sunbathing", percentage: 23, keywords: ["sunbathing", "sunbath", "sunbathe"] },
            { text: "Swimming", percentage: 20, keywords: ["swimming", "swim"] },
            { text: "Building sandcastles", percentage: 6, keywords: ["sandcastles"] },
            { text: "Picnics", percentage: 4, keywords: ["picnics", "picnicking", "picnic"] },
        ],
    },
    {
        question: "Name something someone might have in the bathroom",
        answers: [
            { text: "Toothbrush", percentage: 25, keywords: ["toothbrush"] },
            { text: "Shampoo", percentage: 23, keywords: ["shampoo"] },
            { text: "Soap", percentage: 20, keywords: ["soap"] },
            { text: "Toothpaste", percentage: 16, keywords: ["toothpaste"] },
            { text: "Razor", percentage: 16, keywords: ["razor"] },
        ],
    },
    {
        question: "Name an activity people often do on a lazy weekend",
        answers: [
            { text: "Watch TV/movies", percentage: 27, keywords: ["TV", "movie", "television", "movies", "video", "videos"] },
            { text: "Read a book", percentage: 24, keywords: ["read", "book", "novel", "magazine", "newspaper"] },
            { text: "Cook a Meal", percentage: 18, keywords: ["cook"] },
            { text: "Sleep In", percentage: 16, keywords: ["sleep", "sleeping"] },
            { text: "Go for a walk", percentage: 15, keywords: ["walk", "run", "stroll", "hike", "jog"] },
        ],
    },
];

// Track the game state
let currentScenario = 0;
let currentTeam = 1;
let strikes = [0, 0]; // Track strikes for both teams
let revealedAnswers = [];

const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const strikeZoneElement = document.querySelector(".strike-zone");
const nextRoundButton = document.getElementById("next-round");
const instructionsElement = document.querySelector(".instructions");

function updateLayout() {
    const answersContainer = document.querySelector('.answers');
    const tiles = answersContainer.children.length;

    if (tiles > 5) {
        answersContainer.classList.add('more-than-5');
    } else {
        answersContainer.classList.remove('more-than-5');
    }
}

function updateScore(team, points) {
    const scoreElement = document.getElementById(`team-${team}-score`).querySelector('p');
    const currentScore = parseInt(scoreElement.textContent, 10);
    scoreElement.textContent = currentScore + points;
}

// Example: Adding points
// To add 10 points to Team 1, call: updateScore(1, 10);
// To add 15 points to Team 2, call: updateScore(2, 15);



// Function to shuffle the scenarios array
function shuffleScenarios(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Shuffle the scenarios before the game starts
shuffleScenarios(scenarios);

// Load the current scenario
function loadScenario() {
    const scenario = scenarios[currentScenario];
    questionElement.textContent = scenario.question;
    answersElement.innerHTML = "";
    revealedAnswers = [];

    scenario.answers.forEach((answer) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = "Family Feud";
        answersElement.appendChild(tile);
    });
    strikeZoneElement.innerHTML = ""; // Reset strikes display for the new round

    updateLayout(); // Adjust the layout after loading answers
}

function submitAnswer() {
    const userInput = document.getElementById("user-answer").value.trim().toLowerCase();
    const scenario = scenarios[currentScenario];
    let matched = false;

    scenario.answers.forEach((answer, index) => {
        const isMatch = answer.keywords.some((keyword) =>
            userInput.includes(keyword.toLowerCase().trim())
        );

        if (isMatch && !revealedAnswers.includes(index)) {
            const tile = answersElement.children[index];
            tile.textContent = `${answer.text} (${answer.percentage}%)`;
            tile.classList.add("revealed");
            revealedAnswers.push(index);
            matched = true;

            // Add points to the current team's score
            updateScore(currentTeam, answer.percentage);
        }
    });

    if (!matched) {
        addStrike();
    } else if (revealedAnswers.length === scenario.answers.length) {
        alert(`Team ${currentTeam} wins this round!`);
        nextRoundButton.style.display = "block";
    }


    
    // Clear the input field
    document.getElementById("user-answer").value = "";
}


// Add a strike
function addStrike() {
    strikes[currentTeam - 1]++;
    const strikeCount = strikes[currentTeam - 1];

    // Show a big strike for 3 seconds
    const bigStrike = document.createElement("div");
    bigStrike.textContent = "X";
    bigStrike.classList.add("big-strike");
    document.body.appendChild(bigStrike);

    setTimeout(() => {
        document.body.removeChild(bigStrike);

        // Update the strike zone
        strikeZoneElement.innerHTML = "";
        for (let i = 0; i < strikeCount; i++) {
            const strikeMessage = document.createElement("div");
            strikeMessage.textContent = "X";
            strikeMessage.classList.add("strike");
            strikeZoneElement.appendChild(strikeMessage);
        }

        if (strikeCount >= 3) {
            alert(`Team ${currentTeam} gets 3 strikes! Switching to the other team.`);
            currentTeam = currentTeam === 1 ? 2 : 1;
            strikes[currentTeam - 1] = 0; // Reset strikes for the new team
            strikeZoneElement.innerHTML = ""; // Clear the display
        }
    }, 3000); // Delay for the big strike
}

// Toggle instructions visibility
function toggleInstructions() {
    instructionsElement.style.display =
        instructionsElement.style.display === "none" ? "block" : "none";
}

// Move to the next round
function nextRound() {
    currentScenario++;
    if (currentScenario >= scenarios.length) {
        alert("Game Over!");
    } else {
        loadScenario();
        nextRoundButton.style.display = "none";
        strikes = [0, 0]; // Reset strikes for both teams
    }
}

// Initialize the game
loadScenario();
nextRoundButton.addEventListener("click", nextRound);
