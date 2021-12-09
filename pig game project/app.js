
/*
Game RULES:
- The game has 2 players, playing in rounds 
- In each turn, a player rolls a dice as many times as he whishes. Easch esult geet added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets localStorage. After OES_texture_half_float_linear,
   it's the next player's turn 
- the player can chosse to 'hold', which means thet his ROUND score gets added to his GLBAL score.
  After OES_texture_half_float_linear, it's the next player's turn
- the first player to reach 100 points on GLOBAL score wins the  game  
-two time six come you will lose all your score  */

  //  important variable
var score = [0,0]  , roundScore = 0 , activePlayer = 0 ,i=0,dice,WinngScore = 100;
const newGame = document.querySelector(".newGame"),
      circle0 = document.querySelector("#player0-circle"),
      circle1 = document.querySelector("#player1-circle"), 
      current0 = document.querySelector("#current-0"),
      current1 = document.querySelector("#current-1"), 
      rollDice = document.querySelector("#dice"),
      hold = document.querySelector("#hold")
      diceImage = document.querySelector(".dice-image");


  diceImage.style.display = 'none';

  // add event listener to ROLL DICE 
  
  rollDice.addEventListener('click',function(){
    // change icon color and reverse 
    document.querySelector(".fa-refresh").classList.add("reverse");
    // my icon should rotate over and over so i use setTimeout function to remove reverse function
    setTimeout(function(){document.querySelector(".fa-refresh").classList.remove("reverse");},1000)
    // rondam number
    dice = Math.floor(Math.random()*6)+1;
    // display the result
    diceImage.style.display = 'block';
    // document.querySelector('#score-' + roundScore).textContent = dice;
    document.querySelector('.dice-image').src= `img/dice-${dice}.png`;
    // Update the round score if the rolled number was not 1 
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }else{
      nextPlayer();
    }
    // two time six come you will lose all your score
    if (activePlayer == 0) {
      TwoTimeSix();
    }
    else if(activePlayer == 1){
      TwoTimeSix();
    } 
  })
  
  document.querySelector("#hold").addEventListener("click",function(){
  // move current value to global value 
  score[activePlayer] += roundScore;
  document.querySelector("#score-" + activePlayer).textContent = score[activePlayer]; 
  // change icon color and reverse 
  // document.querySelector(".fa-download").style.transform = "rotate(180deg)";
  // document.querySelector(".fa-download").style.transition = "transform 1s ease";

  
  // if player won the game 
  if (score[activePlayer] >= WinngScore) {
    document.querySelector('#player-'+activePlayer).innerHTML = "<span style='color:green; margin-left:30px;'>Winner!🥳</span>";
    document.querySelector('#player-'+(activePlayer ==0 ?activePlayer = 1:activePlayer = 0)).innerHTML = "<span style='color:red; margin-left:2px;'>Losser!😔</span>";
    rollDice.disabled ="disabled";
    hold.disabled="disabled";
    circle0.remove("fa-circle");
    circle1.remove("fa-circle");
    diceImage.style.display ="none";
  }
  //next player
  nextPlayer();

})

// next player function 

function nextPlayer(){
     roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = 0;
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    circle0.classList.toggle("fa-circle");
    circle1.classList.toggle("fa-circle");
    document.querySelector('.left-div').classList.toggle("active-background");
    document.querySelector('.right-div').classList.toggle("active-background");
}

// new game button
newGame.addEventListener('click',function(){
  window.location.reload();
})
// two time six function 

function TwoTimeSix(){
  if (dice != 6) {
    i =0
  }
  else  {
    ++i;
   hold.onclick = function(){i=0}
    if (i == 2) {
        document.querySelector("#score-" + activePlayer).textContent = 0; 
        nextPlayer();
      i= 0;
    } 
    setTimeout(function(){i=0},2000);

  }
}
