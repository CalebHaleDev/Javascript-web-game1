//gameSetup
    //settings:         you could get user input to change these
    colorScheme =
    [`style="color:White; background-color:Purple;"`, `style="background-color:lightGreen;"`, `style="background-color:DodgerBlue;"`,
    `style="background-color:White;"`,
    `style="background-color:Orange;"`, `style="background-color:Red;"`, `style="color:Black; background-color:Yellow;"`, `style="color:White; background-color:Gray;"`];
    var level = 1;      //starting level
    const scale = 50;
    document.getElementById("gameGrid").setAttribute("viewbox","0 0 100 100");
    document.getElementById("gameGrid").viewbox = "0 0 100 100";
    document.getElementById("gameGrid").innerHTML += `viewBox="0 0 100 100"`;
    var renderDistance = 10;
    //initialize game
    var score = 0;
    const validKeys = ["Q","W","E","A","S","D"];
    var playerCoords = [];
    //coordinates are +=1,0 and +-.5, +-hex
    const hex = Math.sqrt(3)/3;

class HexSquare {
    constructor(color, coords, playerCoords) {
        this.color = color;
        this.coords = coords;
        if(playerCoords.length()+renderDistance+1>coords.length){
            //make a new HexSquare... how does recursion work with constructors?
        }
        }
    
    }

function makeGrid(width, height){
    gameCoords = [];
    gameGrid = [];
    emptyRow = [];
    for(var i=0;i<width;i++){
        emptyRow.push(emptySpaceCharacter);
    }
    for(var i=0;i<height;i++){
        gameGrid.push(emptyRow.map(x => x));        //future research: how to dereference
    }
    print("grid made");
}
function print(printText){
    document.getElementById("textDisplay").innerHTML += printText;
}
function printGrid(){
    
    gameGrid.forEach(element => {
        document.getElementById("gameGrid").innerHTML += `<polygon points="100,100 150,25 150,75 200,0" fill="none" stroke="black" />`; 
    });
    print("score: "+score+`<br>`);
}
function levelSetup(unscaledWidth, unscaledHeight){
    makeGrid();
    printGrid();
    shiftTimer=Date.now()+(1000*level/20);
}
function shiftFaller(direction){
    //document.getElementById("gameDisplay").innerHTML += "shifting: "+direction;
    let newLocation = direction==0 ? [fallerCoords[0],fallerCoords[1]+1] : [fallerCoords[0]+direction,fallerCoords[1]];
    if(gameGrid[newLocation[1]][newLocation[0]]==emptySpaceCharacter){  //if newLocation is open...
        gameGrid[newLocation[1]][newLocation[0]] = gameGrid[fallerCoords[1]][fallerCoords[0]];  //set the newLocation to the faller
        gameGrid[fallerCoords[1]][fallerCoords[0]] = emptySpaceCharacter;       //and set the faller to a blank space
        fallerCoords = [newLocation[0],newLocation[1]];
        if(direction==0) score++;
    }
    printGrid();
    shiftTimer=Date.now()+Math.max(1000*(level/20),250); //only if shift successful?
}

    levelSetup(1,5);
//main game loop
var gameloopID = setInterval(()=> {
    //get user input
    this.addEventListener('keypress', event => {
        keypressed = event.code[3];
    })
    //do user input
    if(shiftTimer<Date.now() && validKeys.includes(keypressed)){
    shiftFaller(keypressed=="A" ? -1 : keypressed=="S" ? 0 : keypressed=="D" ? 1 : null);
    }
    keypressed = null;

    if(level<1){    //end game condition
        clearInterval(gameloopID);
    }
},100); //refresh rate
print("game over");