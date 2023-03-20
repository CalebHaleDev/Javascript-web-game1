//gameSetup
    //settings:
    //const randomGroundTexture = [" ",".",","];
    var level = 1;      //starting level
    const scale = 50;
    document.getElementById("gameGrid").setAttribute("viewbox","0 0 100 100");
    document.getElementById("gameGrid").viewbox = "0 0 100 100";
    document.getElementById("gameGrid").innerHTML += `viewBox="0 0 100 100"`;
    const renderDistance = 10;
    const colorGradient = 5;
    //initialize game
    var score = 0;
    const validKeys = ["Q","W","E","A","S","D"];
    var playerCoords = [];
    const playerSize = 1;
    var lightPower = 5;
    const maxLightPower = 15;
    //coordinates are +=1,0 and +-.5, +-hex
    const hex = Math.sqrt(3)/3;
    mapCoords = [];
    gameMap = [];

class HexSquare {
    constructor(color, coords, playerCoords) {
        this.color = color;
        this.coords = coords;
        if(playerCoords.length()+renderDistance+1>coords.length){
            //make a new HexSquare... how does recursion work with constructors?
        }
        }
    
    }

//generateMap for origin forward and backward, at least renderDistance
function makeMap(coord, direction){
    print("grid made");
    //if this grid doesn't exist, make a new one at this spot
    //if this grid doesn't exist, recursively call the function from here;
        //in the same direction from the parent drawing from the parent
        //a little left from the parent drawing from the parent's left (if generated)
        //and a little right from the parent, drawing from the parent's right (if generated)
}
function generateMap(){
    //loop makeMap x times, for x steps/layers of recursive generation
}
function print(printText){
    document.getElementById("textDisplay").innerHTML += printText;
}
function coordToHex(){
    //takes coordinates and returns a set of hex directions
}
function hexToCoord(){
    //takes a hex direction and returns coordinates, needed?
}
function HexPosition(){
    //this function cancels out movement, unless it is noneuclidean
}
function drawMap(){
    //for each grid space, lookup the player coordinates, plus the difference in movement, (processed in hexForm), to find the square
    //coordinates within render distance, coordToHex, draw them
    gameMap.forEach(element => {
        document.getElementById("gameGrid").innerHTML += `<polygon points="100,100 150,25 150,75 200,0" fill="none" stroke="black" />`; 
    });
    print("score: "+score+`<br>`);
}
function levelSetup(){
    generateMap();
    drawMap();
    shiftTimer=Date.now()+(1000*level/20);
}
function movePlayer(direction){
    //print("moving: "+direction-name);
    let newLocation = HexPosition(playerCoords + direction)
    if(newLocation==empty){
        playerCoords = newLocation;
    }
    drawMap();
    shiftTimer=Date.now()+500;
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