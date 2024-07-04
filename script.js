var player = document.getElementById("player");
var xCoor = player.offsetLeft;
var yCoor = player.offsetTop;
var width = document.body.offsetWidth - 100;
var heigth = document.body.offsetHeight - 100;
var started = false;
var scorePanel = document.getElementById("score");
var score = 0;
var VerticalAttack = document.getElementById("verticalAttackContainer");
var HorizontalAttack = document.getElementById("horizontalAttackContainer");
var VerticalHitbox = false;
var HorizontalHitbox = false;

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function move() {
    if(started == true){
        if (event.key == "w") {
            yCoor -= 5;
            if (yCoor < 0) {
                yCoor = 0;
            }
            player.style.top = `${yCoor}px`;
        }
        
        if (event.key == "s") {
            yCoor += 5;
            if (yCoor > heigth) {
                yCoor = heigth;
            }
            player.style.top = `${yCoor}px`;
        }
        
        if (event.key == "a") {
            xCoor -= 5;
            if (xCoor < 0) {
                xCoor = 0;
            }
            player.style.left = `${xCoor}px`;
        }
        
        if (event.key == "d") {
            xCoor += 5;
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
    if(0 <= rng < 20){
        spawnVerticalAttack(placementrng);
        spawnHorizontalAttack(placementrng);
    }
    if(20 <= rng < 60){
        spawnVerticalAttack(placementrng);
    }
    if(60 <= rng < 100){
        spawnHorizontalAttack(placementrng);
    }
}

async function spawnVerticalAttack(offset) {
    VerticalAttack.top = `${offset}px`;
    VerticalAttack.classList.remove("poof");
    VerticalAttack.classList.add("warn");
    await sleep(500);
    VerticalAttack.classList.remove("warn");
    //VerticalHitbox = true;
    await sleep(250);
    //VerticalHitbox = false;
    VerticalAttack.classList.add("poof");
    await sleep(250);
}

async function spawnHorizontalAttack(offset){
    HorizontalAttack.left = `${offset}px`;
    HorizontalAttack.classList.remove("poof");
    HorizontalAttack.classList.add("warn");
    await sleep(500);
    HorizontalAttack.classList.remove("warn");
    //HorizontalHitbox = true;
    await sleep(250);
    HorizontalHitbox = false;
    //HorizontalAttack.classList.add("poof");
    await sleep(250);
}

function checkIfLost() {

}

function addScore() {
    score++;
    scorePanel.innerHTML = `Your current score is: ${score}s`
}

function refresh(){
    spawnObjects();
    addScore();
}

function start() {
    player.classList.remove("poof");
    document.getElementById("button").style = "display: none";
    started = true;
    setInterval(refresh, 1000);
    // setInterval(checkIfLost, 50);
    scorePanel.innerHTML = `Your current score is: ${score}s`
}