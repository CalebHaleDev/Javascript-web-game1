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
    var playerDirection = 1;
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
function draw(drawing){
    document.getElementById("gameGrid").innerHTML += drawing;
}
function coordToHex(){
    //takes coordinates and returns a set of hex directions
}
function HexPosition(){
    //this function cancels out movement, unless it is noneuclidean
}
function drawMap(){
    document.getElementById("gameGrid").innerHTML = ""; 
    draw(`<polygon points="0,0 50,25 5,100 0,25" fill="hsla(360, 34%, 45%, .9)" stroke="black" />`);   //test shape
    //for each grid space, lookup the player coordinates, plus the difference in movement, (processed in hexForm), to find the square
    //coordinates within render distance, coordToHex, draw them
    hue = 36
    draw(`<polygon points="-.5,${hex} .5,${hex} 1,0 .5,-${hex} -.5,-${hex} -1,0" fill="hsla(${hue}, 34%, 45%, ${lightPower/maxLightPower})" stroke="white" />`);
    gameMap.forEach(element => {
        document.getElementById("gameGrid").innerHTML += `<polygon points="-.5,${hex} .5,${hex} 1,0 .5,-${hex} -.5,-${hex} -1,0" fill="hsla(${hue}, 34%, 45%, ${lightPower/maxLightPower})" stroke="black" />`; 
    });
    //the above would render the whole world, instead:
    for(var i = -renderDistance; i<renderDistance; i++){
        for(var j = -renderDistance; j<renderDistance; j++){
            //draw playerCoords + coordToHex() in their correct rotated positions
            //unrotated drawing position would be:
            //X = Math.Sqrt(3)*hex per upright=2 and per downright=3, reverse for reversed
            //Y = 2*hex per up=1, hex per upright=2, -hex per downright=3, reverse for reversed

            //so, relative to the player, all gridspots would be drawn X: (threes)-(-threes) + Math.Sqrt(3)*hex*((twos)-(-twos)) , Y: hex*[(twos)-(-twos)-(threes)+(-threes)] + 2*hex*((ones)-(-ones))
        }
    }
    print("score: "+score+`<br>`);
}
function levelSetup(){
    generateMap();
    drawMap();
    shiftTimer=Date.now()+(1000*level/20);
}
function movePlayer(direction){
    print("moving: "+direction);
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