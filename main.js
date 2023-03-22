//gameSetup
    //settings:
    var level = 1;      //starting level
    const renderDistance = 10;
    const colorGradient = 5;
    //initialize game
    class HexSquare {
        constructor(coords, hue, playerCoords) {
            this.coords = coords;
            this.groundColor = hue;
        }
        
    }
    var score = 0;
    var playerCoords = [];
    var playerDirection = 1;
    const playerSize = 1;
    var lightPower = 5;
    const maxLightPower = 15;
    //coordinates are +=1,0 and +-.5, +-hex
    const hex = Math.sqrt(3)/3;
    gameMap = [new HexSquare(playerCoords, 36, playerCoords)];

//test starting gridspace
print(gameMap);

//test passing editted arrays
function test(array){
    print(array);
}

var arr = [1, 2, 3, 4];
test([...arr]);     //does [].splice() work?
print(arr);

//test coordToHex
for(var i=-3; i<4; i++){
    for(var j=-3; j<4; j++){
        print(i+","+j+" is: "+coordToHex(i, j)+"<br>");
    }
}




function makeMapFrom(coord, sourceDirection){
    print("grid space making");
    if(Math.abs(coord.length-playerCoords.length)>renderDistance+2){  //if too far out of render distance, stop
        return;
    }

    gridSpace = gameMap.find((value) => value.coords == coord);
    if(gridSpace==undefined){       //if  doesn't exist, make a new one here
        //parentColor = gameMap.find((square) => square.coords==coord.slice(0,coord.length-1)).groundColor;
        //gameMap.push(new HexSquare(coord, parentcolor+-gradient, playerCoords))

    }else{      //if this grid exists, recursively call from here w/ direction forward, rotated -1 and 1
        makeMapFrom(coord.push(coord.slice(-1)[0]));   //forward should be last direction travelled
        makeMapFrom(coord.push(rotateDirection(coord.slice(-1)[0]),1));
        makeMapFrom(coord.push(rotateDirection(coord.slice(-1)[0]),-1));   //the pushing will change the coordinates, this can only happen with adjustments from the same starting point
    }
}
function print(printText){
    document.getElementById("textDisplay").innerHTML += printText;
}
function draw(drawing){
    document.getElementById("gameGrid").innerHTML += drawing;
}
function coordToHex(x, y){
    //takes coordinates and returns a set of hex directions
    result = [];
    while(x*y<0){
        result.push(3*Math.sign(x));    //adds diagonal hex for each diagonal coordinate
        x--;
        y++;
    }
    while(Math.abs(x)>0){
        x -= Math.abs(x);
        result.push(2*Math.sign(x));    //adds other diagonal hex for each diagonal coordinate
    }
    while(Math.abs(y)>0){
        y -= Math.abs(y);
        result.push(Math.sign(x));      //adds vertical hex for each vertical coordinate
    }
    return result;
}
function HexPosition(coordinates){
    //all nearby cancelling-out movement is removed (only render distance, to allow noneuclidean)
    //negatives are their own complements, as well as 1, -2, 3 and -1, 2, -3
    checkCoords = coordinates.slice(-1*renderDistance,-1);
    checkCoords.push(coordinates[coordinates.length-1]);
    for(var i = 1; i<4; i++){
        //find first value w/ counterpart, find where it is, splice it, use the returned spliced value to find and splice it's counterpart
        while(checkCoords.includes(i)&&checkCoords.includes(-1*i)){
            checkCoords.splice(checkCoords.indexOf(-1*checkCoords.splice(checkCoords.indexOf(checkCoords.find((value) => checkCoords.includes(-1*value))),1)),1); 
        }
    }
//check for hexagonal diagonals, repeats until checkCoords.find() == undefined
var cancellingPair = [checkCoords.find((value) => checkCoords.includes(value-(5*Math.sign(value)))&&checkCoords.includes(value-(3*Math.sign(value))))];
//for a 2 or -2, if there is a 1 and 3 of opposite sign
        while(cancellingPair[0]!=undefined){
            cancellingPair.push = cancellingPair[0]-(5*Math.sign(value));   //add the opposite 3
            cancellingPair.push = cancellingPair[0]-(3*Math.sign(value));   //add the opposite 1
            for(var i=0; i<3; i++){     //remove the cancelling pair trio
                checkCoords.splice(checkCoords.indexOf(cancellingPair[i]),1);
            }
        cancellingPair = [checkCoords.find((value) => checkCoords.includes(value-(5*Math.sign(value)))&&checkCoords.includes(value-(3*Math.sign(value))))];
        }
    resultArray = coordinates.slice(0, coordinates.length()-renderDistance);       //result=unchecked coordinates + checked
    return resultArray.splice(resultArray.length,0, [...checkCoords]);        //double check this later
}
function rotateDirection(startingDirection, rotation){
    if(rotation == undefined){
        rotation = 1;
    }else if (rotation == 3){
        return -1*startingDirection;
    }
    position = startingDirection;

    for(var i = 0; i<Math.abs(rotation);i++){
        //rotate based on rotation direction (sign), but the values flip so "direction" direction must also be accounted for
        position += Math.sign(position)*Math.sign(rotation);

        if(position==0){
            //too far counterclockwise, set to the opposite sign of the previous position, as a 3
            position = -3*Math.sign(startingDirection);
        }
        if(Math.abs(position)==4){
            //to far clockwise, set to the opposite sign of the previous position, as a 1
            position = -1*Math.sign(startingDirection);
        }
//I've realized that since most uses of this will only be rotations of -1 or 1, a simplified switch statement could work for the exceptions (-3 or 3 + rotation = rotation of opposite sign)
//review later to consider changing or optimizing
    }
    return position;
}
function drawMap(){
    document.getElementById("gameGrid").innerHTML = ""; 
    draw(`<polygon points="0,0 50,25 5,100 0,25" fill="hsla(360, 34%, 45%, .9)" stroke="black" />`);   //test shape
    //for each grid space, lookup the player coordinates, plus the difference in movement, (processed in hexForm), to find the square
    //coordinates within render distance, coordToHex, draw them
    hue = 36
    draw(`<polygon points="-.5,${hex} .5,${hex} 1,0 .5,-${hex} -.5,-${hex} -1,0" fill="hsla(${hue}, 34%, 45%, ${lightPower/maxLightPower})" stroke="white" />`);    //test

    for(var i = -renderDistance; i<renderDistance; i++){
        for(var j = -renderDistance; j<renderDistance; j++){
            //draw playerCoords + coordToHex() in their correct rotated positions
            //unrotated drawing position would be:
            //X = Math.Sqrt(3)*hex per upright=2 and per downright=3, reverse for reversed
            //Y = 2*hex per up=1, hex per upright=2, -hex per downright=3, reverse for reversed

            //so, relative to the player, all gridspots would be drawn X: (threes)-(-threes) + Math.Sqrt(3)*hex*((twos)-(-twos)) , Y: hex*[(twos)-(-twos)-(threes)+(-threes)] + 2*hex*((ones)-(-ones))
        //document.getElementById("gameGrid").innerHTML += `<polygon points="-.5,${hex} .5,${hex} 1,0 .5,-${hex} -.5,-${hex} -1,0" fill="hsla(${hue}, 34%, 45%, ${lightPower/maxLightPower})" stroke="black" />`; 
        }
    }
    //also, above, if the block is render distance away from the player, call makeMapFrom(that position)
    print("score: "+score+`<br>`);
}
function movePlayer(direction){
    print("moving: "+direction);
    let newLocation = HexPosition(playerCoords.push(direction));
    if(newLocation==empty){ //pseudocode
        playerCoords = newLocation;
        makeMapFrom(playerCoords);
        drawMap();
    }
    moveTimer=Date.now()+500;
}


makeMapFrom([]);      //double check
drawMap();
moveTimer=Date.now()+(1000*level/20);

//main game loop
var gameloopID = setInterval(()=> {
    //get user input
    this.addEventListener('keypress', event => {
        keypressed = event.code[3];
    })
    //do user input
    if(moveTimer<Date.now() && validKeys.includes(keypressed)){
        //W forward, Q left, E right, S backward. A and D rotate.
        if(["Q","W","E","A","S","D"].includes(keypressed)){
            movePlayer(keypressed=="Q" ? rotateDirection(playerDirection,-1) : keypressed=="W" ? playerDirection : keypressed=="E" ? rotateDirection(playerDirection) : rotateDirection(playerDirection,3));
        }else{
            playerDirection = rotateDirection(playerDirection, keypressed=="A" ? -1 : 1);
            drawMap();
        }
    }
    keypressed = null;

    if(level<1){    //end game condition
        clearInterval(gameloopID);
    }
},100); //refresh rate
print("game over");