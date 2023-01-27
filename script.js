'use strict';

//select element
const score_p0 = document.getElementById('score--0');
const score_p1 = document.getElementById('score--1');
const current_0 = document.getElementById('current--0');
const current_1 = document.getElementById('current--l');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

//start condition
function Newgame() {
  score_p0.textContent = 0;
  score_p1.textContent = 0;
  dice.classList.add('hidden');
  current_score = 0;
  active_player = 0;
  scores = [0, 0];
  game_on = true;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}
// call start
let current_score, active_player, scores, game_on;

Newgame();

//function switch player
const switch_player = function (ap) {
  active_player = ap === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rollind dice
btn_roll.addEventListener('click', function () {
  if (game_on) {
    //1. generate random dice roll
    const dice_score = Math.trunc(Math.random() * 6) + 1;

    //2.display score dice
    dice.classList.remove('hidden');
    dice.src = `dice-${dice_score}.png`;

    //3.check for rolled = 1
    if (dice_score !== 1) {
      //add curent dice score
      current_score += dice_score;
      document.getElementById(`current--${active_player}`).textContent =
        current_score;
    } else {
      //switch player
      current_score = 0;
      document.getElementById(`current--${active_player}`).textContent = 0;
      // active_player = active_player === 0 ? 1 : 0;
      // player0.classList.toggle('player--active');
      // player1.classList.toggle('player--active');
      switch_player(active_player);
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (game_on) {
    //keep current score
    scores[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];
    document.getElementById(`current--${active_player}`).textContent = 0;
    //   active_player = active_player === 0 ? 1 : 0;
    //   player0.classList.toggle('player--active');
    //   player1.classList.toggle('player--active');
    //score >=100
    if (scores[active_player] >= 10) {
      document
        .querySelector(`.player--${active_player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
      game_on = false;
    } else {
      current_score = 0;
      switch_player(active_player);
    }
  }
});

btn_new.addEventListener('click', function () {
  document
    .querySelector(`.player--${active_player}`)
    .classList.remove('player--winner');
  Newgame();
});
