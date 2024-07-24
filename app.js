let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red" ,"green", "purple"]; 
let started = false;
let level =0;
let h2 = document.querySelector("h2");
let hs = 0;
let hsDisplay = document.querySelector("#hs");
hsDisplay.innerText = `High Score: ${hs}`;
 
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn){
    btn.classList.add("user");
    setTimeout(function(){
        btn.classList.remove("user");
    }, 300);  
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function matchSeq(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to restart. `;
        document.querySelector("body").style.backgroundColor = "lightslategray" ;
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black" ;
        }, 250);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    matchSeq(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset (){
    started = false;
    gameSeq = [];
    userSeq = [];
    if(level>hs){
        hs =level;
        hsDisplay.innerText = `High Score: ${hs}`;
    }
    level = 0;
}