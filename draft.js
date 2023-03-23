
function print(printText){
    document.getElementById("textDisplay").innerHTML += printText;
}
class HexSquare {
    constructor(coords, hue, playerCoords) {
        this.coords = coords;
        this.groundColor = hue;
    } 
}

var lightPower = 15;
const maxLightPower = 15;
//coordinates are +=1,0 and +-.5, +-hex
const hex = Math.sqrt(3)/3;
var playerCoords = [1];
gameMap = [new HexSquare(playerCoords, 36, playerCoords)];
hue = 36
function drawHexAt(x, y){
    document.getElementById("gameGrid").innerHTML += `<polygon points="`+(x-.5)+`,`+(y+hex)+` `+(x+.5)+`,`+(y+hex)+` `+(x+1)+`,`+y+` `+(x+.5)+`,`+(y-hex)+` `+(x-.5)+`,`+(y-hex)+` `+(x-1)+`,`+y+`" fill="hsla(`+hue+`, 34%, 25%, `+lightPower/maxLightPower+`)" stroke="none" />`;
}

for(var i=70*Math.random();i>0;i--){
    hue = Math.random()*360;
    drawHexAt(Math.floor(Math.random()*25), Math.floor(Math.random()*25));
}

//test starting gridspace
print(gameMap);
print("<br>");
spot = gameMap.find((spot) => spot.coords==1);
print(spot.coords+" ");
print(spot.groundColor);
//print("test");



//clear Map
//document.getElementById("gameGrid").innerHTML = ""; 



