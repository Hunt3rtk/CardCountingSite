
var shoe = [];

var runningCount = 0;

const deck = [
    'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
    'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA',
    'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
    'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA'
];

const MakeShoe = (numberOfDecks) => {
    shoe = Shuffle([].concat(...Array(numberOfDecks).fill(deck)));
}

const Shuffle = (array) => {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

const HiLo = (card) => {
    const rank = card.slice(1);
    if (['2', '3', '4', '5', '6'].includes(rank)) return 1;
    if (['7', '8', '9'].includes(rank)) return 0;
    return -1;
}

function NextCards() {
    if (shoe.length === 0) {
        alert("The shoe is empty! Please start a new game.");
        return null;
    }
    
    var numCards = Math.floor((Math.random() * 4) + 1); // Randomly select 1 to 4 cards

    ClearDisplayedCards();

    for (let i = 0; i < numCards; i++) {
        let card = shoe.shift();
        if (!card) break;
        DisplayCard(card);
        CalculateRunningCount(card);
    }
    UpdateRunningCount();
    UpdateCardsDealt();
}

function DisplayCard(card) {
    var cardImage = document.createElement("img");
    cardImage.src = `images/${card}.svg`;
    cardImage.className = "dealt_card";
    document.getElementById("cards_container").appendChild(cardImage);
}

function ClearDisplayedCards() {
    document.getElementById("cards_container").innerHTML = "";
}

function CalculateRunningCount(card) {
    runningCount += HiLo(card);
}

function UpdateRunningCount() {
    document.getElementById("running_count_display").textContent = runningCount;
}

function UpdateShoeSize() {
    document.getElementById("total_cards_display").textContent = shoe.length;
}

function GetDeckCount() {
    return parseInt(document.getElementById("deck_count").value);
}

function UpdateCardsDealt() {
    document.getElementById("cards_dealt_display").textContent = 52 * GetDeckCount() - shoe.length;
}

function StartGame() {
    let numberOfDecks = GetDeckCount();
    runningCount = 0;
    ClearDisplayedCards();
    MakeShoe(numberOfDecks);
    UpdateRunningCount();
    UpdateShoeSize();
    UpdateCardsDealt();
}