const renderDistance = 5;
const resolution = .25;
gameMap = {};
gameMap[0,0] = 50;
const colorGradient = 30;
playerInfo = {
    x: 0,
    y: 0,
    direction: undefined,   //how should I do this?
    brightness: 2
};

function print(printText){
    document.getElementById("textDisplay").innerHTML += printText;
}
function randomUpTo(range){
    return Math.floor((range+1)*Math.random());
}
function drawDot(x, y, radius, hue, lightLevel){
    document.getElementById("gameGrid").innerHTML += `<circle cx="`+x+`" cy="`+y+`" r="`+radius+`" stroke="none" stroke-width="3" fill="hsla(`+hue+`, 34%, 25%, `+lightLevel+`)">`;
}
function drawMap(){
    //drawDot(x, y, radius, hue, lightLevel);
    for(var x = -1*renderDistance; x<renderDistance; x+=resolution){
        for(var y = -1*renderDistance; y<renderDistance; y+=resolution){
            //print("looking up "+x+","+y+"<br>");
            if(gameMap[x+playerInfo.x, y+playerInfo.y]!=undefined){
                //print("drawing "+x+","+y+" at "+(x+renderDistance)+","+(y+renderDistance));
                drawDot(x+renderDistance, y+renderDistance, resolution/2, gameMap[x+playerInfo.x, y+playerInfo.y], Math.min(Math.max(Math.sqrt(x**2+y**2)/playerInfo.brightness, 0), 1));
            }else{
                //print(x+","+y+" not found<br>");
            }
        }
    }
    print("done drawing");
}
function drawPixel(){
    document.getElementById("gameGrid").innerHTML += `<circle cx="`+x+`" cy="`+y+`" r="`+radius+`" stroke="none" stroke-width="3" fill="hsla(`+hue+`, 34%, 25%, `+lightLevel+`)">`;

    
}
function makeMap(){
    for(var radius=2*resolution; radius<renderDistance; radius+=2*resolution){
        //print("making radius: "+radius+"<br>");
        makeMapLayer(radius);
        //print("<br><br>");
    }
}
function makeMapLayer(diamondRadius){
    for(var i=diamondRadius;i>-.01;i-=resolution){
        //print("making radius with i: "+i+"......................");
        createCoordinate(diamondRadius-i,i);
        createCoordinate(diamondRadius-i,-1*i);
        createCoordinate(i-diamondRadius,i);
        createCoordinate(i-diamondRadius,-1*i);
    }
}
function createCoordinate(x,y){
    if(gameMap[x,y]==undefined){
        //if on an axis, draw from the axis
        if(x*y==0){
            if(x==0){
                gameMap[x,y] = (gameMap[0, y-2*resolution*Math.sign(y)]+randomUpTo(colorGradient))%360;
            }else{
                gameMap[x,y] = (gameMap[x-2*resolution*Math.sign(x), y]+randomUpTo(colorGradient))%360;
            }
        }else{      //if not, draw from diagonally away (or average of lower spots?)
            gameMap[x,y] = (gameMap[x-resolution*Math.sign(x), y-resolution*Math.sign(y)]+randomUpTo(colorGradient))%360;
        }
    //print(x+","+y+" is now: "+gameMap[x,y]+"<br>");
    }
}



//makeMap();
//drawMap();


var moveTimer=Date.now()+(250);

//main game loop
var gameloopID = setInterval(()=> {
    //get user input
    this.addEventListener('keypress', event => {
        var keypressed = event.code[3];
    })
    //do user input
    if(moveTimer<Date.now() && ["Q","W","E","A","S","D"].includes(keypressed)){
        if(["Q","W","E","A","S","D"].includes(keypressed)){
           //movePlayer(keypressed=="Q" ? rotateDirection(playerDirection,-1) : keypressed=="W" ? playerDirection : keypressed=="E" ? rotateDirection(playerDirection) : rotateDirection(playerDirection,3));
        }else{
            //playerDirection = rotateDirection(playerDirection, keypressed=="A" ? -1 : 1);
            drawMap();
        }
    }
    keypressed = null;

    if(false){    //end game condition
        clearInterval(gameloopID);
    }
},100); //refresh rate
print("game over");