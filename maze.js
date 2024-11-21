


const height = 15;
const width = 15;
const MaxPathLength = 5;
const wall = 15;
const maxFake = 3;
let maze = [];
const startX = 1
const startY = 1
// 1 2 4 8 wall side  in binary      1 left 2 top 4 right 8 bottom

const leftWall = 1;
const rightWall = 4;
const topWall = 2;
const bottomWall = 8;
const directions=["left","right","up","down"]
const crossPos = [];
const Anteater = [];

function setUpWall(){
    let i = -1;
    let j = -1;
    let line=[]
    while(++j<width)
        line.push(wall)
    while(++i<height)
        maze.push(line)
}

function displayMaze(){
    let i = -1;
    while(++i<height)
        console.log(maze[i].join(""));
}

function pathMaker(currentX,currentY){
    const pathLength = Math.floor(Math.random * MaxPathLength);
    let direction = randomDirection();
    let i = 0;
    while(!validDirection(direction,currentX,currentY)){  
        direction = randomDirection();
        if(++i === 10){
            direction = amIStuck(currentX, currentY);
            if(direction === false)
                goBack(); 
        }
    }
}

function goBack(){
    let i = crossPos.length - 1;
    pathMaker(crossPos[i][0],crossPos[i][1])
}

function randomDirection(){
    return directions[Math.floor(Math.random * directions.length)];
}

function wallHammering(direction,currentX,currentY){
    switch(direction){
        case "left": maze[currentY[currentX-1]] -= rightWall; maze[currentY[currentX]] -= leftWall; break;
        case "right": maze[currentY[currentX+1]] -= leftWall; maze[currentY[currentX]] -= rightWall; break;
        case "up": maze[currentY-1[currentX]] -= bottomWall; maze[currentY[currentX]] -= topWall; break;
        case "down": maze[currentY+1[currentX]] -= topWall; maze[currentY[currentX]] -= bottomWall; break;
    }
}

function validDirection(direction,currentX,currentY){
    switch(direction){
        case "left":    if(maze[currentY[currentX-1]] === 15 && currentX !== 1 ) return true;
                        else return false;
        case "right":   if(maze[currentY[currentX+1]] === 15 && currentX !== width-2 ) return true;
                        else return false;
        case "up":      if(maze[currentY-1[currentX]] === 15 && currentX !== 1 ) return true;
                        else return false;
        case "down":    if(maze[currentY+1[currentX]] === 15 && currentX !== height-2 ) return true;
                        else return false;
    }
}

function amIStuck(currentX,currentY){
    let i = -1;
    while(++i < directions.length)
        if(validDirection(directions[i]),currentX, currentY)
            return directions[i];
    return false;
}




setUpWall();
displayMaze();