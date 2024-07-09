var player = document.getElementById("player");
var xCoor = player.offsetLeft;
var yCoor = player.offsetTop;
const ogPos = [xCoor, yCoor];
var width = document.body.offsetWidth - 100;
var heigth = document.body.offsetHeight - 100;
var started = false;
var scorePanel = document.getElementById("score");
var score = 0;
var VerticalHitbox = false;
var HorizontalHitbox = false;
const eachVerticalAttack = document.getElementsByClassName("verticalAttack");
const eachHorizontalAttack = document.getElementsByClassName("horizontalAttack");
var eachVerticalAttackPos = [];
var eachHorizontalAttackPos = [];
var scoreInterval;
var attackInterval;
var checkInterval;
var ost = document.getElementById("ost");
var HS = document.getElementById("HS");

ost.volume = 0.1;


for(let i = 0; i < eachVerticalAttack.length; i++){
    eachVerticalAttack[i].style.top = `${i*100}px`;
    eachVerticalAttack[i].style.left = `${0}px`;
    eachVerticalAttackPos[i] = eachVerticalAttack[i].offsetTop;
}
for(let i = 0; i < eachHorizontalAttack.length; i++){
    eachHorizontalAttack[i].style.left = `${i*100}px`;
    eachHorizontalAttack[i].style.top = `${0}px`;
    eachHorizontalAttackPos[i] = eachHorizontalAttack[i].offsetLeft;
}

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
    var rng = Math.floor(Math.random() * 100);
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
    for(var i = 0; i < eachVerticalAttack.length; i++){
        eachVerticalAttack[i].style.top = `${eachVerticalAttack[i].offsetTop + offset}px`;
        eachVerticalAttack[i].classList.remove("poof");
        eachVerticalAttack[i].classList.add("warn");
    }
    await sleep(750);
    VerticalHitbox = true;
    for (var i = 0; i < eachVerticalAttack.length; i++) {
        eachVerticalAttack[i].classList.remove("warn");
    }
    await sleep(250);
    VerticalHitbox = false;
    for (var i = 0; i < eachVerticalAttack.length; i++) {
        eachVerticalAttack[i].classList.add("poof");
        eachVerticalAttack[i].style.top = `${eachVerticalAttackPos[i]}px`; 
    }
    await sleep(250);
}

async function spawnHorizontalAttack(offset) {
    for(var i = 0; i < eachHorizontalAttack.length; i++){
        eachHorizontalAttack[i].style.left = `${eachHorizontalAttack[i].offsetLeft + offset}px`;
        eachHorizontalAttack[i].classList.remove("poof");
        eachHorizontalAttack[i].classList.add("warn");
    }
    await sleep(750);
    HorizontalHitbox = true;
    for (var i = 0; i < eachHorizontalAttack.length; i++) {
        eachHorizontalAttack[i].classList.remove("warn");
    }
    await sleep(250);
    HorizontalHitbox = false;
    for (var i = 0; i < eachHorizontalAttack.length; i++) {
        eachHorizontalAttack[i].classList.add("poof");
        eachHorizontalAttack[i].style.left = `${eachHorizontalAttackPos[i]}px`; 
    }
    await sleep(250);
}

function checkIfLost() {
    if(VerticalHitbox == true){
        for (var i = 0; i < eachVerticalAttack.length; i++) {
            checkCollision(player, eachVerticalAttack[i], 1);
        }
    }
    if(HorizontalHitbox == true){
        for (var i = 0; i < eachHorizontalAttack.length; i++) {
            checkCollision(player, eachHorizontalAttack[i], 2);
        }
    }
}

function checkCollision(object1, object2, n) {
    if(n == 1){
        if(
            object1.offsetTop + object1.offsetHeight >= object2.offsetTop &&
            object2.offsetTop + object2.offsetHeight >= object1.offsetTop
        ){
            clearInterval(scoreInterval);
            clearInterval(attackInterval);
            clearInterval(checkInterval);
            started = false;
            document.getElementById("button").style = "display: block";
            document.getElementById("button").innerHTML = "restart?";
            HS.innerHTML = `HS: ${score}`;
        }
    }else{
        if (
            object1.offsetLeft + object1.offsetWidth >= object2.offsetLeft &&
            object2.offsetLeft + object2.offsetWidth >= object1.offsetLeft
        ) {
            clearInterval(scoreInterval);
            clearInterval(attackInterval);
            clearInterval(checkInterval);
            started = false;
            document.getElementById("button").style = "display: block";
            document.getElementById("button").innerHTML = "restart?";
            HS.innerHTML = `HS: ${score}`;
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