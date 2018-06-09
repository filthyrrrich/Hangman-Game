var wins = 0;
var losses = 0;
var lives = 6;
var userGuess = [];
var answerArray = [];

// shortcuts for getting elements
var blank = document.getElementById("blankword");
var win_span = document.getElementById("winstotal");
var loss_span = document.getElementById("losstotal");
var guessLeft_span = document.getElementById("current-guesses");
var sofar_span = document.getElementById("past-guesses");
var hang_img = document.getElementById("hang-background");

// array for letter guesses
var letterArray = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];

var imgArray = [ "url(assets/images/gallows.png)", "url(assets/images/hangman-head.png)", "url(assets/images/hangman-body.png)", "url(assets/images/hangman-waist.png)", "url(assets/images/hangman-legs.png)", "url(assets/images/hangman-full.png)"]
// possible words
var words = ["straight", "continuation bet", "flush", "trips", "pair", "two pair", "full house", "boat", "set", "quads", "straight flush", "donk bet", "donkey", "fish", "royal flush", "gut shot", "open ended", "double gutted", "drawing dead", "flop texture", "cards","flop", "turn", "river", "hero call", "bluff", "bluff catcher", "suited connectors", "off suit", "value bet", "pot odds", "double barrel", "triple barrel", "flush draw", "chips", "stack", "muck", "nuts", "fold", "call", "raise", "straight draw", "equity", "expected value", "all in", "check", "check raise", "tight aggresive", "loose aggresive", "passive", "calling station", "back door", "button", "small blind", "big blind", "cut off", "high jack", "low jack", "early position", "middle position", "late position", "under the gun", "ante", "bad beat", "pot committed", "rainbow", "rake", "semi bluff", "showdown", "slow play", "chop", "split pot", "straddle", "string bet", "tell", "tilt", "top pair", "kicker", "board", "burn card", "buy in", "cold call", "counterfeited", "draw", "implied odds", "heads up", "limp", "over pair"];

// randomly chooses from words array
var chosenWord = words[Math.floor(Math.random() * words.length)];

// resets values for next game
function nextGame() {
    lives = 6;
    guessLeft_span.innerHTML = lives;
    sofar_span.innerHTML = "";
    userGuess.length = 0;
    chosenWord = words[Math.floor(Math.random() * words.length)];
    answerArray.length = 0;
    console.log(chosenWord);
    convertWord();    
}

// converts each letter of chosenWord to "_" 
function convertWord(){
    for (i = 0; i < chosenWord.length; i++) {
        answerArray[i] = "_";
        if (chosenWord[i] === " ") {
            answerArray[i] = "-";       
        }
    }
    // displays current progress on chosenWord
    blank.innerHTML = answerArray.join(" ");
}

// runs function to hide word
convertWord();
console.log(words.length)
console.log(chosenWord);
console.log(answerArray);

// begins game when letters are clicked
document.onkeyup = function(event) {
    
    var guess = event.key.toLowerCase();
    var repeatGuess = userGuess.includes("<div id='card'>" + guess + "</div>") || answerArray.includes(guess);
    
    // prevents non-letter keys from being clicked
    if (!letterArray.includes(guess)){    
        alert("Invalid key pressed. You must choose a letter!");

    // prevents repeat keys from being clicked
    } else if (repeatGuess === true) {
        alert("You already guessed that letter... you might want to try a different one!");

    } else {
        
        // determines if clicked letter is contained in chosenWord
        for (var j = 0; j < chosenWord.length; j++) {
            if (chosenWord[j] === guess) {
            answerArray[j] = guess;
            }
        }
        // displays current progress on chosenWord
        blank.innerHTML = answerArray.join(" ");

        // win condition
        if (!answerArray.includes("_")) {
            alert("Good Job! The word was " + "'" + chosenWord + "'" + ". See if you can guess the next word!" + "")
            win_span.innerHTML++;
            nextGame();
          
        // lose condition
        } else if (userGuess.length === 5 ){
            alert("You lose. Better luck next time!");
            loss_span.innerHTML++;
            nextGame();
        }

        // determines if letter clicked is not in chosenWord and decrements
        else if (!answerArray.includes(guess)){
            userGuess.push("<div id='card'>" + guess + "</div>");
            sofar_span.innerHTML = userGuess.join(" ");
            guessLeft_span.innerHTML--;
            for (e = 1; e < imgArray.length; e++){
                imgArray[e] = imgArray[e] +1;
                hang_img.style.backgroundImage = imgArray[e];
            }
// hang_img.style.backgroundImage = imgArray[1]
//             if(hang_img.style.backgroundImage = imgArray[1]) {
//                 hang_img.style.backgroundImage = imgArray[2];
//             }
                
           

            }
            
        }
        console.log(userGuess);
         
    }
        
console.log(guess);
console.log(answerArray);





