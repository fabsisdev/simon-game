var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function() {
    if (started === false) {
        $("h1").text("Level " + level);
        nextSequence();            
        started = true;
        $("h4").fadeOut();
        $("p").fadeOut();
    }
});

function nextSequence () {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    var nextButton = $("#" + randomChosenColor);

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    gamePattern.push(randomChosenColor);
    $(nextButton).fadeOut(60).fadeIn(60);
    playSound(randomChosenColor);   
}

$(".btn").on("click", function(event) {    
    var userChosenColor = event.target.id;

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(currentLevel) {       
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");        
        $("#level-title").text("Perdiste. Presiona cualquier tecla para empezar de nuevo");

        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function playSound(name) {
    var audio = new Audio ("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100)
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}