const renderDistance = 5;
const resolution = .5;
gameMap = {};
gameMap[0,0] = 50;
const colorGradient = 30;
playerInfo = {
    x: 0,
    y: 0,
    direction: undefined,   //how should I do this?
    brightness: 2.5
};

function print(printText){
    document.getElementById("textDisplay").innerHTML += printText;
}
function randomUpTo(range){
    return Math.floor((range+1)*Math.random());
}
function drawMap(){
    document.getElementById("gameGrid").innerHTML += `<rect x="0" y="0" width="`+2*renderDistance+`" height="`+2*renderDistance+`" stroke="none" stroke-width="3" fill="hsla(0, 10%, 0%, 1)">`;
    //drawPixel(x, y, width, hue, lightLevel);
    for(var x = -1*renderDistance; x<renderDistance; x+=resolution){
        for(var y = -1*renderDistance; y<renderDistance; y+=resolution){
            if(gameMap[x+playerInfo.x, y+playerInfo.y]!=undefined){
                //print("drawing "+x+","+y+" at "+(x+playerInfo.x)+","+(y+playerInfo.y))
                drawPixel(x+renderDistance, y+renderDistance, resolution, gameMap[x+playerInfo.x, y-playerInfo.y], Math.min(Math.max(playerInfo.brightness/Math.sqrt(x**2+y**2), 0), 1));
            }else{
                //print(x+","+y+" not found<br>");
            }
        }
    }
}
function drawPixel(x, y, length, hue, opacity){
    document.getElementById("gameGrid").innerHTML += `<rect x="`+x+`" y="`+y+`" width="`+length+`" height="`+length+`" stroke="none" stroke-width="3" fill="hsla(`+hue+`, 34%, 25%, `+opacity+`)">`;
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
                gameMap[x,y] = (gameMap[x-2*resolution*Math.sign(x), 0]+randomUpTo(colorGradient))%360;
            }
        }else{      //if not, draw from diagonally away (or average of lower spots?)
            gameMap[x,y] = (gameMap[x-resolution*Math.sign(x), y-resolution*Math.sign(y)]+randomUpTo(colorGradient)+(10*x*resolution))%360;
        }
    //print(x+","+y+" is now: "+gameMap[x,y]+"<br>");
    }
}
function movePlayer(x, y){
    print("moving: "+x+","+y);
    playerInfo.x += x;
    playerInfo.y += y;
    print("moved to "+playerInfo.x+","+playerInfo.y)
    moveTimer=Date.now()+(250);
}


makeMap();
drawMap();


var moveTimer=Date.now()+(250);
var keypressed=null;

//main game loop
var gameloopID = setInterval(()=> {
    //get user input
    this.addEventListener('keypress', event => {
        keypressed = event.code[3];
        //print(moveTimer<Date.now() && ["W","A","S","D"].includes(keypressed));
    })
    //do user input
    if(moveTimer<Date.now() && ["W","A","S","D"].includes(keypressed)){
        //print(keypressed+" pressed");
        movePlayer(keypressed=="W" ? 0 : keypressed=="A" ? -1 : keypressed=="S" ? 0 : 1 , keypressed=="W" ? 1 : keypressed=="A" ? 0 : keypressed=="S" ? -1 : 0);
        drawMap();
    }
    keypressed = null;

    if(false/*Date.now()-moveTimer>30000*/){    //end game condition
        clearInterval(gameloopID);
    }
},100); //refresh rate
print("game over");