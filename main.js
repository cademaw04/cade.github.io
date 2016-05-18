var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it
 
// Graphics
//[Background]
 
var bg; //The background graphic
 
//[Title View]
  
 
var main; //The Main Background
var startB; //The Start button in the main menu
var creditsB; //The credits button in the main menu
 
//[Credits]
 
 
var credits; //The Credits screen
 
//[Game View]
 
 
var player; //The player paddle graphic
var ball; //The ball graphic
var cpu; //The CPU paddle
var win; //The winning popup
var lose; //The losing popup



//[Score]
 
var playerScore; //The main player score
var cpuScore; //The CPU score
var cpuSpeed=6; //The speed of the CPU paddle; the faster it is the harder the game is


// Variables
 
var xSpeed = 5;
var ySpeed = 5;


var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;

var TitleView = new Container();


function Main()
{
    /* Link Canvas */
     
    canvas = document.getElementById('PongStage');
    stage = new Stage(canvas);
         
    stage.mouseEventsEnabled = true;
     
     
    /* Set The Flash Plugin for browsers that don't support SoundJS */
    SoundJS.FlashPlugin.BASE_PATH = "assets/";
    if (!SoundJS.checkPlugin(true)) {
      alert("Error!");
      return;
    }
 
    manifest = [
                {src:"bg.png", id:"bg"},
                {src:"main.png", id:"main"},
                {src:"startB.png", id:"startB"},
                {src:"creditsB.png", id:"creditsB"},
                {src:"credits.png", id:"credits"},
                {src:"paddle.png", id:"cpu"},
                {src:"paddle.png", id:"player"},
                {src:"ball.png", id:"ball"},
                {src:"win.png", id:"win"},
                {src:"lose.png", id:"lose"},
                {src:"playerScore.mp3|playerScore.ogg", id:"playerScore"},
                {src:"enemyScore.mp3|enemyScore.ogg", id:"enemyScore"},
                {src:"hit.mp3|hit.ogg", id:"hit"},
                {src:"wall.mp3|wall.ogg", id:"wall"}
            ];
 
 
 
    preloader = new PreloadJS();
    preloader.installPlugin(SoundJS);
    preloader.onProgress = handleProgress;
    preloader.onComplete = handleComplete;
    preloader.onFileLoad = handleFileLoad;
    preloader.loadManifest(manifest);
 
    /* Ticker */
     
    Ticker.setFPS(30);
    Ticker.addListener(stage);
}


function handleProgress(event)
{
    //use event.loaded to get the percentage of the loading
}
 
function handleComplete(event) {
         //triggered when all loading is complete
}
 
function handleFileLoad(event) {
         //triggered when an individual file completes loading
             
         switch(event.type)
         {
            case PreloadJS.IMAGE:
            //image loaded
             var img = new Image();
              img.src = event.src;
              img.onload = handleLoadComplete;
              window[event.id] = new Bitmap(img);
            break;
 
            case PreloadJS.SOUND:
            //sound loaded
            handleLoadComplete();
            break;
         }
}


function handleLoadComplete(event) 
{
 
   totalLoaded++;
    
   if(manifest.length==totalLoaded)
   {
       addTitleView();
   }
}


function addTitleView()
{
    //console.log("Add Title View");
    startB.x = 240 - 31.5;
    startB.y = 160;
    startB.name = 'startB';
     
    creditsB.x = 241 - 42;
    creditsB.y = 200;
     
    TitleView.addChild(main, startB, creditsB);
    stage.addChild(bg, TitleView);
    stage.update();
     
    // Button Listeners
     
    startB.onPress = tweenTitleView;
    creditsB.onPress = showCredits;

}
function showCredits()
{
    // Show Credits
         
    credits.x = 480;
         
    stage.addChild(credits);
    stage.update();
    Tween.get(credits).to({x:0}, 300);
    credits.onPress = hideCredits;
}
 
// Hide Credits
 
function hideCredits(e)
{
    Tween.get(credits).to({x:480}, 300).call(rmvCredits);
}
 
// Remove Credits
 
function rmvCredits()
{
    stage.removeChild(credits);
}
 
// Tween Title View
 
function tweenTitleView()
{       
    // Start Game
         
 Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}
