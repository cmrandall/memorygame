/*
 * Global Variables
 */
let moves = 0;
const deck = document.querySelector('.deck');

/*
 * Create a list that holds all of your cards
 */
let showCards = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const completedShuffle = shuffle(cardsToShuffle);
    for (card of completedShuffle) {
        deck.appendChild(card);
    }
}

shuffleDeck();

/*
 * Increment Moves Function
 */
function incrementMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addCards(clickTarget);
        if (showCards.length === 2) {
            checkMatch(clickTarget);
            incrementMove();
        }
    }
});

function isClickValid(clickTarget) {
    return(
        clickTarget.classList.contains('card') && 
        !clickTarget.classList.contains('match') && 
        showCards.length < 2 && 
        !showCards.includes(clickTarget)
    );
}

function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addCards(clickTarget) {
    showCards.push(clickTarget);
    console.log(toggleCard);
}

function checkMatch() {
    if(showCards[0].firstElementChild.className === showCards[1].firstElementChild.className) {
        showCards[0].classList.toggle('match');
        showCards[1].classList.toggle('match');
        showCards = [];
    } else {
        setTimeout(() => {
            toggleCard(showCards[0]);
            toggleCard(showCards[1]);
            showCards = [];
            }, 1000);
    }
}
