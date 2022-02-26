//variables
var buttonColours=["red","blue","green", "yellow"];
var randomChosenColour;
var gamePattern=[];
var randomNumber;
var userClickedPattern=[];
var level=0;
var started = false;

// starting the game

$(document).keypress(function(){
 if(!started){
 $("#level-title").text("Level " + level);
 nextSequence();
 started=true;
 }
 
 });

//cheching the answer

function checkAnswer(currentLevel){

 if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  if(gamePattern.length===userClickedPattern.length){
   setTimeout(function(){
    nextSequence();},1000)
  }
 }
 else{
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press any key to Restart");

  setTimeout(function(){
   $("body").removeClass("game-over")
  },200);

  startOver();
 }

}



function nextSequence(){
userClickedPattern = [];
level++;
$("h1").text("level "+ level);
// random number generator4
var randomNumber= (Math.floor(Math.random()*4));

//random colour generator
randomChosenColour= buttonColours[randomNumber];
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
gamePattern.push(randomChosenColour);
playSound(randomChosenColour);

}

$(".btn").click(function(){
 if(started){
 var userChosenColour= $(this).attr("id");
 userClickedPattern.push(userChosenColour);
 
 playSound(userChosenColour);
 animatePress(userChosenColour);

 checkAnswer(userClickedPattern.length-1);
 }
});

//playing sound
playSound(randomChosenColour);
 function playSound(name){
  var audio= new Audio("sounds\\"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
 $("#"+currentColor).addClass("pressed");
 setTimeout(function(){
  $("#"+currentColor).removeClass("pressed"); 
 },100);
}

function startOver() {
 level = 0;
 gamePattern = [];
 started = false;
}
