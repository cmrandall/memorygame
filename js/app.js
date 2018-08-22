/*
 * Global Variables
 */
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;

const TOTAL_PAIRS = 8;
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
        if(clockOff) {
            clockStart();
            clockOff = false;
        }
        if (showCards.length === 2) {
            checkMatch(clickTarget);
            incrementMove();
            checkScore();
        }
    }
    if (matched === TOTAL_PAIRS) {
        gameOver();
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
        matched++;
    } else {
        setTimeout(() => {
            toggleCard(showCards[0]);
            toggleCard(showCards[1]);
            showCards = [];
            }, 1000);
    }
}

function checkScore() {
    if(moves === 12 || moves === 20) {
        hideStar();
    }
}

function hideStar() {
    const stars = document.querySelectorAll('.stars li');
    for(star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

/*
    adding clock function
*/

function clockStart() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

function stopClock() {
    clearInterval(clockId);
}

/*
            Modal
*/

function toggleModal() {
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
}

function createModalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const moveStat = document.querySelector('.modal_moves');
    const starStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    moveStat.innerHTML = `Moves = ${moves}`;
    starStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    return starCount;
}

document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal();
})


function resetGame() {
    resetClockAndTime();
    resetMoves();
    resetStars();
    shuffleDeck();
}

function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    star = 0;
    const stars = document.querySelectorAll('.stars li');
    for (star of stars) {
        star.style.display = 'inline';
    }
}

document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.modal_replay').addEventListener('click', replayGame);

function gameOver() {
    stopClock();
    createModalStats();
    toggleModal();
}

function replayGame() {
    resetGame();
    toggleModal();
    resetCards();
}

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

