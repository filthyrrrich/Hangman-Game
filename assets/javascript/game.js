var wins = 0;
var losses = 0;
var lives = 6;
var userGuess = [];
var answerArray = [];
var imgCount = 0;
var gameOver = false;
var instructions = "The King has caught the Queen sleeping with Sir Jack-of-Hearts! Now you must prove your poker knowledge to save Jack before they hang Jack!"

// shortcuts for getting elements
var blank = document.getElementById("blankword");
var win_span = document.getElementById("winstotal");
var loss_span = document.getElementById("losstotal");
var guessLeft_span = document.getElementById("current-guesses");
var sofar_span = document.getElementById("past-guesses");
var hang_img = document.getElementById("hang-background");
var instructions_end = document.getElementById("instructions");

// array for letter guesses
var letterArray = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];

// hangman img
var imgArray = [ "url(assets/images/gallows.png)", "url(assets/images/hangman-head.png)", "url(assets/images/hangman-body.png)", "url(assets/images/hangman-waist.png)", "url(assets/images/hangman-legs.png)", "url(assets/images/hangman-full.jpg)", "url(assets/images/jacksdead.png)"]

// possible words
var words = ["straight", "continuation bet", "flush", "trips", "pair", "two pair", "full house", "boat", "set", "quads", "straight flush", "donk bet", "donkey", "fish", "royal flush", "gut shot", "open ended", "double gutted", "drawing dead", "flop texture", "cards","flop", "turn", "river", "hero call", "bluff", "bluff catcher", "suited connectors", "off suit", "value bet", "pot odds", "double barrel", "triple barrel", "flush draw", "chips", "stack", "muck", "nuts", "fold", "call", "raise", "straight draw", "equity", "expected value", "all in", "check", "check raise", "tight aggresive", "loose aggresive", "passive", "calling station", "back door", "button", "small blind", "big blind", "cut off", "high jack", "low jack", "early position", "middle position", "late position", "under the gun", "ante", "bad beat", "pot committed", "rainbow", "rake", "semi bluff", "showdown", "slow play", "chop", "split pot", "straddle", "string bet", "tell", "tilt", "top pair", "kicker", "board", "burn card", "buy in", "cold call", "counterfeited", "draw", "implied odds", "heads up", "limp", "over pair"];

// randomly chooses from words array
var chosenWord = words[Math.floor(Math.random() * words.length)];

// resets values for next game
function nextGame() {
    lives = 6;
    imgCount = 0
    hang_img.style.backgroundImage = imgArray[imgCount];
    gameOver = false;
    instructions_end.innerHTML = instructions;
    guessLeft_span.innerHTML = lives;
    sofar_span.innerHTML = "";
    userGuess.length = 0;
    chosenWord = words[Math.floor(Math.random() * words.length)];
    answerArray.length = 0;
    convertWord();    
}

// converts each letter of chosenWord to "_" 
function convertWord(){
    for (i = 0; i < chosenWord.length; i++) {
        answerArray[i] = "_";
        if (chosenWord[i] === " ") {   //poker chip image
            answerArray[i] = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASpSURBVEhLzVdbT1NZFD7zTyYz8wPm8jxTe29BxMEBTbxEE2oEhMTE+yVeAB/U6IOXJ+/RB981PmmiUdqell4YBDqU0GDxAlZaysV2gDXr293ncFrPVMAXV7KSw9p7fV/32uuyUb5pIUX5LmC1/uZ3OM6qHk9UdbvH+bsAxTdsWOux2X6VLl8nIOxxOJoCDN5bWzud9PmKE8eO0eKzZ0R+v1B8wzbi8xXCNTXTQZcrHbDZ/oKvhFmdvLBafwy4XP2RDRvyk8eP0/ylS7qSqpapcQ0/Aj4ciT7Vbv9Bwq1M+Bdbg05nbqyjY2H+4sUyYGg1YqHsA18/Y/jt9nUStrrwXdr4pLOVp5xjsLcHD9Lg9u0U27KFgl6vUHwP7dgh1rDH6DPJp+cDzH6RvMdi+Un1erOVpO8YlMNHDCA0tnMnQXKxmG7jPBB7sNfoCyz+gTlcnaQpFySD6nK9yt29u7T45AkVrl8XJ0ju3i2IspEI9W7eXCJxuShYWyvINOIx3p+LxynKp4cPfIEBrNydO0tBtztumnBcCo2JvXvnjHc3euiQAE3fv0+jV69SqKaGUq2t9PH0aZq9cEEovmFTeW308mWKbNsmfFLsa8Qaam2dY/smSVcS/BKUQfHhQ31j5sYN/TTQAQacOX++LIxGxdrA1q1lPpnbt3W8AmPzfb+WlCVB4ffW1U0vPH4sNi1xfUYaG6m/vV0nNcvuz5T3gDzc0EBvHjygaFOTwAImsMPr1+df2u2/SFpFQddBA4Bz4eZNmrxyhQY5VPPptAhvtZNWKvaG+P7nx8dpYP9+muQrAibWhpubi5wfnZJWUUJebwSFrzmjPAYPH6bEyZPi/jT7SnW0pUUkpFpXJ7A0+8TRoxTyeMKSVlH4ft9ku7r0DcbSQfJo9pUqfDR/YGn2qc5OApek5abhcHwyhpPbne64mjBrCh/4BpxOgWW0g0vSmhOn790TtbpWYoT533y+OrFZqJEccZ9vzaGOcmudSSYpWl+v2xFq/iHjkpaJzZLryBFRFmtNLi3UlcnFs9uQXE5n90hz83I5cQlod8wZv6pwizCzj+b/wVBOSebgUC+XExpIpL6+rIGg+OEY4YaAprCaBjLc3U1DJ05QlHt7ZQN54XT+LGlly3S702hr2ATN3LpFoY0bqTg1RUN8DQCcOXfOnJAVa9jzd1sbFTMZcccfK1omD5UxSbkseK4k2to+GxKv9u2jxKlT4vQIoRgS/DdCCsW3GBIyvJhcfXv2UIobkBEr0dIyxx2yQdItizx1H0aYcSyO8IjT7ivo8VDq2jWK7dql28Lc02H758wZ3QYfk7EYMx2LEAxr04cAnxwlFuIsf//oEX14+lQnGeDB/57D2N/RUXoI8EmNvhOlh0DWb7F8L2nMhcHW4bliLC8oTvD2wAFRHqZPH17DHqMPygdYL63WPyR8deEnrQUPNfHYMwBparw7qNmeVHv7At93lnPndwm7MsHTFHfO4ctXnr4aMU4JH35Gxb8Y3v8TJAOHfhODvOa5nEeTAfDi8+flD3q2DfM8xx68Mrgv/Ckhvl7wcuAW2MXJ18uR0P+FwTfbwuhIZc3h2xRF+Q+b6CMBkBa2pQAAAABJRU5ErkJggg=='>";       
        }
    }
    // displays current progress on chosenWord
    blank.innerHTML = answerArray.join(" ");
}

// runs function to hide word
convertWord();

// begins game when letters are clicked
// document.getElementById("keyboard").onclick = function(event)
document.getElementById("keyboard").onclick = function(event) {
    console.log(event.target.id)
    
    var guess = event.target.id.toLowerCase();
    var repeatGuess = userGuess.includes("<div id='card'>" + guess + "</div>") || answerArray.includes(guess);
    
    // prevents non-letter keys from being clicked
    if (!letterArray.includes(guess) && gameOver === false){    
        alert("Invalid key pressed. You must choose a letter!");

    // prevents repeat keys from being clicked
    } else if (repeatGuess === true && gameOver === false) {
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
        if (!answerArray.includes("_") && gameOver === false) {
            alert("Good Job! The poker term was " + "'" + chosenWord + "'" + ". See if you can guess the next one!" + "")
            win_span.innerHTML++;
            nextGame();
          
        // lose condition
        } else if (gameOver){
            loss_span.innerHTML++;
            nextGame();
        }

        // determines if letter clicked is not in chosenWord and decrements, increments hangman img
        else if (!answerArray.includes(guess)){
            userGuess.push("<div id='card'>" + guess + "</div>");
            if (userGuess.length === 6) {
                gameOver = true;
                instructions_end.innerHTML = "<br>GAME OVER! <br><br> ~ Press any key to try again ~<br><br>"
                blank.innerHTML = "The correct answer was <br>" + chosenWord.toLocaleUpperCase();
            } 
            sofar_span.innerHTML = userGuess.join(" ");
            guessLeft_span.innerHTML--;
            imgCount++;
            hang_img.style.backgroundImage = imgArray[imgCount];
            }
        }
    }

    // var click = document.getElementById("x");
    // click.addEventListener("click", function() {
    // /*
    // KeyboardEvent constructor
    // http://www.w3.org/TR/DOM-Level-3-Events/#idl-interface-KeyboardEvent-initializers
    // https://github.com/termi/DOM-Keyboard-Event-Level-3-polyfill
    // */
    // var keyEvent = new KeyboardEvent("keydown", {key : "a", char : "a", keyCode: "KeyA",shiftKey: true});
    
    // document.dispatchEvent(keyEvent);
// });

