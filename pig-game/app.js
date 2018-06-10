/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceDOM, gamePlaying, lastDice, lastDice2;

diceDOM = document.getElementById('dice-1');
dice2DOM = document.getElementById('dice-2');

init();

document.querySelector('.btn-roll').addEventListener('click', 
function() {
    if(gamePlaying) {
        // 1. Random number
        var dice =  Math.floor(Math.random() * 6) + 1;
        var dice2 =  Math.floor(Math.random() * 6) + 1;
        // 2. Display the result
        diceDOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT an 1
        if(dice === 6 && lastDice === 6 && dice2 === 6 && lastDice2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        
        lastDice = dice;
        lastDice2 = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add CURRENT score to GLOBAL score
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
        
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        
        var input = document.querySelector('.final-score').value;
        var winningScore;

        //  Undefined, 0, null or "" will be COERCED to false
        //  Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            dice2DOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
}
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDOM.style.display = 'none';
    dice2DOM.style.display = 'none';
  
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    setScore = "";
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    diceDOM.style.display = 'none';
    dice2DOM.style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}