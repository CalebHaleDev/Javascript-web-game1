//gameSetup
    //settings:         you could get user input to change these
    //colorScheme =
    [`style="color:White; background-color:Purple;"`, `style="background-color:lightGreen;"`, `style="background-color:DodgerBlue;"`,
    `style="background-color:White;"`,
    `style="background-color:Orange;"`, `style="background-color:Red;"`, `style="color:Black; background-color:Yellow;"`, `style="color:White; background-color:Gray;"`];

    //initialize game
    var score = 0;
    const validKeys = ["A","S","D"];
    var level = 1;

function levelSetup(unscaledWidth, unscaledHeight){
    printGrid();
    shiftTimer=Date.now()+(1000*level/20);
    keypressed = null;
    //window.score = 0;
    score = 0; 
    completedRows = [];
}
function makeGrid(width, height){
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
    document.getElementById("gameDisplay").innerHTML += printText;
}
function printGrid(){
    document.getElementById("gameDisplay").innerHTML = "<br>";
    gameGrid.forEach(element => {
        print(`<t text-align="justify">`);
        element.forEach(element => {
            print(`<t `+colorScheme[periodicTable[element]+3]+`>`+(element.length==emptySpaceCharacter.length ? element : element+emptySpaceCharacter[0])+`</t>`+spacerCharacter);
        });
        print("</t><br>");
    });
    print("score: "+score+`<br>`);
    print("completed: "+completedRows);
    //print("faller is at "+fallerCoords+"<br>");
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