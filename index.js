/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Iterate through each game data
    games.forEach(game => {
        // Create new div element as game card
        const gameCard = document.createElement("div");

        // Add game-card class
        gameCard.classList.add("game-card");

        // Set HTML content using template literal to display game info
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
        `;

        // Add the game card to container
        gamesContainer.appendChild(gameCard);
    });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = totalRaised.toLocaleString();


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);


    console.log('Number of unfunded games :', unfundedGames.length);
    console.log('Unfunded games:', unfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);

    console.log('Number of funded games :', fundedGames.length);
    console.log('Funded games:', fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
    console.log('Number of games :', GAMES_JSON.length);
    console.log('All games:', GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

// 使用filter计算未达标游戏数量
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesExplanation = unfundedGamesCount > 0 ? `There are ${unfundedGamesCount} unfunded games.` : "All games are funded.";

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.textContent = unfundedGamesExplanation;
descriptionContainer.appendChild(unfundedGamesElement);

// 创建描述文本
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
 Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded. 
 We need your help to fund these amazing games!`;

// 创建新的DOM元素并添加描述文本
const descriptionElement = document.createElement("p");
descriptionElement.textContent = displayStr;
descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games 
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `${firstGame.name} - $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `${secondGame.name} - $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);
