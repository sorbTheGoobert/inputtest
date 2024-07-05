var player = document.getElementById("player");
var xCoor = player.offsetLeft;
var yCoor = player.offsetTop;
const ogPos = [xCoor, yCoor];
var width = document.body.offsetWidth - 100;
var heigth = document.body.offsetHeight - 100;
var started = false;
var scorePanel = document.getElementById("score");
var score = 0;
var VerticalAttack = document.getElementById("verticalAttackContainer");
var HorizontalAttack = document.getElementById("horizontalAttackContainer");
var VerticalHitbox = false;
var HorizontalHitbox = false;
var eachVerticalAttack = document.getElementsByClassName("verticalAttack");
var eachHorizontalAttack = document.getElementsByClassName("horizontalAttack");
var scoreInterval;
var attackInterval;
var checkInterval;

console.log(eachVerticalAttack);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function move() {
    if(started == true){
        if (event.key == "w") {
            yCoor -= 15;
            if (yCoor < 0) {
                yCoor = 0;
            }
            player.style.top = `${yCoor}px`;
        }
        
        if (event.key == "s") {
            yCoor += 15;
            if (yCoor > heigth) {
                yCoor = heigth;
            }
            player.style.top = `${yCoor}px`;
        }
        
        if (event.key == "a") {
            xCoor -= 15;
            if (xCoor < 0) {
                xCoor = 0;
            }
            player.style.left = `${xCoor}px`;
        }
        
        if (event.key == "d") {
            xCoor += 15;
            if (xCoor > width) {
                xCoor = width;
            }
            player.style.left = `${xCoor}px`;
        }
    }
}

function spawnObjects() {
    var rng = 50;//Math.floor(Math.random() * 100);
    var placementrng = Math.floor(Math.random() * 50);
    if(0 <= rng && rng< 20){
        spawnVerticalAttack(placementrng);
        spawnHorizontalAttack(placementrng);
    }
    if(20 <= rng && rng < 60){
        spawnVerticalAttack(placementrng);
    }
    if(60 <= rng && rng< 100){
        spawnHorizontalAttack(placementrng);
    }
}

async function spawnVerticalAttack(offset) {
    VerticalAttack.style.top = `${offset}px`;
    VerticalAttack.classList.remove("poof");
    VerticalAttack.classList.add("warn");
    await sleep(750);
    VerticalAttack.classList.remove("warn");
    VerticalHitbox = true;
    await sleep(250);
    VerticalHitbox = false;
    // VerticalAttack.classList.add("poof");
    await sleep(250);
}

async function spawnHorizontalAttack(offset){
    HorizontalAttack.style.left = `${offset}px`;
    HorizontalAttack.classList.remove("poof");
    HorizontalAttack.classList.add("warn");
    await sleep(750);
    HorizontalAttack.classList.remove("warn");
    HorizontalHitbox = true;
    await sleep(250);
    HorizontalHitbox = false;
    HorizontalAttack.classList.add("poof");
    await sleep(250);
}

function checkIfLost() {
    if(VerticalHitbox == true){
        for (var i = 0; i < eachVerticalAttack.length; i++) {
            checkCollision(player, eachVerticalAttack[i], 1);
        }
    }
    if(HorizontalHitbox == true){
        
    }
}

function checkCollision(object1, object2, n) {
    if(n == 1){
        if(
            object1.offsetTop + object1.offsetHeight >= object2.offsetTop &&
            object2.offsetTop + object2.offsetHeight >= object1.offsetTop
        ){
            object2.style.backgroundColor = "green";
            clearInterval(scoreInterval);
            clearInterval(attackInterval);
            clearInterval(checkInterval);
            console.log(object2.offsetHeight);
            console.log(object2.offsetTop);
        }
    }else{
        if (
            object1.offsetLeft + object1.offsetWidth >= object2.offsetLeft &&
            object2.offsetLeft + object2.offsetWidth >= object1.offsetLeft
        ) {
            object2.style.backgroundColor = "green";
            clearInterval(scoreInterval);
            clearInterval(attackInterval);
            clearInterval(checkInterval);
        }
    }
}

function addScore() {
    score++;
    scorePanel.innerHTML = `Your current score is: ${score}s`
}

function nonIntervalStartStuff() {
    player.classList.remove("poof");
    document.getElementById("button").style = "display: none";
    xCoor = ogPos[0];
    yCoor = ogPos[1];
    player.style.left = `${ogPos[0]}px`;
    player.style.top = `${ogPos[1]}px`;
    score = 0;
    scorePanel.innerHTML = `Your current score is: ${score}s`
    started = true;
    console.log("yeah its starting")
}

function start() {
    nonIntervalStartStuff();
    scoreInterval = setInterval(addScore, 1000);
    attackInterval = setInterval(spawnObjects, 1250);
    checkInterval = setInterval(checkIfLost, 1);
}