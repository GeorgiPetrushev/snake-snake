//starting position
let pos = [{
    top: 250,
    left: 250,
    prevTop: 250,
    prevLeft: 250,
    direction: "left",
    lastMove: "+"
}];
//generate new position for food
const positionSnakeFood = () => {
    let position = Math.floor(Math.random() * 49)*10;
    return pos.every(curr => curr.top!=position && curr.left!=position) ? position : positionSnakeFood();
}
//return points
const points = () => {
    return pos.length-1;
}
//eat f
const eatFood = () => {
    // remove old
    document.querySelector(".snakeFood").remove();

    //create new snakeFood
    let newSnakeFood = document.createElement("div");
    newSnakeFood.className = "snakeFood";
    posFood.top = positionSnakeFood();
    posFood.left = positionSnakeFood();
    newSnakeFood.style.top = `${posFood.top}px`;
    newSnakeFood.style.left = `${posFood.left}px`;
    document.querySelector(".gameBoard").appendChild(newSnakeFood);

    //create new element in snake
    pos.push({top: pos[pos.length-1].prevTop, left: pos[pos.length-1].prevLeft});
    let newSnake = document.createElement("div");
    newSnake.className = "snake";
    newSnake.style.top = `${pos[pos.length-1].top}px`;
    newSnake.style.left = `${pos[pos.length-1].left}px`;
    document.querySelector(".gameBoard").appendChild(newSnake);

    //change points
    document.querySelector(".point").innerHTML = points();
}

let posFood = {
    top: positionSnakeFood(),
    left: positionSnakeFood()
}

const operators = {
    "+": ((a, b) => a+b),
    "-": ((a,b) => a-b)
}

//start f
let start = () => {
    pos = [{
        top: 250,
        left: 250,
        prevTop: 250,
        prevLeft: 250,
        direction: "left",
        lastMove: "+"
    }];
    //create new form
    document.querySelector(".container-body").remove();
    let containerBody = document.createElement("div");
    containerBody.className = "container-body";

    let snake = document.createElement("div");
    let gameBoard = document.createElement("div");
    let pointBoard = document.createElement("div");
    let pointText = document.createElement("div");
    let point = document.createElement("div");
    let snakeFood = document.createElement("div");


    snake.className = "snake";
    snake.style.top = `${pos[0].top}px`;
    snake.style.left = `${pos[0].left}px`;
    gameBoard.className = "gameBoard";
    pointBoard.className = "pointBoard";
    pointText.className = "pointText";
    pointText.innerHTML = "Points:";
    point.className = "point";
    point.innerHTML = points();
    snakeFood.className = "snakeFood";
    snakeFood.style.top = `${posFood.top}px`;
    snakeFood.style.left = `${posFood.left}px`;

    pointBoard.appendChild(pointText);
    pointBoard.appendChild(point);
    gameBoard.appendChild(snake);
    gameBoard.appendChild(snakeFood);
    containerBody.appendChild(pointBoard);
    containerBody.appendChild(gameBoard);
    document.body.appendChild(containerBody);
    
    myMove();

   window.addEventListener("keydown", (e) => {
        //console.log(e.code)
        if(e.code.slice(0,5) === "Arrow"){
            switch (e.code){
                case "ArrowUp":
                    if(!(pos[0].direction === "top" && pos[0].lastMove === "+")){pos[0].direction = "top"; pos[0].lastMove = "-";}
                    break;
                case "ArrowRight":
                    if(!(pos[0].direction === "left" && pos[0].lastMove === "-")){pos[0].direction = "left";pos[0].lastMove = "+";}
                    break;                    
                case "ArrowDown":
                    if(!(pos[0].direction === "top" && pos[0].lastMove === "-")){pos[0].direction = "top"; pos[0].lastMove = "+";}
                    break;
                case "ArrowLeft":
                    if(!(pos[0].direction === "left" && pos[0].lastMove === "+")){pos[0].direction = "left"; pos[0].lastMove = "-";}
                    break;
            }

        }
    });
}


document.querySelector(".start").addEventListener("click", start);

//this f moves the snake
const myMove = () => {
    let elem = document.querySelectorAll(".snake");  
    let moveSpeed = 250; 
    let id = setInterval(frame, moveSpeed);
    function frame() {
      if (checkGameOver()) {
        clearInterval(id);
        gameOver();
      } else {
        pos[0].prevTop = pos[0].top; pos[0].prevLeft = pos[0].left;
        pos[0][pos[0].direction] = operators[pos[0].lastMove](pos[0][pos[0].direction], 10);
        elem[0].style[pos[0].direction] = pos[0][pos[0].direction] + "px";
        for(let i =1; i<elem.length; i++){
            pos[i].prevTop = pos[i].top; pos[i].prevLeft = pos[i].left;
            pos[i].top = pos[i-1].prevTop; pos[i].left = pos[i-1].prevLeft;
            elem[i].style.top = `${pos[i].top}px`; elem[i].style.left = `${pos[i].left}px`;
            //console.log(`top - ${pos[1].top} left - ${pos[1].left}`);
        }
        //call f when snake eat
        if(pos[0].top === posFood.top && pos[0].left === posFood.left){
            if(moveSpeed > 50) { clearInterval(id); moveSpeed -=10; id = setInterval(frame, moveSpeed);}
            eatFood();
            elem = document.querySelectorAll(".snake");
        }

        //console.log(`Top-${pos[0].top} Left-${pos[0].left}`);
      }
    }
  }

//all rules for snake
const checkGameOver = () => {
    if(pos[0].top < 0 || pos[0].left < 0 || pos[0].top > 490 || pos[0].left > 490){ return true;}
    for(let i=1; i<pos.length; i++){
        if(pos[0].top === pos[i].top && pos[0].left === pos[i].left){
            return true;
        }
    }
    return false;
}


//GameOver f
const gameOver = () => {
    let container = document.querySelector(".container-body");
    let btn = document.createElement("button");
    btn.className = "btn";
    btn.innerHTML = "Play Again!";
    container.appendChild(btn);
    document.querySelector(".btn").addEventListener("click", start);
}


